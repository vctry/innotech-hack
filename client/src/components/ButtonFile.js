import React from 'react';
import {Cards} from "./Cards";
import ModalComponent from "./Modal";

export default class ButtonFile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            file: '',
            imagePreviewUrl: '',
            arrayLinks: '',
            data: {}
        }
    }

    fetchData = (data) => {
        fetch(`http://127.0.0.1:8000/api/parse/?user_id=25070787`)
            .then(res => res.json())
            .then(data => this.setState({ data: data.data.user }))
    }


    toDataUrl = url => {
        const {imagePreviewUrl} = this.state;
        const splitStr = imagePreviewUrl.split(',')[1];


        return fetch(url, {
            method: 'POST',
            body: JSON.stringify({image: splitStr}),
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/x-www-form-urlencoded'
        })
            .then(response => response.blob())
            .then(blob => new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onloadend = () => resolve(reader.result);
                reader.onerror = reject;
                reader.readAsDataURL(blob);
            }))
    }


    handleSubmit = e => {
        e.preventDefault();

        this.toDataUrl(`http://127.0.0.1:8000/api/recognize/`).then(data => data)
    }

    handleImageChange = e => {
        e.preventDefault();

        const reader = new FileReader();
        const file = e.target.files[0];

        reader.onloadend = () => {
            this.setState({
                file,
                imagePreviewUrl: reader.result
            })
        }

        reader.readAsDataURL(file)
    }

    handleChangeLinks = e => {
        this.setState({ arrayLinks: e.target.value + " " })
    }

    render() {

        const {imagePreviewUrl, data, arrayLinks} = this.state;

        let imagePreview = null;

        if (imagePreviewUrl) {
            imagePreview = (<img src={imagePreviewUrl} />)
        }

        return (
            <div className='container'>
                <form onSubmit={this.handleSubmit} style={{display: 'flex', justifyContent: 'space-evenly', marginTop: 40}}>
                    <div id="file-upload">
                        <label>
                            <input type="file" name="file" id="uploade-file" onChange={this.handleImageChange} />
                                <span className='btn btn-primary'>Выбрать изображение</span>
                        </label>
                    </div>
                    <button
                        type='submit'
                        className='btn btn-primary'
                        onClick={this.handleSubmit}
                        style={{marginLeft: 20}}
                    >Загрузить изображение</button>
                    <ModalComponent
                        variant={'primary'}
                        nameButton={'Выгрузить пользователей'}
                        modalHeaderText={'Новые пользователи'}
                        modalBodyText={
                            <input
                                type="text"
                                className='form-control'
                                placeholder='Ссылки на пользователей'
                                value={arrayLinks}
                                onChange={this.handleChangeLinks}
                            />
                        }
                        handleClick={this.fetchData}
                    />
                </form>
                <Cards
                    dataName={data.first_name || 'Имя'}
                    dataLastName={data.last_name || 'Фамилия'}
                    idUser={data.id || 'Идентификатор не задан'}
                    bday={data.bdate || 'Дата рождения'}
                    imageLink={data.photo_200_orig}
                    imageLoad={imagePreview}
                />
            </div>
        )
    }
}
