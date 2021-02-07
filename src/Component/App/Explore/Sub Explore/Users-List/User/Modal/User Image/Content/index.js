import React, { Component } from 'react';
import { v4 as uuid } from 'uuid';
import { Link } from 'react-router-dom';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import * as actions from '../../../../../../../../../Actions';
import Comments from '../../../Comments';
import './index.css';

/* ThirdParty-Library */
import LazyImage from '../../../../../../../../ThirdParty-Library/Lazy Image/LazyImage';

import UserCardSetting from '../../../UserCard-setting';
import PostCardSetting from '../../../NewPost/PostCard-setting';

class UserImageModalContent extends Component {
    imageRef = React.createRef();
    handleUpdateUnsplashUser = () => {
        let element = document.querySelector('body');
        element.style.overflow = 'auto';
        this.props.handleUpdateUnsplashUser(this.props.image.user);
    };
    render() {
        let emtyObject = {};
        const { firstname, lastname, profileImage } = this.props.UserData;
        if (this.props.isRandom === true || this.props.isRandom === 'selected photo') {
            return this.props.image.map(img => {
                const { userPost, id } = this.props;
                const { description, urls } = img;
                const storeComment = this.props.Comments.map((comment, i) => {
                    if (comment.id === id) {
                        return <Comments key={uuid()} id={id} 
                                    comment={comment.comment}
                                    like={comment.like}
                                    handleRemoveComment={this.props.handleRemoveComment}
                                    handleEditComment={this.props.handleEditComment}
                                    isUserImage={true} 
                                />
                    } return null
                });
                const foundLikedImage = this.props.LikesData.find(data => data.id === img.id);
                return (
                    <div key={id} className='image-container'>
                        <div className='image-userProfile'>
                            <div className='image-wrapperdivimage'>
                                <div className='image-divtagImages'>
                                    <LazyImage srcImage={urls.regular}
                                        altImage={description} style={emtyObject} classImage='image-tagImages'
                                        imageRef={null}
                                    />
                                </div>
                            </div>
                            <div className='image-infowrapper'>
                                <div className='image-userinfo'>
                                    <div className='image-user'>
                                        <LazyImage srcImage={profileImage}
                                            altImage={'profileImage'} style={emtyObject} classImage='image-profileMyImg'
                                            imageRef={null}
                                        />
                                        <span className='username'>
                                            <Link to='/home' className="usernameLink">
                                                {firstname} {lastname}
                                            </Link>
                                        </span>
                                        <PostCardSetting
                                            id={id}
                                            showUserImage={true}
                                            handleShowEditModal={this.props.handleShowEditModal}
                                        />
                                    </div>
                                    <div className='image-description'>
                                        <span>{userPost}</span>
                                    </div>
                                </div>
                                <div className='image-outilWrapper'>
                                    <div className='image-outil'>
                                        <div className='image-like' onClick={this.props.handleLike}>
                                            {foundLikedImage ? (
                                                <span className='image-sLike'>
                                                    {
                                                        this.props.likes
                                                    }
                                                    &nbsp;<i className="fas fa-thumbs-up"></i> Like
                                                </span>
                                            ):(
                                                <span className='image-sDisLike'>
                                                    {
                                                        this.props.likes
                                                    }
                                                    &nbsp;<i className="far fa-thumbs-up"></i> Like
                                                </span>
                                            )}
                                        </div>
                                        <label className='image-comment' 
                                        htmlFor={`userImage-${this.props.comment_Name}`}>
                                            <i className="far fa-comment"></i> Comment
                                        </label>
                                        <div className='image-share'
                                            onClick={this.props.handleShowShareModal}>
                                                Share
                                        </div>
                                    </div>
                                    <div className='image-commentsAll'>
                                        <form onSubmit={this.props.handleSubmit(this.props.onSubmit)} className='image-formComments'>
                                            <LazyImage srcImage={profileImage}
                                                altImage='profile-img'
                                                style={emtyObject}
                                                classImage=''
                                                imageRef={null}
                                            />
                                            <Field name={this.props.comment_Name} 
                                                id={`userImage-${this.props.comment_Name}`}
                                                component={this.props.renderInput}
                                            />
                                        </form>
                                        <div className='image-modalcomment'>
                                            {
                                                storeComment
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            });
        } else if (this.props.isRandom === "isUpload") {
            return this.props.image.map(img => {
                const { userPost, id } = this.props;
                const { name, dataURL } = img;
                const storeComment = this.props.Comments.map(comment => {
                    if (comment.id === id) {
                        return <Comments key={uuid()} id={id} 
                                    comment={comment.comment}
                                    like={comment.like}
                                    handleRemoveComment={this.props.handleRemoveComment}
                                    handleEditComment={this.props.handleEditComment}
                                    isUserImage={true} 
                                />
                    } return null
                });
                const foundLikedImage = this.props.LikesData.find(data => data.id === img.id);
                return (
                    <div key={id} className='image-container'>
                        <div className='image-userProfile'>
                            <div className='image-wrapperdivimage'>
                                <div className='image-divtagImages'>
                                    <LazyImage srcImage={dataURL}
                                        altImage={name} style={emtyObject} classImage='image-tagImages'
                                        imageRef={null}
                                    />
                                </div>
                            </div>
                            <div className='image-infowrapper'>
                                <div className='image-userinfo'>
                                    <div className='image-user'>
                                        <LazyImage srcImage={profileImage}
                                            altImage={'profileImage'} style={emtyObject} classImage='image-profileMyImg'
                                            imageRef={null}
                                        />
                                        <span className='username'>
                                            <Link to='/home' className="usernameLink">
                                                {firstname} {lastname}
                                            </Link>
                                        </span>
                                        <PostCardSetting
                                            id={id}
                                            showUserImage={true}
                                            handleShowEditModal={this.props.handleShowEditModal}
                                        />
                                    </div>
                                    <div className='image-description'>
                                        <span>{userPost}</span>
                                    </div>
                                </div>
                                <div className='image-outilWrapper'>
                                    <div className='image-outil'>
                                        <div className='image-like' onClick={this.props.handleLike}>
                                            {foundLikedImage ? (
                                                <span className='image-sLike'>
                                                    {
                                                        this.props.likes
                                                    }
                                                    &nbsp;<i className="fas fa-thumbs-up"></i> Like
                                                </span>
                                            ):(
                                                <span className='image-sDisLike'>
                                                    {
                                                        this.props.likes
                                                    }
                                                    &nbsp;<i className="far fa-thumbs-up"></i> Like
                                                </span>
                                            )}
                                        </div>
                                        <label className='image-comment' 
                                        htmlFor={`userImage-${this.props.comment_Name}`}>
                                            <i className="far fa-comment"></i> Comment
                                        </label>
                                        <div className='image-share'
                                            onClick={this.props.handleShowShareModal}>
                                                Share
                                        </div>
                                    </div>
                                    <div className='image-commentsAll'>
                                        <form onSubmit={this.props.handleSubmit(this.props.onSubmit)} className='image-formComments'>
                                            <LazyImage srcImage={profileImage}
                                                altImage='profile-img'
                                                style={emtyObject}
                                                classImage=''
                                                imageRef={null}
                                            />
                                            <Field name={this.props.comment_Name} 
                                                id={`userImage-${this.props.comment_Name}`}
                                                component={this.props.renderInput}
                                            />
                                        </form>
                                        <div className='image-modalcomment'>
                                            {
                                                storeComment
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            });
        } else if (this.props.image === null) return null;
        else {
            const { description, urls, user, id } = this.props.image;
            const storeComment = this.props.Comments.map((comment, i) => {
                if (comment.id === id) {
                    return (
                            <Comments key={uuid()} id={id}
                                comment={comment.comment}
                                like={comment.like}
                                handleRemoveComment={this.props.handleRemoveComment}
                                handleEditComment={this.props.handleEditComment}
                                isUserImage={true} />
                        )
                } return null
            });
            const foundLikedImage = this.props.LikesData.find(data => data.id === this.props.image.id);
            return (
                <div className='image-userProfile'>
                    <div className='image-wrapperdivimage'>
                        <div className='image-divtagImages'>
                            <LazyImage ClickImage={null} srcImage={urls.regular} 
                                altImage={description} style={emtyObject} 
                                classImage='image-tagImages'
                                imageRef={this.imageRef}
                            />
                        </div>
                    </div>
                    <div className='image-infowrapper'>
                        <div className='image-userinfo'>
                            <div className='image-user'>
                                <LazyImage ClickImage={null}
                                    srcImage={user.profile_image.large} 
                                    altImage={user.first_name} style={emtyObject} 
                                    classImage='image-profileImg'
                                    imageRef={null}
                                />
                                <span className='username'>
                                    <Link to={`/@${user.username}`} className="usernameLink" onClick={this.handleUpdateUnsplashUser}>
                                        {user.name}
                                    </Link>
                                </span>
                                <UserCardSetting
                                    id={id}
                                    showUserImage={true}
                                    handleBlockUser={this.props.handleBlockUser}
                                    handleReportProfilePicture={this.props.handleReportProfilePicture}
                                    handleReportUser={this.props.handleReportUser}
                                />
                            </div>
                            <div className='image-description'>
                                <span>{description}</span>
                            </div>
                        </div>
                        <div className='image-outilWrapper'>
                            <div className='image-outil'>
                                <div className='image-like' onClick={this.props.handleLike}>
                                    {foundLikedImage ? (
                                        <span className='image-sLike'>
                                            {
                                                this.props.likes
                                            }
                                            &nbsp;<i className="fas fa-thumbs-up"></i> Like
                                        </span>
                                    ):(
                                        <span className='image-sDisLike'>
                                            {
                                                this.props.likes
                                            }
                                            &nbsp;<i className="far fa-thumbs-up"></i> Like
                                        </span>
                                    )}
                                </div>
                                <label className='image-comment' 
                                htmlFor={`userImage-${this.props.comment_Name}`}>
                                    <i className="far fa-comment"></i> Comment
                                </label>
                                <div className='image-share'
                                    onClick={this.props.handleShowShareModal}>
                                    Share
                                </div>
                            </div>
                            <div className='image-commentsAll'>
                                <form onSubmit={this.props.handleSubmit(this.props.onSubmit)} className='image-formComments'>
                                    <LazyImage ClickImage={null}
                                        srcImage={profileImage} 
                                        altImage={'profile-img'}
                                        style={emtyObject} 
                                        classImage=''
                                        imageRef={null}
                                    />
                                    <Field name={this.props.comment_Name} 
                                        id={`userImage-${this.props.comment_Name}`}
                                        component={this.props.renderInput}
                                    />
                                </form>
                                <div className='image-modalcomment'>
                                    {
                                        storeComment
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        };
    };
};

const mapStateToProps = getState => {
    if (getState.DBLoginStatus) {//login with db
        return {
            UserData: getState.DBUserData,//db user data
            LikesData: getState.DBUserLikesData,//Likes
            Comments: getState.Comments
        };
    } return {
        UserData: getState.UserData,//localstorage user data
        LikesData: getState.LikesData,
        Comments: getState.Comments
    };
};

export default connect(mapStateToProps, actions)(reduxForm ({
    form: 'commentsForm-modal'})(UserImageModalContent));
