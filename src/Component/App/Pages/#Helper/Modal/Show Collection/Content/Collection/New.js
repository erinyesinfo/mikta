import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../../../../../../Actions';

class CreateNewCollection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            name_error: '',
            description: '',
            description_error: '',
        };
    };
    handleChange = e => {
        let value = e.target.value.replace(/(<|>|&)/g, '');
        this.setState({ [e.target.name]: value.replace(/ +/g, '') });
    };
    handleSubmit = e => {
        e.preventDefault();
        const { name, name_error, description, description_error } = this.state;
        const { img } = this.props;
        const isDuplicateName = this.props.CollectionsData.find(image => image.name === name);
        if (isDuplicateName) return this.setState({ name_error: 'This name is already used in your collection!' });
        else if (!name) return this.setState({ name_error: 'You must provide a name.' });
        else if (name.length < 3) return this.setState({ name_error: 'Name must be at least 3 characters.' });
        else if (name.length > 60) return this.setState({ name_error: 'Name cannot exceed 60 characters.' });
        else {
            if (name_error !== '') { this.setState({ name_error: '' }); }
        }
        if (description && description.length > 250) return this.setState({ description_error: 'description cannot exceed 250 characters.' });
        else {
            if (description_error !== '') { this.setState({ description_error: '' }); }
        }
        if (this.props.DBLoginStatus) {
            this.props.handleUpdateCollectionsDataDB(
                name,
                description, 
                img
            );
            return this.props.handleCloseCollection();
        }
        this.props.handleUpdateCollectionsData(
            name,
            description,
            img
        );
        return this.props.handleCloseCollection();
    };
    renderInputs = () => (
        <React.Fragment>
            <label htmlFor={`name-${this.props.img.id}`}>Name</label>
            <input className='collectionInp' name='name' id={`name-${this.props.img.id}`} required
                autoComplete="off" placeholder='Enter a collection name?' autoFocus
                onChange={this.handleChange} value={this.state.name}
            />
            <span className={(60 - this.state.name.length) < 0 ? 'maxNameNumber err':'maxNameNumber'}>
                {60 - this.state.name.length}
            </span>
            {this.state.name_error !== '' ? (
                <span className="collection-error">{this.state.name_error}</span>
            ):null}

            <label htmlFor={`description-${this.props.img.id}`}>
                description<span className='opt'> (optional)</span>
            </label>
            <textarea className='collectiontextArea' name='description' id={`description-${this.props.img.id}`}
                autoComplete="off" placeholder='Collection description'
                onChange={this.handleChange} value={this.state.description}
            ></textarea>
            <span className={(250 - this.state.description.length) < 0 ? 'maxDescriptionNumber err': 'maxDescriptionNumber'}>
                {250 - this.state.description.length}
            </span>
            {this.state.description_error !== '' ? (
                <span className="collection-error">{this.state.description_error}</span>
            ):null}
        </React.Fragment>
    );
    render() {
        const { closeCreateForm } = this.props;
        return (
            <React.Fragment>
                <h1>Create new collection</h1>
                <form className='likes-collectionForm' onSubmit={this.handleSubmit}>
                    {this.renderInputs()}
                    <div className='btnCollection'>
                        <button className='cancelCollection' onClick={closeCreateForm} type='button'>Cancel</button>
                        <button className='createCollection' type='submit'>Create Collection</button>
                    </div>
                </form>
            </React.Fragment>
        );
    };
};

const mapStateToProps = getState => {
    if (getState.DBLoginStatus) {//login with db
        return {
            DBLoginStatus: getState.DBLoginStatus,
            CollectionsData: getState.DBUserCollectionsData
        };
    } return {
        DBLoginStatus: getState.DBLoginStatus,
        CollectionsData: getState.CollectionsData
    };
};

export default connect(mapStateToProps, actions)(CreateNewCollection);
