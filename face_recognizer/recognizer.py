"""Performs face alignment and calculates L2 distance between the embeddings of images."""

import pandas as pd
import tensorflow as tf
import numpy as np
import os
import re
import argparse
from tensorflow.python.platform import gfile
from detect import detect_face
import skimage.transform as st

FACE_CROP_SIZE = 160
# MODEL_PATH = os.path.join('..', 'data', 'models', 'resnet.pb')
MODEL_PATH = os.path.join('data', 'models')
CSV_PATH = os.path.join('data', 'img_base.csv')
IMG_DIR = os.path.join('data', 'img_base')


def get_model_filenames(model_dir):
    files = os.listdir(model_dir)
    meta_files = [s for s in files if s.endswith('.meta')]

    if len(meta_files) == 0:
        raise ValueError('No meta file found in the model directory (%s)' % model_dir)

    elif len(meta_files) > 1:
        raise ValueError('There should not be more than one meta file in the model directory (%s)' % model_dir)

    meta_file = meta_files[0]
    ckpt = tf.train.get_checkpoint_state(model_dir)

    if ckpt and ckpt.model_checkpoint_path:
        ckpt_file = os.path.basename(ckpt.model_checkpoint_path)

        return meta_file, ckpt_file

    meta_files = [s for s in files if '.ckpt' in s]
    max_step = -1
    for f in files:
        step_str = re.match(r'(^model-[\w\- ]+.ckpt-(\d+))', f)

        if step_str is not None and len(step_str.groups()) >= 2:
            step = int(step_str.groups()[1])

            if step > max_step:
                max_step = step
                ckpt_file = step_str.groups()[0]

    return meta_file, ckpt_file


class FaceRecognizer:
    def __init__(self):
        self.model_path = MODEL_PATH
        self.csv_path = CSV_PATH
        self.img_dir = IMG_DIR
        self.sess = tf.Session()
        with self.sess.as_default():
            self.load_model()

    def load_model(self):
        # Check if the model is a model directory (containing a metagraph and a checkpoint file)
        #  or if it is a pb file with a frozen graph
        model_exp = os.path.expanduser(self.model_path)
        if (os.path.isfile(model_exp)):
            print('Model filename: %s' % model_exp)
            with gfile.FastGFile(model_exp, 'rb') as f:
                graph_def = tf.GraphDef()
                graph_def.ParseFromString(f.read())
                tf.import_graph_def(graph_def, input_map=None, name='')

        else:
            print('Model directory: %s' % model_exp)
            meta_file, ckpt_file = get_model_filenames(model_exp)

            print('Metagraph file: %s' % meta_file)
            print('Checkpoint file: %s' % ckpt_file)

            saver = tf.train.import_meta_graph(os.path.join(model_exp, meta_file), input_map=None)
            saver.restore(tf.get_default_session(), os.path.join(model_exp, ckpt_file))

    def load_dataset(self, directory, csv_path):
        table = pd.read_csv(csv_path, sep=';')
        img_names = table['img_name']

        X, labels = list(), list()

        for i in range(len(img_names)):
            path = os.path.join(directory, img_names[i])

            if os.path.isdir(path):
                continue

            face = self.load_data(path)
            if face is not None:
                X.append(face)
                labels.append(table['first_name'][i] + ' ' + table['last_name'][i])
        # X = list(filter(lambda x: x is not None, X))
        # labels = list(filter(lambda x: x is not None, labels))
        return X, labels

    def distance(self, first_embedding, second_embedding):
        diff = np.subtract(first_embedding, second_embedding)
        dist = np.sum(np.square(diff), 0)

        return dist

    def prewhiten(self, x):
        mean = np.mean(x)
        std = np.std(x)
        std_adj = np.maximum(std, 1.0 / np.sqrt(x.size))
        y = np.multiply(np.subtract(x, mean), 1 / std_adj)

        return y

    def load_data(self, img_path):
        img_list = []
        face = detect_face(img_path)
        if face is None:
            return None
        else:
            face_img = st.resize(face, (FACE_CROP_SIZE, FACE_CROP_SIZE))
            img_list.append(face_img)
            images = np.stack(img_list)
            return images

    def get_embedding(self, face):
        # Get input and output tensors
        images_placeholder = tf.get_default_graph().get_tensor_by_name("input:0")
        embeddings = tf.get_default_graph().get_tensor_by_name("embeddings:0")
        phase_train_placeholder = tf.get_default_graph().get_tensor_by_name("phase_train:0")

        # preprocessing
        prewhiten_face = self.prewhiten(face)

        # Run forward pass to calculate embeddings
        feed_dict = {images_placeholder: [prewhiten_face], phase_train_placeholder: False}
        return self.sess.run(embeddings, feed_dict=feed_dict)[0]

    def calculate_distances(self, image_path):
        dataset, labels = self.load_dataset(self.img_dir, self.csv_path)

        face_to_detect = self.load_data(image_path)
        face_to_detect_emb = self.get_embedding(face_to_detect[0])

        distances = list(map(lambda ref_face_emb:
                             self.distance(self.get_embedding(ref_face_emb[0]), face_to_detect_emb), dataset))

        print(min(distances), np.argmin(distances), labels[np.argmin(distances)])

        return labels[np.argmin(distances)]


def main(image_path):
    recognizer = FaceRecognizer()
    recognizer.calculate_distances(image_path)


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description='')
    parser.add_argument('-image_path', '--image_path', default='/data/img_base/2.jpg',
                        help='input path to image to recognize')
    args = parser.parse_args()

    main(**vars(args))
