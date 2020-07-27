import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import * as actions from '../../../../../../../../../Actions';
import './index.css';

class EditModalContent extends Component {
    imageRef = React.createRef();
    renderInput = ({ input }) => {
        const { id } = this.props;
        const postId = `postId-${id}`;
        return (
            <input className='descriptionInp' {...input} id={postId}
            autoComplete="off" autoFocus placeholder='What do you think?' />
        );
    };
    onSubmit = formValues => {
        const { id } = this.props;
        const postId = `postId-${id}`;
        if (!formValues[postId]) return null
        this.props.handleNewPost(id, formValues[postId], 'edit');
        formValues.postId = '';
        return this.props.handleCloseEditModal();
    };
    render() {
        const { id } = this.props;
        const postId = `postId-${id}`;
        return (
            <form onSubmit={this.props.handleSubmit(this.onSubmit)}
                className='formDescription'>
                <label className='descriptionLabel' htmlFor={postId}>
                    Change description
                </label>
                <Field name={postId} component={this.renderInput} />
                <div className='dvBtn'>
                    <button type='submit' className="editPostBtn" >
                        Edit
                    </button>
                    <button type='button' className="cancelPostBtn"
                        onClick={this.props.handleCloseEditModal}>
                        Cancel
                    </button>
                </div>
            </form>
        );
    };
};

export default connect(null, actions)(reduxForm ({
    form: 'editForm-Modal'})(EditModalContent));
