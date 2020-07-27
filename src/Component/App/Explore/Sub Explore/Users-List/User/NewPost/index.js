import React, { Component } from 'react';
import uuid from 'uuid/v4';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import * as actions from '../../../../../../../Actions';
import PostCard from './PostCard';
import './index.css';

/* ThirdParty-Library */
import LazyImage from '../../../../../../ThirdParty-Library/Lazy Image/LazyImage';

/* PostSearch Modal */
import PostSearchModal from './Modal';
/* PostSearch Modal Content */
import PostSearchModalContent from './Modal/Content';

/* Image Upload */
import Image from './Upload-image';

class NewPost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showPostSearch: false,
            selectPhoto: [],
            isUpload: false
        };
    };
    handleShowPostSearch = () => this.setState({ showPostSearch: true });
    handleClosePostSearch = () => this.setState({ showPostSearch: false });
    handleSelectPhoto = img => {
        const removeImg = this.state.selectPhoto.find(data => data === img);
        if (removeImg) return this.setState({ selectPhoto: [] });
        this.setState({ selectPhoto: [ img ] });
    };
    PostSearchContent = () => {
        return (
            <PostSearchModalContent
                selectPhoto={this.state.selectPhoto}
                handleSelectPhoto={this.handleSelectPhoto}
            />
        );
    };
    renderPostSearch = () => {
        return (
            <PostSearchModal handleClosePostSearch={this.handleClosePostSearch}
            showPostSearch={this.state.showPostSearch} 
            PostSearchContent={this.PostSearchContent} />
        );
    };
    renderInput = formValues => {
        const { input, isRandomIMG, label } = formValues;
        if (isRandomIMG) {
            const { checkRandomImage } = this.props.initialValues;
            return (
                <div hidden={this.state.selectPhoto.length > 0 ? true:false} className='post-checkboxDiv'>
                    <input type='checkbox' defaultChecked={checkRandomImage} 
                        className='randomIMG' id='randomIMG' {...input}
                        autoComplete="off" placeholder='What do you think?' />
                    <label htmlFor='randomIMG'>{label}</label>
                    <span className='span-setting' onClick={this.handleShowPostSearch}>
                        <i className="fas fa-cog"></i>
                    </span>
                </div>
            );
        } return (
            <textarea className='newPost' id='newPost' {...input}
            autoComplete="off" placeholder='What do you think?'></textarea>
        );
    };
    onSubmit = formValues => {
        const { DBLoginStatus, LocalStorageLoginStatus } = this.props;
        let { newPost, checkRandomImage } = formValues;
        if (!DBLoginStatus && !LocalStorageLoginStatus) return alert('Attention, you have to be log in in order to create post!')
        if (!newPost) return null;

        const isRandomImage = (this.props.NewPostUploadedPhotos.length !== 0 && this.state.isUpload) ? 
            this.props.NewPostUploadedPhotos
            :this.state.selectPhoto.length === 0 ?
                checkRandomImage:this.state.selectPhoto;
        this.props.handleNewPost(uuid(), newPost, isRandomImage);
        this.setState({ selectPhoto: [], isUpload: false });
        formValues.newPost = '';
    };
    uploadImage = () => this.setState(st => ({ isUpload: !st.isUpload }) );
    notAvailableYet = () => alert('Attention, this feature is not available');
    render() {
        const { DBLoginStatus, LocalStorageLoginStatus } = this.props;
        const { profileImage } = this.props.UserData;
        if (!DBLoginStatus && !LocalStorageLoginStatus) return null;
        let emtyObject = {};
        const PostStory = this.props.PostData.map((post, i) => {
            return <PostCard key={post.id} history={this.props.history} i={i} 
                    comment_Name={`comment_${uuid()}`} 
                    image={post.isRandom ? post.data:null} 
                    userPost={post.userPost}
                    isRandom={post.isRandom}
                    id={post.id}
                    likes={post.isRandom ? post.likes:null}
                    time={post.time} />
        });
        return (
            <React.Fragment>
                <form className='post-formStyle' onSubmit={this.props.handleSubmit(this.onSubmit)}>
                    <div className='post-postText'>
                        <button type='button'
                            className={this.state.isUpload ?
                                'post-makePost-btn post-disable-btn'
                                :'post-makePost-btn post-active-btn'}
                            onClick={this.uploadImage}
                            disabled={this.state.isUpload ? false:true}>
                            <i className="fas fa-pen"></i>
                            &nbsp; Make Post
                        </button>
                        <span className='post-seperate'>&nbsp;|&nbsp;</span>
                        <button type='button'
                            className={this.state.isUpload ?
                                'post-photoVideo-btn post-active-btn'
                                :'post-photoVideo-btn post-disable-btn'}
                            onClick={this.uploadImage}
                            disabled={this.state.isUpload ? true:false}>
                            <i className="fas fa-photo-video"></i>
                            &nbsp; Photo/Video Album
                        </button>
                        <span className='post-seperate'>&nbsp;|&nbsp;</span>
                        <button type='button' className='post-live-btn'
                            onClick={this.notAvailableYet}>
                            <i className="fas fa-video"></i>
                            &nbsp; Live Video
                        </button>
                    </div>
                    <div className='post-innerFormStyle'>
                        <div className='post-form-divStyle'>
                            <LazyImage ClickImage={null} imageRef={null}
                                classImage='post-imageStyle'
                                srcImage={profileImage} draggable={false}
                                altImage='profileImage' style={emtyObject}
                            />
                            <Field name='newPost' component={this.renderInput} />
                        </div>
                        {this.state.isUpload ? (
                            /* Upload Image */
                            <Image isUpload={this.state.isUpload} />
                        ):(
                            /* Select Your Image */
                            this.state.selectPhoto.length > 0 ? (
                                <div className='post-selectPhotoWrapper'>
                                    <div className='post-selectPhoto'>
                                        <button disabled>Browse...</button>
                                        {this.state.selectPhoto.map(img => {
                                            return <span key={img.id}>&nbsp;{img.id}.png</span>
                                        })}
                                    </div>
                                    <span className='span-setting' onClick={this.handleShowPostSearch}>
                                        <i className="fas fa-cog"></i>
                                    </span>
                                </div>
                            ):
                            /* Random Image */
                            <Field name='checkRandomImage' component={this.renderInput}
                            isRandomIMG={true}
                            label='generate random image' />
                        )}
                        <button type='submit' className='post-submit'>Post</button>
                    </div>
                </form>
                {this.props.PostData.length !== 0 ?
                    <div className='PostCardStyle'>
                        {PostStory}
                    </div>
                :null}
                {/* Modal */}
                {this.state.showPostSearch ? 
                    this.renderPostSearch()
                :null}
            </React.Fragment>
        );
    };
};

const mapStateToProps = getState => {
    const postValues = { checkRandomImage: true, generateXPhotos: 10 };
    if (getState.DBLoginStatus) {//login with db
        return {
            initialValues: postValues,
            DBLoginStatus: getState.DBLoginStatus,
            LocalStorageLoginStatus: getState.LocalStorageLoginStatus,
            UserData: getState.DBUserData,
            PostData: getState.NewPost,
            NewPostUploadedPhotos: getState.NewPostUploadedPhotos,
        };
    } return {
        initialValues: postValues,
        DBLoginStatus: getState.DBLoginStatus,
        LocalStorageLoginStatus: getState.LocalStorageLoginStatus,
        UserData: getState.UserData,
        PostData: getState.NewPost,
        NewPostUploadedPhotos: getState.NewPostUploadedPhotos,
    };
};

export default connect(mapStateToProps, actions)(reduxForm ({
    form: 'newPostForm', enableReinitialize: true})(NewPost));
