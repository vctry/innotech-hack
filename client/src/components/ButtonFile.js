import React from 'react';

export default class ButtonFile extends React.Component {
    state = {
        selectedFile: null
    }

    onFileChange = event => {
        this.setState({ selectedFile: event.target.files[0] })

    }

    render() {

        return (
            <input type="file" onChange={this.onFileChange} />
        )
    }
}