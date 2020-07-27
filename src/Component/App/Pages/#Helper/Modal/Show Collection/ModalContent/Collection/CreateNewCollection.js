import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import * as actions from '../../../../../../../../Actions';

class CreateNewCollection extends Component {
    renderInput = (formValues) => {
        const { img } = this.props;
        const { input, isTextarea, label, opt } = formValues;
        if (isTextarea) {
            return (
                <React.Fragment>
                    <label htmlFor={`likesCollection-textArea-${img.id}`}>
                        {label}
                        <span className='opt'> ({opt})</span>
                    </label>
                    <textarea className='collectiontextArea' id={`likesCollection-textArea-${img.id}`} {...input}
                    autoComplete="off" placeholder='Collection description' ></textarea>
                    <span className={(250 - input.value.length) < 0 ? 'maxDescriptionNumber err': 'maxDescriptionNumber'}>
                        {250 - input.value.length}
                    </span>
                </React.Fragment>
            );
        }
        return (
            <React.Fragment>
                <label htmlFor={`likesCollection-input-${img.id}`}>
                    {label}
                </label>
                <input className='collectionInp' {...input}
                id={`likesCollection-input-${img.id}`} required
                autoComplete="off" placeholder='Enter a collection name?' />
                <span className={(60 - input.value.length) < 0 ? 'maxNameNumber err': 'maxNameNumber'}>
                    {60 - input.value.length}
                </span>
            </React.Fragment>
        );
    };
    onSubmit = (formValues) => {
        const { img } = this.props;
        let name = `likesCollection-input-${img.id}`;
        let description = `likesCollection-textArea-${img.id}`;
        const isDuplicateName = this.props.Collection.find(image => image.name === formValues[name]);
        if (isDuplicateName) return alert('This name is already used in your collection!');
        if (!formValues[name] || formValues[name].length < 3) return null;// @todo style this
        if (formValues[name].length > 60) return null;
        if (formValues[description] > 250) return null;
        this.props.collection(
            formValues[name].replace(/[^a-zA-Z0-9 ]/g, ''), 
            formValues[description], 
            img
        )
        
        formValues.name = '';
        return this.props.handleCloseCollection();
    };
    render() {
        const { img, closeCreateForm } = this.props;
        return (
            <React.Fragment>
                <h1>Create new collection</h1>
                <form className='likes-collectionForm' onSubmit={this.props.handleSubmit(this.onSubmit)}>
                    <Field name={`likesCollection-input-${img.id}`} isTextarea={false}
                    component={this.renderInput} label='Name' opt='' />
                    <Field name={`likesCollection-textArea-${img.id}`} isTextarea={true}
                    component={this.renderInput} label='Description' opt='optional' />
                    <div className='btnCollection'>
                        <button className='cancelCollection' onClick={closeCreateForm} type='button'>Cancel</button>
                        <button className='createCollection' type='submit'>Create Collection</button>
                    </div>
                </form>
            </React.Fragment>
        )
    }
}

const mapStateToProps = (getState) => {
    return { Collection: getState.Collection }
};

export default connect(mapStateToProps, actions)(reduxForm ({
    form: 'collectionForm'})(CreateNewCollection));