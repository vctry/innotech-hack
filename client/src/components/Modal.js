import React, {Component} from 'react';
import {Modal, Button} from 'react-bootstrap';


export default class ModalComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false
        }
    }

    handleCloseModal = () => this.setState({ open: false });

    handleOpenModal = () => this.setState({ open: true });

    handleSaveModal = (e) => {
        e.preventDefault();
        this.setState({ open: false });
    }

    render() {

        const {open} = this.state;

        return (
            <>
                <Button variant={this.props.variant} onClick={this.handleOpenModal}>
                    {this.props.nameButton}
                </Button>

                <Modal show={open} onHide={this.handleCloseModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>{this.props.modalHeaderText}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>{this.props.modalBodyText}</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleCloseModal}>
                            Закрыть
                        </Button>
                        <Button variant="primary" onClick={this.props.handleClick}>
                            Сохранить изменения
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        )
    }
}