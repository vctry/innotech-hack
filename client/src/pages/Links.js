import React, {Component} from 'react';
import {Modal, Button} from 'react-bootstrap';


export default class Links extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false
        }
    }

    handleCloseModal = () => this.setState({ open: false });

    handleOpenModal = () => this.setState({ open: true });

    render() {

        const {open} = this.state;

        return (
            <>
                <Button variant="primary" onClick={this.handleOpenModal}>
                    Launch demo modal
                </Button>

                <Modal show={open} onHide={this.handleCloseModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Modal heading</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleCloseModal}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={this.handleCloseModal}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        )
    }
}