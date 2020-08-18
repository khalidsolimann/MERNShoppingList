import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input } from 'reactstrap';
import { connect } from 'react-redux';
import { addItem } from '../actions/itemActions';
import PropTypes from 'prop-types';

class ItemModal extends React.Component {
    state = {
        modal: false,
        name: ''
    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal
        })
    }

    onChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        }) ;
    }

    onSubmit = (e) => {
        e.preventDefault();
        const newItem = {
            name: this.state.name
        }

        // Add item
        this.props.addItem(newItem);

        // Close modal
        this.toggle();
    }

    render() {
        return (
            <div>
                <Button color="dark" style={{marginBottom: '2rem'}} onClick={this.toggle}>
                    Add Item
                </Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>
                        Add to List
                    </ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                <Label for="item">Item</Label>
                                <Input type="text" name="name" id="item" onChange={this.onChange} />
                                <Button color="dark" style={{marginTop: '2rem'}} block>Add Item</Button>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
        )
    }

}

ItemModal.protoTypes = {
    addItem: PropTypes.func.isRequired
}

const mapDispatchToProps = (dispatch) => {
    return {
        addItem: (item) => dispatch(addItem(item))
    }
}


export default connect(null, mapDispatchToProps)(ItemModal);