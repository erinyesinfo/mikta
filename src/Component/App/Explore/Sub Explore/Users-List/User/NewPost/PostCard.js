import React, { Component } from 'react';
import uuid from 'uuid/v4';
import { Link } from 'react-router-dom';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import * as actions from '../../../../../../../Actions';
import Comments from '../Comments';
import '../index.css';

/* show user setting */
import Setting from './PostCard-setting';

/* Share Modal */
import ShareModal from '../Modal/Share Modal';
/* Share Modal Content */
import ShareModalContent from '../Modal/Share Modal/Content';

/* Edit Modal */
import EditModal from '../Modal/Edit Description';
/* Edit Modal Content */
import EditModalContent from '../Modal/Edit Description/Content';

/* User Image Modal */
import UserImage from '../Modal/User Image';
/* User Image Modal Content */
import UserImageModalContent from '../Modal/User Image/Content';

/* ThirdParty-Library */
import LazyImage from "../../../../../../ThirdParty-Library/Lazy Image/LazyImage";

class PostCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
          likesBool: false,
          likes: (this.props.isRandom || this.props.image === null) ? 0 : this.props.image.likes,
          showShareModal: false,
          showDescription: false,
          showEditModal: false,
          showUserImage: false,
        };
    };
    node = React.createRef();
    handleRef = node => this.node = node;
    componentDidMount() {
        if (this.props.isRandom) {
            return this.props.image.map(img => {
                const foundLikedImage = this.props.LikesData.find(data => data.id === img.id);
                if (foundLikedImage) return this.setState(st => ({ likes: st.likes + 1 }));
                return null;
            });
        } else {
            // NewPost data
            const foundLikedImage = this.props.PostData.find(
                data => data.id === this.props.id && data.likes === 1
            );
            if (foundLikedImage) return this.setState(st => ({ likes: st.likes + 1 }));
            return null;
        };
    };
    handleUserRoute = () => this.props.history.push(`/home`);
    handleLike = () => {
        if (!this.props.DBLoginStatus && !this.props.LocalStorageLoginStatus) return alert('Attention, you have to be log in in order to like images!');
        if (this.props.isRandom) {
            return this.props.image.map(img => {
                const foundLikedImage = this.props.LikesData.find(data => data.id === img.id);
                if (this.props.DBLoginStatus) {
                    if (foundLikedImage) {// remove like image -1
                        this.setState(st => ({ likes: st.likes - 1 }));
                        return this.props.handleUpdateLikesDataDB(img.id);
                    }
                    // like image +1
                    this.setState(st => ({ likes: st.likes + 1 }));
                    return this.props.handleUpdateLikesDataDB(img);
                } else {
                    if (foundLikedImage) {// remove like image -1
                        this.setState(st => ({ likes: st.likes - 1 }));
                        return this.props.handleUpdateLikesData(img.id);
                    }
                    // like image +1
                    this.setState(st => ({ likes: st.likes + 1 }));
                    return this.props.handleUpdateLikesData(img);
                }
            });
        } else {
            if (this.state.likes === 1) {
                this.setState(st => ({ likes: st.likes - 1 }) );
                return this.props.handleNewPost(this.props.id, 0);
            }
            this.setState(st => ({ likes: st.likes + 1 }) );
            return this.props.handleNewPost(this.props.id, 1);
        };
    };
    handleRemoveComment = comment => this.props.handleComment('remove', comment);
    handleEditComment = (comment, id) => this.props.handleComment(comment, id, 'edit');
    renderInput = formValues => {
        const { input, id } = formValues;
        return (
            <input className='commentInp' id={id || this.props.comment_Name} {...input}
            autoComplete="off" placeholder='What do you think?' />
        );
    };
    onSubmit = formValues => {//Submit comments
        const { id } = this.props;
        const { DBLoginStatus, LocalStorageLoginStatus, Comments, comment_Name } = this.props;
        const sameTask = Comments.find(data => data.comment === formValues[comment_Name]);
        if (sameTask) return null;
        if (!DBLoginStatus && !LocalStorageLoginStatus) return alert('Attention, you have to be log in in order to share your comments!');
        if (!formValues[comment_Name]) return null;
        this.props.handleComment(formValues[comment_Name], id);
        return formValues[comment_Name] = '';
    };

    /* Share Modal */
    handleShowShareModal = () => {
        let element = document.querySelector('body');
        element.style.overflow = 'hidden';
        this.setState({ showShareModal: true });
    };
    handleCloseShareModal = () => {
        let element = document.querySelector('body');
        this.state.showUserImage ? element.style.overflow = 'hidden':element.style.overflow = 'auto';
        return this.setState({
            showShareModal: false,
            showDescription: false,
        });
    };
    renderShareModalContent = () => {
        return (
            <ShareModalContent 
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
        );
    };
    renderShareModal = () => {
        return (
            <ShareModal handleCloseShareModal={this.handleCloseShareModal}
                showShareModal={this.state.showShareModal}
                renderShareModalContent={this.renderShareModalContent}
                showIsOk={this.state.showIsOk}
            />
        );
    };
    renderShareInput = ({ input }) => {
        return (
            <input className='share-commentInp' {...input} autoComplete="off"
            placeholder='What do you think?' autoFocus />
        );
    };
    onShareSubmit = formValues => {
        const { DBLoginStatus, LocalStorageLoginStatus } = this.props;
        if (this.props.isRandom) {
            return this.props.image.map(img => {
                const comment_Name = `share-${this.props.comment_Name}`;
                if (!DBLoginStatus && !LocalStorageLoginStatus) return alert('Hello there, you have to be log in in order to share your comments!')
                const duplicates = this.props.SharedData.find(data => data.id === img.id);
                if (duplicates) return alert('You already shared this data in your profile');
                let element = document.querySelector('body');
                element.style.overflow = 'auto';
                if (DBLoginStatus) {
                    this.props.handleUpdateShareDataDB(formValues[comment_Name], img);
                    return this.props.history.push('/home');
                }
                this.props.handleUpdateShareData(formValues[comment_Name], img);
                return this.props.history.push('/home');
            });
        } else {
            const comment_Name = `share-${this.props.comment_Name}`;
            if (!DBLoginStatus && !LocalStorageLoginStatus) {
                return alert('Hello there, you have to be log in in order to share your comments!');
            }
            const { userPost, id } = this.props;
            let element = document.querySelector('body');
            element.style.overflow = 'auto';       
            if (DBLoginStatus) {
                this.props.handleUpdateShareDataDB(
                    formValues[comment_Name] || null, // add description or null
                    null, // img is null
                    id,
                    userPost, // my own descrition
                    this.state.likes,
                );
                
                return this.props.history.push('/home');
            }     
            this.props.handleUpdateShareData(
                formValues[comment_Name] || null, // add description or null
                null, // img is null
                id,
                userPost, // my own descrition
                this.state.likes,
            );
            return this.props.history.push('/home');
        }
    };
    handleShowDescription = () => this.setState({ showDescription: true });

    /* Edit description Modal */
    handleShowEditModal = () => {
        let element = document.querySelector('body');
        element.style.overflow = 'hidden';
        this.setState({ showEditModal: true });
    };
    handleCloseEditModal = () => {
        let element = document.querySelector('body');
        this.state.showUserImage ? element.style.overflow = 'hidden':element.style.overflowY = 'auto'
        this.setState({ showEditModal: false });
    };
    renderEditModalContent = () => {
        return (
            <EditModalContent id={this.props.id}
                handleCloseEditModal={this.handleCloseEditModal}
            />
        );
    };
    renderEditModal = () => {
        return (
            <EditModal handleCloseEditModal={this.handleCloseEditModal}
                showEditModal={this.state.showEditModal}
                renderEditModalContent={this.renderEditModalContent}
            />
        );
    };
    /* User Image Modal */
    handleShowUserImage = () => {
        let element = document.querySelector('body');
        element.style.overflow = 'hidden';
        this.setState({ showUserImage: true });
    };
    handleCloseUserImage = () => {
        let element = document.querySelector('body');
        element.style.overflow = 'auto';
        return this.setState({ showUserImage: false });
    };
    renderUserImageModalContent = () => {
        return (
            <UserImageModalContent likes={this.state.likes}
                handleLike={this.handleLike}
                isRandom={this.props.isRandom}
                image={this.props.image}
                id={this.props.id}
                userPost={this.props.userPost}
                handleRemoveComment={this.handleRemoveComment}
                handleEditComment={this.handleEditComment}
                handleUserRoute={this.handleUserRoute}
                handleShowShareModal={this.handleShowShareModal}
                handleEdit={this.handleEdit}
                handleRemove={this.handleRemove}
                comment_Name={this.props.comment_Name}
                renderInput={this.renderInput}
                onSubmit={this.onSubmit}
                /* show edit modal */
                handleShowEditModal={this.handleShowEditModal}
            />
        );
    };
    renderUserImageModal = () => {
        return (
          <UserImage handleCloseUserImage={this.handleCloseUserImage}
            showUserImage={this.state.showUserImage}
            renderUserImageModalContent={this.renderUserImageModalContent}
            showShareModal={this.state.showShareModal}
            showEditModal={this.state.showEditModal} />
        );
    };
    render() {
        let emtyObject = {};
        let inlineStylingLazyImage = { minHeight: '300px', width: '100%' };
        const { firstname, lastname, profileImage } = this.props.UserData;
        if (this.props.image === null) {
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
                            <LazyImage srcImage={profileImage} draggable={false}
                                altImage={'profileImage'} style={emtyObject}
                                classImage='profileMyImg' imageRef={null}
                            />
                            <div className='outil-username'>
                                <div className='username-helper'>
                                    <span className='username'>
                                        <Link to="/home" className="usernameLink">
                                            {firstname} {lastname}
                                        </Link>
                                    </span>
                                <Setting
                                    id={this.props.id}
                                    showUserImage={this.state.showUserImage}
                                    handleShowEditModal={this.handleShowEditModal}
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
                            <div className='share' onClick={this.handleShowShareModal}>Share</div>
                        </div>
                        <div className='commentsAll'>
                            <form onSubmit={this.props.handleSubmit(this.onSubmit)} className='formComments'>
                                <LazyImage srcImage={profileImage} draggable={false}
                                    altImage={'profileImage'} style={emtyObject}
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
                    {this.state.showShareModal ?
                        this.renderShareModal()
                    : null}
                    {this.state.showEditModal ?
                        this.renderEditModal()
                    :null}
                    {this.state.showUserImage ?
                        this.renderUserImageModal()
                    : null}
                </React.Fragment>
            );
        } else if (this.props.isRandom === "isUpload") {
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
                                    <LazyImage srcImage={profileImage} draggable={false}
                                        altImage={'profileImage'} style={emtyObject}
                                        classImage='profileMyImg' imageRef={null}
                                    />
                                    <div className='outil-username'>
                                        <div className='username-helper'>
                                            <span className='username'>
                                                <Link to="/home" className="usernameLink">
                                                    {firstname} {lastname}
                                                </Link>
                                            </span>
                                            <Setting
                                                id={this.props.id}
                                                showUserImage={this.state.showUserImage}
                                                handleShowEditModal={this.handleShowEditModal}
                                            />
                                        </div>
                                        <span className='time'>{this.props.time}</span>
                                    </div>
                                </div>
                                <div className='description'>
                                    <span>{userPost}</span>
                                </div>
                                <LazyImage ClickImage={this.handleShowUserImage}
                                    srcImage={img.dataURL}
                                    altImage={img.name}
                                    style={inlineStylingLazyImage}
                                    classImage='tagImages'
                                    imageRef={this.handleRef}
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
                                    <div className='share' onClick={this.handleShowShareModal}>Share</div>
                                </div>
                                <div className='commentsAll'>
                                    <form onSubmit={this.props.handleSubmit(this.onSubmit)} className='formComments'>
                                        <LazyImage ClickImage={null}
                                            srcImage={profileImage} draggable={false}
                                            altImage={'profileImage'}
                                            style={emtyObject} classImage=''
                                            imageRef={this.handleRef}
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
                            {this.state.showShareModal ?
                                this.renderShareModal()
                            : null}
                            {this.state.showEditModal ?
                                this.renderEditModal()
                            :null}
                            {this.state.showUserImage ?
                                this.renderUserImageModal()
                            : null}
                        </React.Fragment>
                    </div>
                )
            });
        } else {
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
                                    <LazyImage srcImage={profileImage} draggable={false}
                                        altImage={'profileImage'} style={emtyObject}
                                        classImage='profileMyImg' imageRef={null}
                                    />
                                    <div className='outil-username'>
                                        <div className='username-helper'>
                                            <span className='username'>
                                                <Link to="/home" className="usernameLink">
                                                    {firstname} {lastname}
                                                </Link>
                                            </span>
                                            <Setting
                                                id={this.props.id}
                                                showUserImage={this.state.showUserImage}
                                                handleShowEditModal={this.handleShowEditModal}
                                            />
                                        </div>
                                        <span className='time'>{this.props.time}</span>
                                    </div>
                                </div>
                                <div className='description'>
                                    <span>{userPost}</span>
                                </div>
                                <LazyImage ClickImage={this.handleShowUserImage}
                                    srcImage={img.urls.regular}
                                    altImage={img.description}
                                    style={inlineStylingLazyImage}
                                    classImage='tagImages'
                                    imageRef={this.handleRef}
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
                                    <div className='share' onClick={this.handleShowShareModal}>Share</div>
                                </div>
                                <div className='commentsAll'>
                                    <form onSubmit={this.props.handleSubmit(this.onSubmit)} className='formComments'>
                                        <LazyImage ClickImage={null}
                                            srcImage={profileImage} draggable={false}
                                            altImage={'profileImage'}
                                            style={emtyObject} classImage=''
                                            imageRef={this.handleRef}
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
                            {this.state.showShareModal ?
                                this.renderShareModal()
                            : null}
                            {this.state.showEditModal ?
                                this.renderEditModal()
                            :null}
                            {this.state.showUserImage ?
                                this.renderUserImageModal()
                            : null}
                        </React.Fragment>
                    </div>
                );
            });
        };
    };
};

const mapStateToProps = getState => {
    if (getState.DBLoginStatus) {//login with db
        return {
            DBLoginStatus: getState.DBLoginStatus,//db login
            LocalStorageLoginStatus: getState.LocalStorageLoginStatus,//localstorage login
            UserData: getState.DBUserData,
            SharedData: getState.DBUserSharedData,
            LikesData: getState.DBUserLikesData,
            PostData: getState.NewPost,
            Comments: getState.Comments
        };
    } return {
        DBLoginStatus: getState.DBLoginStatus,
        LocalStorageLoginStatus: getState.LocalStorageLoginStatus,
        UserData: getState.UserData,
        SharedData: getState.SharedData,
        LikesData: getState.LikesData,
        PostData: getState.NewPost,
        Comments: getState.Comments
    };
};

export default connect(mapStateToProps, actions)(reduxForm ({
form: 'commentsPostForm'})(PostCard));
