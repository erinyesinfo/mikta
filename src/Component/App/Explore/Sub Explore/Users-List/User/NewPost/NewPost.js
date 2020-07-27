import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import * as actions from '../../../../../../../Actions';
import uuid from 'uuid/v4';
import PostCard from './PostCard';
import './NewPost.css';

/* ThirdParty-Library */
import LazyImage from "../../../../../../ThirdParty-Library/Lazy Image/LazyImage";

/* PostSearch Modal */
import PostSearchModal from "./Modal/PostSearchModal";
/* PostSearch Modal Content */
import PostSearchModalContent from "./Modal/ModalContent/PostSearchModalContent";

/* Image Upload */
import Image from './Upload-image/Image';

class NewPost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isPostSearch: false,
            showPostSearch: false,
            selectPhoto: [],
            isUpload: false
        };
    };
    togglePostSearch = () => this.setState({ isPostSearch: true });
    handleShowPostSearch = () => this.setState({ showPostSearch: true });
    handleClosePostSearch = () => this.setState({ showPostSearch: false, isPostSearch: false });
    handleSelectPhoto = img => {
        const removeImg = this.state.selectPhoto.find(data => data === img);
        if (removeImg) return this.setState({ selectPhoto: [] });
        this.setState({ selectPhoto: [ img ] });
    };
    PostSearchContent = () => {
        return <PostSearchModalContent
                    selectPhoto={this.state.selectPhoto}
                    handleSelectPhoto={this.handleSelectPhoto}
                />
    };
    renderPostSearch = () => {
        return (
            <PostSearchModal handleShowPostSearch={this.handleShowPostSearch} 
            handleClosePostSearch={this.handleClosePostSearch}
            showPostSearch={this.state.showPostSearch} 
            isPostSearch={this.state.isPostSearch}
            PostSearchContent={this.PostSearchContent} />
        );
    };
    renderInput = (formValues) => {
        const { input, isRandomIMG, label } = formValues;
        if (isRandomIMG) {
            const { checkRandomImage } = this.props.initialValues;
            return (
                <div hidden={this.state.selectPhoto.length > 0 ? true:false} className='post-checkboxDiv'>
                    <input type='checkbox' defaultChecked={checkRandomImage} 
                        className='randomIMG' id='randomIMG' {...input}
                        autoComplete="off" placeholder='What do you think?' />
                    <label htmlFor='randomIMG'>{label}</label>
                    <span className='span-setting' onClick={this.togglePostSearch}>
                        <i className="fas fa-cog"></i>
                    </span>
                </div>
            );
        }
        return (
            <textarea className='newPost' id='newPost' {...input}
            autoComplete="off" placeholder='What do you think?'></textarea>
        );
    };
    onSubmit = (formValues) => {
        const { LogIn } = this.props;
        let { newPost, checkRandomImage } = formValues;
        if (!LogIn) return alert('Attention, you have to be log in in order to create post!')
        if (!newPost) return null;

        const isRandomImage = (this.props.UploadedPhotos.length !== 0 && this.state.isUpload) ? 
            this.props.UploadedPhotos
            :this.state.selectPhoto.length === 0 ?
                checkRandomImage:this.state.selectPhoto;
        this.props.newPost(uuid(), newPost, isRandomImage);
        this.setState({ selectPhoto: [], isUpload: false });
        formValues.newPost = '';
    };
    uploadImage = () => this.setState(st => ({ isUpload: !st.isUpload }) );
    notAvailableYet = () => alert('Attention, this feature is not available');
    render() {
        const { initialValuesProfileData, LogIn } = this.props;
        const { profileImage } = initialValuesProfileData;
        if (!LogIn) return null;
        let emtyObject = {};
        const PostStory = this.props.Post.map((post, i) => {
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
                                srcImage={profileImage}
                                altImage='profile-img' style={emtyObject}
                            />
                            {/* <img className='post-imageStyle' src={profileImage} alt='profile-img' /> */}
                            <Field name='newPost' component={this.renderInput} />
                        </div>
                        {/* Upload || Select || Random Image */}
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
                                    <span className='span-setting' onClick={this.togglePostSearch}>
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
                {this.props.Post.length !== 0 ?
                    <div className='PostCardStyle'>
                        {PostStory}
                    </div>
                :null}
                {/* Modal */}
                {this.state.isPostSearch ? 
                    this.renderPostSearch()
                :null}
            </React.Fragment>
        );
    };
};

const mapStateToProps = getState => {
    const postValues = { checkRandomImage: true, generateXPhotos: 10 };
    return {
        initialValues: postValues,
        initialValuesProfileData: getState.ProfileData,
        LogIn: getState.isLogIn,
        Post: getState.newPost,
        UploadedPhotos: getState.UploadedPhotos,
    };
};

export default connect(mapStateToProps, actions)(reduxForm ({
    form: 'newPostForm', enableReinitialize: true})(NewPost));
