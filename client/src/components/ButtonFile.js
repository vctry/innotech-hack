import React from 'react';
import {Cards} from "./Cards";

export default class ButtonFile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            file: '',
            imagePreviewUrl: ''
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

    render() {

        const {imagePreviewUrl} = this.state;
        let imagePreview = null;

        if (imagePreviewUrl) {
            imagePreview = (<img src={imagePreviewUrl} />)
        }

        return (
            <>
                <form onSubmit={this.handleSubmit} style={{display: 'flex', justifyContent: 'center', marginTop: 40}}>
                    <div id="file-upload">
                        <label>
                            <input type="file" name="file" id="uploade-file" onChange={this.handleImageChange} />
                                <span className='btn btn-primary'>Choose Image</span>
                        </label>
                    </div>
                    <button
                        type='submit'
                        className='btn btn-primary'
                        onClick={this.handleSubmit}
                        style={{marginLeft: 20}}
                    >Upload Image</button>
                </form>
                <Cards images={!imagePreview ? <p>Something wrong</p> : imagePreview}/>
            </>
        )
    }
}