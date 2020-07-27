import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import * as actions from '../../../../../../Actions';
import Comments from './Comments/NewComment';
import uuid from 'uuid/v4';
import './UserCard.css';

/* show user setting */
import Setting from './UserCard-setting/Setting';

/* Share Modal */
import ShareModal from './Modal/Share Modal/ShareModal';
/* Share Modal Content */
import ShareModalContent from './Modal/Share Modal/ModalContent/ShareModalContent';

/* Block-Report Modal */
import BlockReportModal from './Modal/Block-Report/Block-ReportModal';
/* Block-Report Modal Content */
import BlockReportModalContent from './Modal/Block-Report/ModalContent/Block-ReportModalContent';

/* User Image Modal */
import UserImage from './Modal/User Image/UserImage';
/* User Image Modal Content */
import UserImageModalContent from './Modal/User Image/ModalContent/UserImageModalContent';

/* ThirdParty-Library */
import LazyImage from "../../../../../ThirdParty-Library/Lazy Image/LazyImage";

class renderPhotos extends Component {
    constructor(props) {
        super(props);
        this.state = {
          likesBool: false,
          likes: this.props.image.likes,
          /* ShareModal */
          isShareModal: false,
          showShareModal: false,
          showDescription: false,
          /* BlockReport */
          showBlockReport: false,
          isBlockReport: false,
          showBlockUser: false,
          showReportProfilePicture: false,
          showReportUser: false,
          /* UserImage */
          showUserImage: false,
          isUserImage: false,
        };
    };
    componentDidMount() {
        if (this.props.image) {
            const foundLikedImage = this.props.LikesData.find(data => data.id === this.props.image.id);
            if (foundLikedImage) return this.setState(st => ({ likes: st.likes + 1 }) );
        }
    };
    handleUserRoute = () => {
        this.props.fetchUser(this.props.image.user);
        const replaceNames = this.props.image.user.name.replace(/[ ]/g, '_');
        this.props.history.push(`/@${replaceNames}`);
    };
    handleLike = () => {
        if (!this.props.LogIn) return alert('Attention, you have to be log in in order to like photos!');
        const foundLikedImage = this.props.LikesData.find(data => data.id === this.props.image.id);
        if (foundLikedImage) {
            this.setState(st => ({ likes: st.likes - 1 }) );
            return this.props.removeLikesData(this.props.image.id);
        }
        this.setState(st => ({ likes: st.likes + 1 }) );
        return this.props.likesData(this.props.image);
    };
    handleRemoveComment = (comment) => this.props.removeComment(comment);
    handleEditComment = (comment, id) => this.props.editComment(comment, id);
    renderInput = (formValues) => {
        const { input, id } = formValues;
        return (
            <input className='commentInp' id={id || this.props.comment_Name} {...input}
            autoComplete="off" placeholder='What do you think?' />
        );
    };
    onSubmit = (formValues) => {
        const { LogIn, Comments, comment_Name, image } = this.props;
        const sameTask = Comments.find(data => data.comment === formValues[comment_Name]);
        if (sameTask) return null;
        if (!LogIn) return alert('Attention, you have to be log in in order to share your comments!')
        if (!formValues[comment_Name]) return null
        this.props.comments(formValues[comment_Name], image.id)
        formValues[comment_Name] = ''
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
                    renderShareInput={this.renderShareInput}
                    onShareSubmit={this.onShareSubmit}
                    likes={this.state.likes}
                    comment_Name={this.props.comment_Name}
                    handleCloseShareModal={this.handleCloseShareModal}
                />
    };
    renderShareModal = () => {
        return (
          <ShareModal handleShowShareModal={this.handleShowShareModal} 
          handleCloseShareModal={this.handleCloseShareModal} showShareModal={this.state.showShareModal}
          isShareModal={this.state.isShareModal} renderShareContent={this.renderShareContent} />
        );
    };
    renderShareInput = ({ input }) => {
        return (
            <input className='share-commentInp' {...input} autoComplete="off"
            placeholder='What do you think?' />
        );
    };
    onShareSubmit = formValues => {
        const comment_Name = `share-${this.props.comment_Name}`
        if (!this.props.LogIn) return alert('hi there, you have to be log in in order to share your comments!')
        const duplicates = this.props.SharedData.find(data => data.id === this.props.image.id);
        if (duplicates) return alert('You already shared this data in your profile')
        
        this.props.shareData(formValues[comment_Name], this.props.image)
        var element = document.querySelector("body");
        element.style.overflow = 'auto';
        this.props.history.push('/home');
    };
    handleShowDescription = () => this.setState({ showDescription: true });

    /* Block-Report Modal */
    toggleBlockReport = () => {
        var element = document.querySelector("body");
        element.style.overflow = 'hidden';
        this.setState({ isBlockReport: true });
    };
    handleShowBlockReport = () => this.setState({ showBlockReport: true });
    handleCloseBlockReport = () => {
        var element = document.querySelector("body");
        element.style.overflow = 'auto';
        return this.setState({
            showBlockReport: false,
            isBlockReport: false,
            showBlockUser: false,
            showReportProfilePicture: false,
            showReportUser: false,
        });
    };
    renderBlockReportModalContent = () => {
        return <BlockReportModalContent isBlockReport={this.state.isBlockReport}
                    showBlockUser={this.state.showBlockUser}
                    showReportProfilePicture={this.state.showReportProfilePicture}
                    showReportUser={this.state.showReportUser}
                    handleCloseBlockReport={this.handleCloseBlockReport}
                />
    };
    renderBlockReportModal = () => {
        return (
          <BlockReportModal handleShowBlockReport={this.handleShowBlockReport} 
            handleCloseBlockReport={this.handleCloseBlockReport}
            showBlockReport={this.state.showBlockReport}
            isBlockReport={this.state.isBlockReport}
            renderBlockReportModalContent={this.renderBlockReportModalContent} />
        );
    };
    handleBlockUser = () => this.setState({ showBlockUser: true }, this.toggleBlockReport);
    handleReportProfilePicture  = () => this.setState({ showReportProfilePicture: true }, this.toggleBlockReport);
    handleReportUser  = () => this.setState({ showReportUser: true }, this.toggleBlockReport);

    /* User Image Modal */
    toggleUserImage = () => {
        var element = document.querySelector("body");
        element.style.overflow = 'hidden';
        this.setState({ isUserImage: true });
    };
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
                    handleRemoveComment={this.handleRemoveComment}
                    handleEditComment={this.handleEditComment}
                    handleUserRoute={this.handleUserRoute}
                    toggleShareModal={this.toggleShareModal}
                    comment_Name={this.props.comment_Name}
                    renderInput={this.renderInput}
                    onSubmit={this.onSubmit}
                    /* Block-Report Modal */
                    handleBlockUser={this.handleBlockUser}
                    handleReportProfilePicture={this.handleReportProfilePicture}
                    handleReportUser={this.handleReportUser}
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
            showEditModal={this.state.showEditModal}
            showBlockReport={this.state.showBlockReport} />
        );
    };
    // covert this date: (2019-11-29) to this data: (november 29, 2019)
    helper = (string) => {
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
    render() {
        let emtyObject = {};
        let inlineStylingLazyImage = { minHeight: '300px', width: '100%' };
        const { profileImage } = this.props.initialValues;
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
        if (!description && !urls) return null
        return (
            <React.Fragment>
                <div className='userProfile'>
                    <div className='userCard'>
                        <LazyImage ClickImage={null}
                            srcImage={user.profile_image.large} 
                            altImage={user.first_name} style={emtyObject}
                            classImage='profileImg'
                            imageRef={null} />
                        {/* <img className='profileImg' src={user.profile_image.large} 
                        alt={user.first_name} /> */}
                        <div className='outil-username'>
                            <div className='username-helper'>
                                <span className='username'>
                                    <div onClick={this.handleUserRoute} className='usernameLink'>
                                        {user.name}
                                    </div>
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
                    <LazyImage ClickImage={this.toggleUserImage} srcImage={urls.regular} 
                        altImage={description}
                        style={inlineStylingLazyImage} 
                        classImage='tagImages'
                        imageRef={null} />
                    {/* <img onClick={this.toggleUserImage} className='tagImages' 
                    ref={this.imageRef} alt={description} src={urls.regular} /> */}
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
                            <LazyImage ClickImage={null} srcImage={profileImage} 
                            altImage={'profile-img'} style={emtyObject} 
                            classImage=''
                            imageRef={null} />
                            {/* <img src={profileImage} alt='profile-img' /> */}
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
                {this.state.isBlockReport ?
                    this.renderBlockReportModal()
                : null}
                {this.state.isUserImage ?
                    this.renderUserImageModal()
                : null}
            </React.Fragment>
        );
    };
};

const mapStateToProps = getState => {
    return {
        initialValues: getState.ProfileData,
        Comments: getState.Comments,
        LogIn: getState.isLogIn,
        LikesData: getState.LikesData,
        SharedData: getState.SharedData,
    };
};

export default connect(mapStateToProps, actions)(reduxForm ({
form: 'commentsForm'})(renderPhotos));
