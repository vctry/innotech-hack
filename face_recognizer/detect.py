import os
import numpy as np
import cv2
from imutils import resize
from copy import deepcopy
import time

IMAGE_WIDTH = 100
IMAGE_HEIGHT = 100


def transform_img(img, img_width=IMAGE_WIDTH, img_height=IMAGE_HEIGHT):
    img[:, :, 0] = cv2.equalizeHist(img[:, :, 0])
    img[:, :, 1] = cv2.equalizeHist(img[:, :, 1])
    img[:, :, 2] = cv2.equalizeHist(img[:, :, 2])
    img = cv2.resize(img, (img_width, img_height), interpolation=cv2.INTER_CUBIC)
    return img


def detect_face(img):
    FacesDetector = cv2.dnn.readNetFromCaffe("deploy.prototxt.txt",
                                             "weights.caffemodel")
    frame = cv2.imread(img)
    frame = resize(frame, width=640)
    (h, w) = frame.shape[:2]
    blob = cv2.dnn.blobFromImage(cv2.resize(frame, (300, 300)), 1.0, (300, 300), (104.0, 177.0, 123.0))

    # startX, startY, endX, endY = None, None, None, None
    face_img = None

    FacesDetector.setInput(blob)
    detections = FacesDetector.forward()

    for i in range(0, detections.shape[2]):
        confidence = detections[0, 0, i, 2]
        if confidence < 0.5:
            continue
        box = detections[0, 0, i, 3:7] * np.array([w, h, w, h])
        (startX, startY, endX, endY) = box.astype("int")

        R = max(endX - startX, endY - startY) / 2
        cX = int((endX + startX) / 2)
        cY = int((endY + startY) / 2)
        if R < h and R < w:
            if cY - R < 0:
                startY = 0
                endY = 2 * R

            elif cY + R >= h:
                startY = h - 2 * R
                endY = h - 1

            else:
                startY = cY - R
                endY = cY + R

            if cX - R < 0:
                startX = 0
                endX = 2 * R

            elif cX + R >= w:
                startX = w - 2 * R
                endX = w - 1

            else:
                startX = cX - R
                endX = cX + R

        startX = int(startX)
        startY = int(startY)
        endX = int(endX)
        endY = int(endY)

        face_img = deepcopy(frame[startY:endY, startX:endX])
        # face_img = 'transform_img(face_img)
        # cv2.imwrite('../data/img_base/img.png', face_img)

    # cv2.imshow("Frame", frame)
    # return startX, startY, endX, endY
    return face_img


def main():
    from imutils.video import VideoStream
    FacesDetector = cv2.dnn.readNetFromCaffe("deploy.prototxt.txt", "weights.caffemodel")

    vs = VideoStream(src=0).start()

    fourcc = cv2.VideoWriter_fourcc(*"MJPG")
    out = cv2.VideoWriter("test.avi", fourcc, 10, (640, 360))

    while True:
        tick = time.time()
        frame = vs.read()
        if frame is None:
            continue
        frame = resize(frame, width=640)
        (h, w) = frame.shape[:2]
        blob = cv2.dnn.blobFromImage(cv2.resize(frame, (300, 300)), 1.0, (300, 300), (104.0, 177.0, 123.0))

        FacesDetector.setInput(blob)
        detections = FacesDetector.forward()

        for i in range(0, detections.shape[2]):
            confidence = detections[0, 0, i, 2]
            if confidence < 0.5:
                continue
            box = detections[0, 0, i, 3:7] * np.array([w, h, w, h])
            (startX, startY, endX, endY) = box.astype("int")

            R = max(endX - startX, endY - startY) / 2
            cX = int((endX + startX) / 2)
            cY = int((endY + startY) / 2)
            if R < h and R < w:
                if cY - R < 0:
                    startY = 0
                    endY = 2 * R
                elif cY + R >= h:
                    startY = h - 2 * R
                    endY = h - 1
                else:
                    startY = cY - R
                    endY = cY + R
                if cX - R < 0:
                    startX = 0
                    endX = 2 * R
                elif cX + R >= w:
                    startX = w - 2 * R
                    endX = w - 1
                else:
                    startX = cX - R
                    endX = cX + R

            startX = int(startX)
            startY = int(startY)
            endX = int(endX)
            endY = int(endY)

            face_img = deepcopy(frame[startY:endY, startX:endX])
            # face_img = transform_img(face_img)

            y = startY - 10 if startY - 10 > 10 else startY + 10
            cv2.rectangle(frame, (startX, startY), (endX, endY), (0, 0, 255), 2)
            cv2.imwrite('../data/img_base/img.png', face_img)

            cv2.putText(frame, "FPS: {}".format(int(1.0 / (time.time() - tick))), (frame.shape[1] - 70, 25),
                        cv2.FONT_HERSHEY_SIMPLEX, 0.45, (0, 0, 255), 2)
            cv2.imshow("Frame", frame)

            out.write(frame.astype("uint8"))
            key = cv2.waitKey(0) & 0xFF
            if key == ord("q"):
                break

    out.release()
    cv2.destroyAllWindows()
    vs.stop()


if __name__ == "__main__":
    detect_face('../data/img_base/1.png')
    # main()
