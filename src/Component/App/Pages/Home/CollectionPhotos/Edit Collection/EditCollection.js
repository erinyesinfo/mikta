import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import * as actions from '../../../../../../Actions';
import './EditCollection.css';

class EditCollection extends Component {
    state = {
        isDeleteColletion: false,
        matches576: window.matchMedia("(max-width: 576px)").matches,
    }
    componentDidMount() {
        window.addEventListener('resize', this.handler576);
        window.addEventListener('load', this.handler576);
        window.addEventListener('scroll', this.handler576);
    }
    componentWillUnmount() {
        window.removeEventListener('resize', this.handler576);
        window.removeEventListener('load', this.handler576);
        window.removeEventListener('scroll', this.handler576);
    }
    handler576 = () => this.setState({matches576: window.innerWidth <= 576});
    toggleDelete = () => this.setState({ isDeleteColletion: true });
    cancelDelete = () => this.setState({ isDeleteColletion: false });
    deleteCollection = () => {
        const { img } = this.props;
        // typeof object
        this.props.collection(img);
        this.props.handleCloseEditCollection();
        return this.props.history.push('/home/collections');
    };
    renderInput = (formValues) => {
        const { img } = this.props;
        const { input, isTextarea, label, opt } = formValues;
        if (isTextarea) {
            return (
                <React.Fragment>
                    <label htmlFor={`editCollection-textArea-${img.id}`}>
                        {label}
                        <span className='opt'> ({opt})</span>
                    </label>
                    <textarea className='collectiontextArea' id={`editCollection-textArea-${img.id}`} {...input}
                    autoComplete="off" placeholder='Collection description' ></textarea>
                    <span className={(250 - input.value.length) < 0 ? 'editCollection-maxDescriptionNumber err': 'editCollection-maxDescriptionNumber'}>
                        {250 - input.value.length}
                    </span>
                </React.Fragment>
            );
        }
        return (
            <React.Fragment>
                <label htmlFor={`editCollection-input-${img.id}`}>
                    {label}
                </label>
                <input type='text' className='collectionInp' id={`editCollection-input-${img.id}`} {...input}
                autoComplete="off" placeholder='Enter a collection name?' />
                <span className={(60 - input.value.length) < 0 ? 'editCollection-maxNameNumber err': 'editCollection-maxNameNumber'}>
                    {60 - input.value.length}
                </span>
            </React.Fragment>
        );
    };
    onSubmit = (formValues) => {
        const { img } = this.props;
        const edit = true;
        const name = `editCollection-input-${img.id}`;
        const description = `editCollection-textArea-${img.id}`;
        const isDuplicateName = this.props.Collection.find(image => image.name === formValues[name]);
        if (isDuplicateName) return alert('This name is already used in your collection!');
        if (!formValues[name] || formValues[name].length < 3) return null;// @todo style this
        if (formValues[name].length > 60) return null;
        if (formValues[description] > 250) return null;
        this.props.collection(
            formValues[name].replace(/[^a-zA-Z0-9 ]/g, ''), 
            formValues[description], 
            img,
            edit
        );
        
        formValues.name = '';
        return this.props.handleCloseEditCollection();
    };
    render() {
        const { img } = this.props;
        return (
            <React.Fragment>
                <h1>Edit collection</h1>
                <form className='likes-collectionForm' onSubmit={this.props.handleSubmit(this.onSubmit)}>
                    <Field name={`editCollection-input-${img.id}`} isTextarea={false}
                    component={this.renderInput} label='Name' opt='' />
                    <Field name={`editCollection-textArea-${img.id}`} isTextarea={true}
                    component={this.renderInput} label='Description' opt='optional' />
                    <div className={this.state.matches576 ?
                        this.state.isDeleteColletion ? 'isbtnCollectionDelete':'btnCollection'
                        :'btnCollection'}>
                        {this.state.isDeleteColletion ? (
                            <span>Are you sure? </span>
                        ):null}
                        {this.state.isDeleteColletion ? (
                            <button className='cancelCollection'
                                onClick={this.cancelDelete} type='button'>
                                    Cancel
                            </button>
                        ):(
                            <button className='deleteCollection'
                            onClick={this.toggleDelete} type='button'>
                                Delete Collection
                            </button>
                        )}
                        {this.state.isDeleteColletion ? (
                            <button onClick={this.deleteCollection} 
                            className='deleteCollectionBtn' type='button'>
                                Delete Collection
                            </button>
                        ):(
                            <button className='createCollection' type='submit'>
                                Save
                            </button>
                        )}
                    </div>
                </form>
            </React.Fragment>
        )
    }
}

const mapStateToProps = (getState, getProps) => {
    const { img } = getProps;
    
    const myDefaultValue = {
         [`editCollection-input-${img.id}`]: img.name,
         [`editCollection-textArea-${img.id}`]: img.description,
    };
    return {
        initialValues: myDefaultValue,
        Collection: getState.Collection
    }
};

export default connect(mapStateToProps, actions)(reduxForm ({
    form: 'editCollectionForm', enableReinitialize: true, destroyOnUnmount: false})(EditCollection));