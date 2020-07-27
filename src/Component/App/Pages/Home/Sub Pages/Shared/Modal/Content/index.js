import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import * as actions from '../../../../../../../../Actions';
import './index.css';

class EditModalContent extends Component {
    renderInput = ({ input }) => {
        const descriptionId = `description-${this.props.img.id}`;
        return (
            <input className='descriptionInp' {...input} id={descriptionId} autoFocus
            autoComplete="off" placeholder='What do you think?' />
        );
    };
    onSubmit = formValues => {
        const descriptionId = `description-${this.props.img.id}`;
        if (!formValues[descriptionId]) return null;
        // edit shared data
        if (this.props.DBLoginStatus) {
            this.props.handleUpdateShareDataDB(formValues[descriptionId], this.props.img.id);
            formValues.descriptionId = '';
            return this.props.handleCloseEditModal();
        }
        this.props.handleUpdateShareData(formValues[descriptionId], this.props.img.id);
        formValues.descriptionId = '';
        return this.props.handleCloseEditModal();
    };
    render() {
        const { img } = this.props;
        const descriptionId = `description-${img.id}`;
        return (
            <form onSubmit={this.props.handleSubmit(this.onSubmit)} className='formDescription'>
                <label className='descriptionLabel' htmlFor={descriptionId}>
                    Change description
                </label>
                <Field name={descriptionId} component={this.renderInput} />
                {img.myDescription && img.myDescription.length !== 0 ? (
                    <div className='dvDescription'>
                        <h4>Original description</h4>
                        <p>{img.description}</p>
                    </div>
                ):null}
                <div className='dvBtn'>
                    <button type='submit' className="editSharedBtn" >
                        Edit
                    </button>
                    <button type='button' className="cancelSharedBtn"
                        onClick={this.props.handleCloseEditModal}>
                        Cancel
                    </button>
                </div>
            </form>
        );
    };
};

const mapStateToProps = getState => {
    return { DBLoginStatus: getState.DBLoginStatus };
};

export default connect(mapStateToProps, actions)(reduxForm ({
    form: 'editHomeShared-Modal'})(EditModalContent));
