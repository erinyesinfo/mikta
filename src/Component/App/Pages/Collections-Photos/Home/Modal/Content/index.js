import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../../../../../Actions';
import './index.css';

class EditCollection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: this.props.img.name,
            name_error: '',
            description: this.props.img.description || '',
            description_error: '',
            delete: false
        };
    };
    toggleDelete = () => this.setState({ delete: true });
    cancelDelete = () => this.setState({ delete: false });
    handleDeleteCollection = async () => {
        await this.props.handleShowSpinner();
        const { img } = this.props;
        // typeof object
        if (this.props.DBLoginStatus) {//db login
            await this.props.handleUpdateCollectionsDataDB(img);
            this.props.handleCloseSpinner();
            return this.props.handleCloseEditCollection();
        }
        await this.props.handleUpdateCollectionsData(img);
        this.props.handleCloseSpinner();
        this.props.handleCloseEditCollection();
    };
    handleChange = e => {
        let value = e.target.value.replace(/(<|>|&)/g, '');
        this.setState({ [e.target.name]: value.replace(/ +/g, '') });
    };
    handleSubmit = async e => {
        e.preventDefault();
        const { name, name_error, description, description_error } = this.state;
        const { img, spinner } = this.props;
        if (spinner) return null;
        const edit = true;
        const isDuplicateName = this.props.CollectionsData.find(image => image.name === this.state.name);
        if (isDuplicateName) {
            return this.setState({ name_error: 'This name is already used in your collection!' });
        }
        if (!name) {
            return this.setState({ name_error: 'You must provide a name.' });
        } else if (name.length < 3) {
            return this.setState({ name_error: 'Name must be at least 3 characters.' });
        } else if (name.length > 60) {
            return this.setState({ name_error: 'Name cannot exceed 60 characters.' });
        } else {
            if (name_error.length !== 0) {
                this.setState({ name_error: '' });
            }
        }
        if (description.length > 250) {
            return this.setState({ description_error: 'description cannot exceed 250 characters.' });
        } else {
            if (description_error.length !== 0) {
                this.setState({ description_error: '' });
            }
        }
        await this.props.handleShowSpinner();
        if (this.props.DBLoginStatus) {//db login
            await this.props.handleUpdateCollectionsDataDB(
                name, 
                description, 
                img,
                edit
            );
            this.props.handleCloseSpinner();
            return this.props.handleCloseEditCollection();
        }
        await this.props.handleUpdateCollectionsData(
            name, 
            description, 
            img,
            edit
        );
        this.props.handleCloseSpinner();
        return this.props.handleCloseEditCollection();
    };
    renderInputs = () => (
        <React.Fragment>
            <label htmlFor={`name-${this.props.id}`}>Name</label>
            <input type='text' name="name" className='collectionInp' id={`name-${this.props.id}`}
                placeholder='Enter a collection name?' autoComplete="off"
                onChange={this.handleChange} value={this.state.name} 
            />
            <span className={(60 - this.state.name.length) < 0 ? 
                'editCollection-maxNameNumber err': 'editCollection-maxNameNumber'}>
                {60 - this.state.name.length}
            </span>
            {this.state.name_error !== '' ? (
                <span className="collection-error">{this.state.name_error}</span>
            ):null}
            <label htmlFor={`description-${this.props.id}`}>
                Description<span className='opt'> (optional)</span>
            </label>
            <textarea name="description" className='collectiontextArea' id={`description-${this.props.id}`}
                autoComplete="off" placeholder='Collection description'
                onChange={this.handleChange} value={this.state.description}
            ></textarea>
            <span className={(250 - this.state.description.length) < 0 ?
                'editCollection-maxDescriptionNumber err': 'editCollection-maxDescriptionNumber'}>
                {250 - this.state.description.length}
            </span>
            {this.state.description_error !== '' ? (
                <span className="collection-error">{this.state.description_error}</span>
            ):null}
        </React.Fragment>
    );
    render() {
        return (
            <React.Fragment>
                <h1>Edit collection</h1>
                <form className='likes-collectionForm' onSubmit={this.handleSubmit}>
                    {this.renderInputs()}
                    <div className={this.state.delete ? 'btn-collection-delete-container':'btn-collection-container'}>
                        {this.state.delete ? (
                            <React.Fragment>
                                <span>Are you sure? </span>
                                <span className='cancelCollection' onClick={this.cancelDelete}>
                                    Cancel
                                </span>
                                <button type='button' onClick={this.handleDeleteCollection} className='deleteCollectionBtn'
                                    disabled={this.props.spinner ? true:false}>
                                    Delete Collection
                                </button>
                            </React.Fragment>
                        ):(
                            <React.Fragment>
                                <button type='button' className='delete-collection-btn'
                                onClick={this.toggleDelete}>
                                    Delete Collection
                                </button>
                                <button type='submit' className='createCollection' disabled={this.props.spinner ? true:false}>
                                    Save
                                </button>
                            </React.Fragment>
                        )}
                    </div>
                    {this.props.spinner ? (
                        <div className="edit-spinner"><i className="fas fa-circle-notch"></i></div>
                    ):null}
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

export default connect(mapStateToProps, actions)(EditCollection);
