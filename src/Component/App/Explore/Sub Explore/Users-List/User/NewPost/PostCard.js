import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import * as actions from '../../../../../../../Actions';
import Comments from '../Comments/NewComment';
import uuid from 'uuid/v4';
import '../UserCard.css';

/* show user setting */
import Setting from './PostCard-setting/Setting';

/* Share Modal */
import ShareModal from '../Modal/Share Modal/ShareModal';
/* Share Modal Content */
import ShareModalContent from '../Modal/Share Modal/ModalContent/ShareModalContent';

/* Edit Modal */
import EditModal from '../Modal/Edit Description/EditModal';
/* Edit Modal Content */
import EditModalContent from '../Modal/Edit Description/ModalContent/EditModalContent';

/* User Image Modal */
import UserImage from '../Modal/User Image/UserImage';
/* User Image Modal Content */
import UserImageModalContent from '../Modal/User Image/ModalContent/UserImageModalContent';

/* ThirdParty-Library */
import LazyImage from "../../../../../../ThirdParty-Library/Lazy Image/LazyImage";

class PostCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
          likesBool: false,
          likes: (this.props.isRandom || this.props.image === null) ? 0 : this.props.image.likes,
          isShareModal: false,
          showShareModal: false,
          showDescription: false,
          isEditModal: false,
          showEditModal: false,
          showUserImage: false,
          isUserImage: false,
        };
        this.postUserImageRef = React.createRef();
    };
    componentDidMount() {
        if (this.props.isRandom) {
            return this.props.image.map(img => {
                const foundLikedImage = this.props.LikesData.find(data => data.id === img.id);
                if (foundLikedImage) return this.setState(st => ({ likes: st.likes + 1 }) );
                else return null
            });
        } else {
            const foundLikedImage = this.props.Post.find(
                data => data.id === this.props.id && data.likes === 1
            );
            if (foundLikedImage) return this.setState(st => ({ likes: st.likes + 1 }) );
            else return null
        }
    };
    handleUserRoute = () => this.props.history.push(`/home`);
    handleLike = () => {
        if (!this.props.LogIn) return alert('Attention, you have to be log in in order to like photos!');
        if (this.props.isRandom) {
            return this.props.image.map(img => {
                const foundLikedImage = this.props.LikesData.find(data => data.id === img.id);
                if (foundLikedImage) {
                    //window.location.replace('http://localhost:3000/')
                    this.setState(st => ({ likes: st.likes - 1 }) );
                    return this.props.removeLikesData(img.id);
                }
                this.setState(st => ({ likes: st.likes + 1 }) );
                return this.props.likesData(img);
            });
        } else {
            if (this.state.likes === 1) {
                this.setState(st => ({ likes: st.likes - 1 }) );
                return this.props.newPost(this.props.id, 0);
            }
            this.setState(st => ({ likes: st.likes + 1 }) );
            return this.props.newPost(this.props.id, 1);
        }
    };
    handleRemoveComment = (comment) => this.props.removeComment(comment);
    handleEditComment = (comment, id) => this.props.editComment(comment, id);
    renderInput = formValues => {
        const { input, id } = formValues;
        return (
            <input className='commentInp' id={id || this.props.comment_Name} {...input}
            autoComplete="off" placeholder='What do you think?' />
        );
    };
    onSubmit = formValues => {
        const { id } = this.props;
        const { LogIn, Comments, comment_Name } = this.props;
        const sameTask = Comments.find(data => data.comment === formValues[comment_Name]);
        if (sameTask) return null;
        if (!LogIn) return alert('Attention, you have to be log in in order to share your comments!')
        if (!formValues[comment_Name]) return null
        this.props.comments(formValues[comment_Name], id)
        return formValues[comment_Name] = '';
    };

    /* Share Modal */
    toggleShareModal = () => {
        var element = document.querySelector("body");
        element.style.overflow = 'hidden';
        this.setState({ isShareModal: true });
    };
    handleShowShareModal = () => this.setState({ showShareModal: true });
    handleCloseShareModal = () => {
        var element = document.querySelector("body");
        this.state.isUserImage ? element.style.overflow = 'hidden':element.style.overflow = 'auto';
        return this.setState({
            showShareModal: false,
            isShareModal: false,
            showDescription: false,
        });
    };
    renderShareContent = () => {
        return <ShareModalContent 
                    image={this.props.image}
                    isRandom={this.props.isRandom}
                    renderShareInput={this.renderShareInput}
                    onShareSubmit={this.onShareSubmit}
                    likes={this.state.likes}
                    id={this.props.id}
                    userPost={this.props.userPost}
                    comment_Name={this.props.comment_Name}
                    handleCloseShareModal={this.handleCloseShareModal}
                />
    };
    renderShareModal = () => {
        return (
          <ShareModal handleShowShareModal={this.handleShowShareModal} 
          handleCloseShareModal={this.handleCloseShareModal} showShareModal={this.state.showShareModal}
          isShareModal={this.state.isShareModal} renderShareContent={this.renderShareContent}
          showIsOk={this.state.showIsOk} />
        );
    };
    renderShareInput = ({ input }) => {
        return (
            <input className='share-commentInp' {...input} autoComplete="off"
            placeholder='What do you think?' />
        );
    };
    onShareSubmit = (formValues) => {
        if (this.props.isRandom) {
            return this.props.image.map(img => {
                const comment_Name = `share-${this.props.comment_Name}`;
                if (!this.props.LogIn) return alert('hi there, you have to be log in in order to share your comments!')
                const duplicates = this.props.SharedData.find(data => data.id === img.id);
                if (duplicates) return alert('You already shared this data in your profile')
                
                this.props.shareData(formValues[comment_Name], img)
                var element = document.querySelector("body");
                element.style.overflow = 'auto';
                return this.props.history.push('/home');
            });
        } else {
            const comment_Name = `share-${this.props.comment_Name}`;
            if (!this.props.LogIn) return alert('hi there, yo have to be log in in order to share your comments!')
            const { userPost, id } = this.props;
            //const isOk = this.props.Post.find(data => data.userPost === userPost);
            
            this.props.shareData(
                formValues[comment_Name] || null, // add description or null
                null, // img is null
                id,
                userPost, // my own descrition
                this.state.likes,
            )
            
            var element = document.querySelector("body");
            element.style.overflow = 'auto';
            return this.props.history.push('/home');
        }
    };
    handleShowDescription = () => this.setState({ showDescription: true });

    /* Edit description Modal */
    toggleEditModal = () => {
        var element = document.querySelector("body");
        element.style.overflow = 'hidden';
        this.setState({ isEditModal: true });
    };
    handleShowEditModal = () => this.setState({ showEditModal: true });
    handleCloseEditModal = () => {
        var element = document.querySelector("body");
        this.state.showUserImage ? element.style.overflow = 'hidden':element.style.overflowY = 'auto'
        this.setState({ showEditModal: false, isEditModal: false });
    };
    renderEditModalContent = () => {
        return <EditModalContent id={this.props.id}
                    handleCloseEditModal={this.handleCloseEditModal}
                />
    };
    renderEditModal = () => {
        return (
            <EditModal handleShowEditModal={this.handleShowEditModal}
            handleCloseEditModal={this.handleCloseEditModal}
            showEditModal={this.state.showEditModal}
            isEditModal={this.state.isEditModal}
            renderEditModalContent={this.renderEditModalContent} />
        );
    };
    /* User Image Modal */
    toggleUserImage = () => {
        var element = document.querySelector("body");
        element.style.overflow = 'hidden';
        this.setState({ isUserImage: true });
    }
    handleShowUserImage = () => this.setState({ showUserImage: true });
    handleCloseUserImage = () => {
        var element = document.querySelector("body");
        element.style.overflow = 'auto';
        return this.setState({
            showUserImage: false,
            isUserImage: false,
        });
    };
    renderUserImageModalContent = () => {
        return <UserImageModalContent likes={this.state.likes}
                    handleLike={this.handleLike}
                    isRandom={this.props.isRandom}
                    image={this.props.image}
                    id={this.props.id}
                    userPost={this.props.userPost}
                    handleRemoveComment={this.handleRemoveComment}
                    handleEditComment={this.handleEditComment}
                    handleUserRoute={this.handleUserRoute}
                    toggleShareModal={this.toggleShareModal}
                    handleEdit={this.handleEdit}
                    handleRemove={this.handleRemove}
                    comment_Name={this.props.comment_Name}
                    renderInput={this.renderInput}
                    onSubmit={this.onSubmit}
                    /* show edit modal */
                    toggleEditModal={this.toggleEditModal}
                />
    };
    renderUserImageModal = () => {
        return (
          <UserImage handleShowUserImage={this.handleShowUserImage} 
            handleCloseUserImage={this.handleCloseUserImage}
            showUserImage={this.state.showUserImage}
            isUserImage={this.state.isUserImage}
            renderUserImageModalContent={this.renderUserImageModalContent}
            showShareModal={this.state.showShareModal}
            showEditModal={this.state.showEditModal} />
        );
    };
    render() {
        let emtyObject = {};
        let inlineStylingLazyImage = { minHeight: '300px', width: '100%' };
        if (this.props.image === null) {
            const { profileImage, firstName, lastName } = this.props.initialValues;
            const { userPost, id } = this.props;
            const storeComment = this.props.Comments.map((comment, i) => {
                if (comment.id === id) {
                    return <Comments key={uuid()} id={id}
                        comment={comment.comment} like={comment.like}
                        handleRemoveComment={this.handleRemoveComment} 
                        handleEditComment={this.handleEditComment}
                    />
                } return null
            });
            return (
                <React.Fragment>
                    <div className='userProfile'>
                        <div className='userCard'>
                            <LazyImage srcImage={profileImage}
                                altImage={firstName} style={emtyObject}
                                classImage='profileMyImg' imageRef={null}
                            />
                            <div className='outil-username'>
                                <div className='username-helper'>
                                    <span className='username'>
                                        <div onClick={this.handleUserRoute} className='usernameLink'>
                                            {firstName} {lastName}
                                        </div>
                                    </span>
                                <Setting
                                    id={this.props.id}
                                    showUserImage={this.state.showUserImage}
                                    toggleEditModal={this.toggleEditModal}
                                />
                                </div>
                                <span className='time'>{this.props.time}</span>
                            </div>
                        </div>
                        <div className='description'>
                            <span>{userPost}</span>
                        </div>
                        <div className='outil'>
                            <div className='like' onClick={this.handleLike}>
                                {(this.state.likes === 1) ? (
                                    <span className='sLike'>
                                        {
                                            this.state.likes
                                        }
                                        &nbsp;<i className="fas fa-thumbs-up"></i> Like
                                    </span>
                                ):(
                                    <span className='sDisLike'>
                                        {
                                            this.state.likes
                                        }
                                        &nbsp;<i className="far fa-thumbs-up"></i> Like
                                    </span>
                                )}
                            </div>
                            <label className='comment' htmlFor={`${this.props.comment_Name}`}>
                                <i className="far fa-comment"></i> Comment
                            </label>
                            <div className='share' onClick={this.toggleShareModal}>Share</div>
                        </div>
                        <div className='commentsAll'>
                            <form onSubmit={this.props.handleSubmit(this.onSubmit)} className='formComments'>
                                <LazyImage srcImage={profileImage}
                                    altImage={'profile-img'} style={emtyObject}
                                    classImage='' imageRef={null}
                                />
                                <Field name={this.props.comment_Name} component={this.renderInput} />
                            </form>
                            <div>
                            {
                                storeComment
                            }
                            </div>
                        </div>
                    </div>
                    {this.state.isShareModal ?
                        this.renderShareModal()
                    : null}
                    {this.state.isEditModal ?
                        this.renderEditModal()
                    :null}
                    {this.state.isUserImage ?
                        this.renderUserImageModal()
                    : null}
                </React.Fragment>
            );
        } else if (this.props.isRandom === "isUpload") {
            const { profileImage, firstName, lastName } = this.props.initialValues;
            const { userPost, id } = this.props;
            const storeComment = this.props.Comments.map(comment => {
                if (comment.id === id) {
                    return <Comments key={uuid()} id={id} 
                        comment={comment.comment} like={comment.like}
                        handleRemoveComment={this.handleRemoveComment} 
                        handleEditComment={this.handleEditComment}
                    />
                } return null;
            });
            return this.props.image.map(img => {
                const foundLikedImage = this.props.LikesData.find(data => data.id === img.id);
                return (
                    <div key={id} className='postCard-wrapper'>
                        <React.Fragment>
                            <div className='userProfile'>
                                <div className='userCard'>
                                    <LazyImage srcImage={profileImage}
                                        altImage={firstName} style={emtyObject}
                                        classImage='profileMyImg' imageRef={null}
                                    />
                                    <div className='outil-username'>
                                        <div className='username-helper'>
                                            <span className='username'>
                                                <div onClick={this.handleUserRoute} className='usernameLink'>
                                                    {firstName} {lastName}
                                                </div>
                                            </span>
                                            <Setting
                                                id={this.props.id}
                                                showUserImage={this.state.showUserImage}
                                                toggleEditModal={this.toggleEditModal}
                                            />
                                        </div>
                                        <span className='time'>{this.props.time}</span>
                                    </div>
                                </div>
                                <div className='description'>
                                    <span>{userPost}</span>
                                </div>
                                <LazyImage ClickImage={this.toggleUserImage}
                                    srcImage={img.dataURL}
                                    altImage={img.name}
                                    style={inlineStylingLazyImage}
                                    classImage='tagImages'
                                    imageRef={this.imageRef}
                                />
                                <div className='outil'>
                                    <div className='like' onClick={this.handleLike}>
                                        {foundLikedImage ? (
                                            <span className='sLike'>
                                                {
                                                    this.state.likes
                                                }
                                                &nbsp;<i className="fas fa-thumbs-up"></i> Like
                                            </span>
                                        ):(
                                            <span className='sDisLike'>
                                                {
                                                    this.state.likes
                                                }
                                                &nbsp;<i className="far fa-thumbs-up"></i> Like
                                            </span>
                                        )}
                                    </div>
                                    <label className='comment' htmlFor={`${this.props.comment_Name}`}>
                                        <i className="far fa-comment"></i> Comment
                                    </label>
                                    <div className='share' onClick={this.toggleShareModal}>Share</div>
                                </div>
                                <div className='commentsAll'>
                                    <form onSubmit={this.props.handleSubmit(this.onSubmit)} className='formComments'>
                                        <LazyImage ClickImage={null}
                                            srcImage={profileImage} 
                                            altImage={'profile-img'}
                                            style={emtyObject} classImage=''
                                            imageRef={this.imageRef}
                                        />
                                        <Field name={this.props.comment_Name} component={this.renderInput} />
                                    </form>
                                    <div>
                                    {
                                        storeComment
                                    }
                                    </div>
                                </div>
                            </div>
                            {/* Modals */}
                            {this.state.isShareModal ?
                                this.renderShareModal()
                            : null}
                            {this.state.isEditModal ?
                                this.renderEditModal()
                            :null}
                            {this.state.isUserImage ?
                                this.renderUserImageModal()
                            : null}
                        </React.Fragment>
                    </div>
                )
            });
        } else {
            const { profileImage, firstName, lastName } = this.props.initialValues;
            const { userPost, id } = this.props;
            const storeComment = this.props.Comments.map((comment, i) => {
                if (comment.id === id) {
                    return <Comments key={uuid()} id={id} 
                        comment={comment.comment} like={comment.like}
                        handleRemoveComment={this.handleRemoveComment} 
                        handleEditComment={this.handleEditComment}
                    />
                } return null
            });
            return this.props.image.map(img => {
                const foundLikedImage = this.props.LikesData.find(data => data.id === img.id);
                return (
                    <div key={id} className='postCard-wrapper'>
                        <React.Fragment>
                            <div className='userProfile'>
                                <div className='userCard'>
                                    <LazyImage srcImage={profileImage}
                                        altImage={firstName} style={emtyObject}
                                        classImage='profileMyImg' imageRef={null}
                                    />
                                    <div className='outil-username'>
                                        <div className='username-helper'>
                                            <span className='username'>
                                                <div onClick={this.handleUserRoute} className='usernameLink'>
                                                    {firstName} {lastName}
                                                </div>
                                            </span>
                                            <Setting
                                                id={this.props.id}
                                                showUserImage={this.state.showUserImage}
                                                toggleEditModal={this.toggleEditModal}
                                            />
                                        </div>
                                        <span className='time'>{this.props.time}</span>
                                    </div>
                                </div>
                                <div className='description'>
                                    <span>{userPost}</span>
                                </div>
                                <LazyImage ClickImage={this.toggleUserImage}
                                    srcImage={img.urls.regular}
                                    altImage={img.description}
                                    style={inlineStylingLazyImage}
                                    classImage='tagImages'
                                    imageRef={this.imageRef}
                                />
                                <div className='outil'>
                                    <div className='like' onClick={this.handleLike}>
                                        {foundLikedImage ? (
                                            <span className='sLike'>
                                                {
                                                    this.state.likes
                                                }
                                                &nbsp;<i className="fas fa-thumbs-up"></i> Like
                                            </span>
                                        ):(
                                            <span className='sDisLike'>
                                                {
                                                    this.state.likes
                                                }
                                                &nbsp;<i className="far fa-thumbs-up"></i> Like
                                            </span>
                                        )}
                                    </div>
                                    <label className='comment' htmlFor={`${this.props.comment_Name}`}>
                                        <i className="far fa-comment"></i> Comment
                                    </label>
                                    <div className='share' onClick={this.toggleShareModal}>Share</div>
                                </div>
                                <div className='commentsAll'>
                                    <form onSubmit={this.props.handleSubmit(this.onSubmit)} className='formComments'>
                                        <LazyImage ClickImage={null}
                                            srcImage={profileImage} 
                                            altImage={'profile-img'}
                                            style={emtyObject} classImage=''
                                            imageRef={this.imageRef}
                                        />
                                        <Field name={this.props.comment_Name} component={this.renderInput} />
                                    </form>
                                    <div>
                                    {
                                        storeComment
                                    }
                                    </div>
                                </div>
                            </div>
                            {/* Modals */}
                            {this.state.isShareModal ?
                                this.renderShareModal()
                            : null}
                            {this.state.isEditModal ?
                                this.renderEditModal()
                            :null}
                            {this.state.isUserImage ?
                                this.renderUserImageModal()
                            : null}
                        </React.Fragment>
                    </div>
                );
            });
        }
    };
};

const mapStateToProps = getState => {
    return {
        initialValues: getState.ProfileData,
        Comments: getState.Comments,
        LogIn: getState.isLogIn,
        LikesData: getState.LikesData,
        SharedData: getState.SharedData,
        Post: getState.newPost,
    };
};

export default connect(mapStateToProps, actions)(reduxForm ({
form: 'commentsPostForm'})(PostCard));
