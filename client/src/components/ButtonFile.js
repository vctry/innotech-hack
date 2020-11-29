import React from 'react';
import {Cards} from "./Cards";
import ModalComponent from "./Modal";

export default class ButtonFile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            file: '',
            imagePreviewUrl: '',
            arrayLinks: []
        }
    }

    handleSubmit = e => {
        e.preventDefault();

        fetch('url', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => console.log(data))
            .catch(e => console.log(e))
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
        this.setState({ arrayLinks: e.target.value })
    }

    render() {

        const {imagePreviewUrl, arrayLinks} = this.state;
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
                        handleClick={this.handleChangeLinks}
                    />
                </form>
                <Cards images={!imagePreview ? <p>Something wrong</p> : imagePreview}/>
            </div>
        )
    }
}

/*
* 'https://vk.com/id25070787',
            'https://vk.com/fess292',
            'https://vk.com/id368087565',
            'https://vk.com/mdzakat'
* */