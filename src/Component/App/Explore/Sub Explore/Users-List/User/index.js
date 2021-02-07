import React, { Component } from 'react';
import { v4 as uuid } from 'uuid';
import { Link } from 'react-router-dom';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import * as actions from '../../../../../../Actions';
import Comments from './Comments';
import './index.css';

/* show user setting */
import Setting from './UserCard-setting';

/* Share Modal */
import ShareModal from './Modal/Share Modal';
/* Share Modal Content */
import ShareModalContent from './Modal/Share Modal/Content';

/* Block-Report Modal */
import BlockReportModal from './Modal/Block-Report';
/* Block-Report Modal Content */
import BlockReportModalContent from './Modal/Block-Report/Content';

/* User Image Modal */
import UserImage from './Modal/User Image';
/* User Image Modal Content */
import UserImageModalContent from './Modal/User Image/Content';

/* ThirdParty-Library */
import LazyImage from '../../../../../ThirdParty-Library/Lazy Image/LazyImage';

class renderPhotos extends Component {
    constructor(props) {
        super(props);
        this.state = {
          likesBool: false,
          likes: this.props.image.likes,
          /* ShareModal */
          showShareModal: false,
          showDescription: false,
          /* BlockReport */
          showBlockReport: false,
          showBlockUser: false,
          showReportProfilePicture: false,
          showReportUser: false,
          /* UserImage */
          showUserImage: false
        };
    };
    componentDidMount() {
        if (this.props.image) {
            const foundLikedImage = this.props.LikesData.find(data => data.id === this.props.image.id);
            if (foundLikedImage) return this.setState(st => ({ likes: st.likes + 1 }) );
        }
    };
    handleLike = () => {
        const foundLikedImage = this.props.LikesData.find(data => data.id === this.props.image.id);
        if (!this.props.DBLoginStatus && !this.props.LocalStorageLoginStatus) return alert('Attention, you have to be log in in order to like images!');
        if (this.props.DBLoginStatus) {
            if (foundLikedImage) {// remove like image -1
                this.setState(st => ({ likes: st.likes - 1 }));
                return this.props.handleUpdateLikesDataDB(this.props.image.id);
            }
            // like image +1
            this.setState(st => ({ likes: st.likes + 1 }));
            return this.props.handleUpdateLikesDataDB(this.props.image);
        } else {
            if (foundLikedImage) {// remove like image -1
                this.setState(st => ({ likes: st.likes - 1 }));
                return this.props.handleUpdateLikesData(this.props.image.id);
            }
            // like image +1
            this.setState(st => ({ likes: st.likes + 1 }));
            return this.props.handleUpdateLikesData(this.props.image);
        }
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
        const { DBLoginStatus, LocalStorageLoginStatus, Comments, comment_Name, image } = this.props;
        const sameTask = Comments.find(data => data.comment === formValues[comment_Name]);
        if (sameTask) return null;
        if (!DBLoginStatus && !LocalStorageLoginStatus) return alert('Attention, you have to be log in in order to share your comments!');
        if (!formValues[comment_Name]) return null;
        this.props.handleComment(formValues[comment_Name], image.id)
        formValues[comment_Name] = '';
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
            <ShareModalContent image={this.props.image}
                renderShareInput={this.renderShareInput}
                onShareSubmit={this.onShareSubmit}
                likes={this.state.likes}
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
        const comment_Name = `share-${this.props.comment_Name}`;
        if (!this.props.DBLoginStatus && !this.props.LocalStorageLoginStatus) {
            return alert('Hello there, you have to be log in in order to share your comments!');
        }
        const duplicates = this.props.SharedData.find(data => data.id === this.props.image.id);
        if (duplicates) return alert('You already shared this data in your profile');
        let element = document.querySelector('body');
        element.style.overflow = 'auto';
        this.props.history.push('/home');
        if (this.props.DBLoginStatus) {
            return this.props.handleUpdateShareDataDB(formValues[comment_Name], this.props.image);
        }
        this.props.handleUpdateShareData(formValues[comment_Name], this.props.image);
    };
    handleShowDescription = () => this.setState({ showDescription: true });

    /* Block-Report Modal */
    handleShowBlockReport = () => {
        let element = document.querySelector('body');
        element.style.overflow = 'hidden';
        this.setState({ showBlockReport: true });
    };
    handleCloseBlockReport = () => {
        let element = document.querySelector('body');
        element.style.overflow = 'auto';
        return this.setState({
            showBlockReport: false,
            showBlockUser: false,
            showReportProfilePicture: false,
            showReportUser: false,
        });
    };
    renderBlockReportModalContent = () => {
        return (
            <BlockReportModalContent showBlockUser={this.state.showBlockUser}
                showReportProfilePicture={this.state.showReportProfilePicture}
                showReportUser={this.state.showReportUser}
                handleCloseBlockReport={this.handleCloseBlockReport}
            />
        );
    };
    renderBlockReportModal = () => {
        return (
          <BlockReportModal handleCloseBlockReport={this.handleCloseBlockReport}
            showBlockReport={this.state.showBlockReport}
            renderBlockReportModalContent={this.renderBlockReportModalContent} />
        );
    };
    handleBlockUser = () => this.setState({ showBlockUser: true }, this.handleShowBlockReport);
    handleReportProfilePicture  = () => this.setState({ showReportProfilePicture: true }, this.handleShowBlockReport);
    handleReportUser  = () => this.setState({ showReportUser: true }, this.handleShowBlockReport);

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
                handleRemoveComment={this.handleRemoveComment}
                handleEditComment={this.handleEditComment}
                handleShowShareModal={this.handleShowShareModal}
                comment_Name={this.props.comment_Name}
                renderInput={this.renderInput}
                onSubmit={this.onSubmit}
                /* Block-Report Modal */
                handleBlockUser={this.handleBlockUser}
                handleReportProfilePicture={this.handleReportProfilePicture}
                handleReportUser={this.handleReportUser}
            />
        );
    };
    renderUserImageModal = () => {
        return (
          <UserImage handleCloseUserImage={this.handleCloseUserImage}
            showUserImage={this.state.showUserImage}
            renderUserImageModalContent={this.renderUserImageModalContent}
            showShareModal={this.state.showShareModal}
            showEditModal={this.state.showEditModal}
            showBlockReport={this.state.showBlockReport} />
        );
    };
    // covert this date: (2019-11-29) to this data: (november 29, 2019)
    helper = string => {
        let months = [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December', 
        ];

        let str = string.substr(0, 10).replace("-", ' ').replace("-", ' ');
        let year = str.substr(0, 4);
        let month = str.substr(5, 2);
        let day = str.substr(8, 2);

        let MonthArr = months[month - 1];
        const CreatedOn = `${MonthArr} ${day}, ${year}`;
        return CreatedOn;
    };
    handleFetchUnsplashUser = () => this.props.handleUpdateUnsplashUser(this.props.image.user);
    render() {
        let emtyObject = {};
        let inlineStylingLazyImage = { minHeight: '300px', width: '100%' };
        const { profileImage } = this.props.UserData;
        const { description, urls, user, id, created_at } = this.props.image;
        const storeComment = this.props.Comments.map((comment, i) => {
            if (comment.id === id) {
                return <Comments key={uuid()} id={id}
                    comment={comment.comment} like={comment.like}
                    handleRemoveComment={this.handleRemoveComment}
                    handleEditComment={this.handleEditComment}
                />
            } return null
        });
        const foundLikedImage = this.props.LikesData.find(data => data.id === this.props.image.id);
        if (!description && !urls) return null;
        return (
            <React.Fragment>
                <div className='userProfile'>
                    <div className='userCard'>
                        <LazyImage ClickImage={null}
                            srcImage={user.profile_image.large} 
                            altImage={user.first_name} style={emtyObject}
                            classImage='profileImg'
                            imageRef={null} />
                        <div className='outil-username'>
                            <div className='username-helper'>
                                <span className='username'>
                                    <Link to={`/@${user.username}`} className="usernameLink" onClick={this.handleFetchUnsplashUser}>
                                        {user.name}
                                    </Link>
                                </span>
                                <Setting
                                    id={id}
                                    showUserImage={this.state.showUserImage}
                                    handleBlockUser={this.handleBlockUser}
                                    handleReportProfilePicture={this.handleReportProfilePicture}
                                    handleReportUser={this.handleReportUser}
                                />
                            </div>
                            <span className='time'>{this.helper(created_at)}</span>
                        </div>
                    </div>
                    <div className='description'>
                        <span>{description}</span>
                    </div>
                    <LazyImage ClickImage={this.handleShowUserImage} srcImage={urls.regular} 
                        altImage={description}
                        style={inlineStylingLazyImage} 
                        classImage='tagImages'
                        imageRef={null} />
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
                            <LazyImage ClickImage={null} classImage='' srcImage={profileImage} draggable={false}
                                altImage='profile-img' style={emtyObject} imageRef={null}
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
                {this.state.showBlockReport ?
                    this.renderBlockReportModal()
                : null}
                {this.state.showUserImage ?
                    this.renderUserImageModal()
                : null}
            </React.Fragment>
        );
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
            Comments: getState.Comments
        };
    } return {
        DBLoginStatus: getState.DBLoginStatus,
        LocalStorageLoginStatus: getState.LocalStorageLoginStatus,
        UserData: getState.UserData,
        SharedData: getState.SharedData,
        LikesData: getState.LikesData,
        Comments: getState.Comments
    };
};

export default connect(mapStateToProps, actions)(reduxForm ({
form: 'commentsForm'})(renderPhotos));
