import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../../../../../Actions';
import Server from '../../../../../../../API/Server';
import Photo from './Photo';
import './index.css';

class ModalContent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            photo: ''
        };
    };
    handleUploadPhoto = image => {
        if (image.length !== 0) {
            return this.setState({ photo: image[0].dataURL });
        } return 0;
    };
    handleSubmitPhoto = async () => {
        if (this.state.photo !== '') {
            if (this.props.DBLoginStatus) {// logedIn using db
                const data = {
                    ...this.props.UserData,
                    profileImage: this.state.photo,
                };                
                this.props.handleUpdateDBUserData(data);
                this.props.handleCloseEditPhoto();
                return await Server.post("/data-account-photo", { photo: this.state.photo });
            } else {// logedIn as guest with localstorage
                const data = {
                    ...this.props.UserData,
                    profileImage: this.state.photo,
                };
                this.props.handleUpdateUserData(data);
                return this.props.handleCloseEditPhoto();
            };
        } return null;
    };
    render() {
        return (
            <div className="edit-photo-modal">
                <h3 className="preventcopy">Select profile photo</h3>
                <h4 className="preventcopy">Upload photos</h4>
                <hr />
                <Photo handleUploadPhoto={this.handleUploadPhoto} data="true" />
                <div className="btns-photo">
                    <div>
                        <button type="button" disabled={this.state.photo !== '' ? false:true}
                            className={this.state.photo !== '' ? 'profile-photo set-profile-photo':'profile-photo'}
                            onClick={this.handleSubmitPhoto}>
                            Set as profile photo
                        </button>
                        <button type="button" onClick={this.props.handleCloseEditPhoto}>
                            Cancel
                        </button>
                    </div>
                    <div className="preventcopy photo-note">
                        Your profile photo is visible to everyone, across Hoomer products. 
                    </div>
                </div>
            </div>
        );
    };
};

const mapStateToProps = getState => {
    if (getState.DBLoginStatus) {//login with db
        return {
            DBLoginStatus: getState.DBLoginStatus,
            UserData: getState.DBUserData,
        };
    } return {
        DBLoginStatus: getState.DBLoginStatus,
        UserData: getState.UserData,
    };
};

export default connect(mapStateToProps, actions)(ModalContent);
