import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import * as actions from '../../../../../../../../../Actions';
import './index.css';

/* ThirdParty-Library */
import LazyImage from '../../../../../../../../ThirdParty-Library/Lazy Image/LazyImage';

class ShareModalContent extends Component {
    constructor(props) {
        super(props);
        this.state = { showDescription: false };
    };
    imageRef = React.createRef();
    handleShowDescription = () => this.setState({ showDescription: true });
    render() {
        let emtyObject = {};
        if (this.props.isRandom) {
            return this.props.image.map(img => {
                const { description, urls } = img;
                const { firstname, lastname, profileImage } = this.props.UserData;
                const { userPost, id } = this.props;
                const foundLikedImage = this.props.LikesData.find(data => data.id === img.id);
                return (
                    <div key={id} className='share-container'>
                        <form onSubmit={this.props.handleSubmit(this.props.onShareSubmit)}>
                            <Field name={`share-${this.props.comment_Name}`}
                                component={this.props.renderShareInput} />
                            <div className='share-userProfile'>
                                <div className='share-user'>
                                    <LazyImage srcImage={profileImage}
                                        altImage={'profileImage'} style={emtyObject}
                                        classImage='share-profileMyImg'
                                    />
                                    <span className='share-username'>
                                        <div className='share-usernameLink'>
                                            {firstname} {lastname}
                                        </div>
                                    </span>
                                    <span className='share-setting'>...</span>
                                </div>
                                <div className={this.state.showDescription ?
                                    'share-Longdescription' :'share-description'}>
                                    {userPost && userPost.length !== 0 ?
                                        <span>{userPost.length > 155 ? (
                                                <div className='share-descriptionHolder'>
                                                    {this.state.showDescription ? userPost
                                                    :userPost.substr(0, 155) + '...'}
                                                    {this.state.showDescription ? 
                                                    null
                                                    :<button onClick={this.handleShowDescription} className='showMoreDescription' type="button">Show More</button>}
                                                </div>
                                        )
                                        :userPost}</span>
                                    :null}
                                </div>
                                <div className='share-DivtagImages'>
                                    <LazyImage srcImage={urls.regular}
                                        altImage={description}
                                        style={emtyObject}
                                        classImage={this.state.showDescription ?
                                            'share-tagImages share-tagImagesDescrtiption' :'share-tagImages'}
                                        imageRef={this.imageRef}
                                    />
                                </div>
                                <div className='share-outil'>
                                    <div className='share-like'>
                                        {foundLikedImage ? (
                                            <span className='share-sLike'>
                                                {this.props.likes} <i className="fas fa-thumbs-up"></i> Like
                                            </span>
                                        ):(
                                            <span className='share-sDisLike'>
                                                {this.props.likes} <i className="far fa-thumbs-up"></i> Like
                                            </span>
                                        )}
                                    </div>
                                    <label className='share-comment'>
                                        <i className="far fa-comment"></i> Comment
                                    </label>
                                </div>
                            </div>
                            <button type='submit' className="share-ShareModal" >
                                Share
                            </button>
                            <button type='button' className="cancel-ShareModal" 
                                onClick={this.props.handleCloseShareModal}>
                                Cancel
                            </button>
                        </form>
                    </div>
                );
            });
        } else if (this.props.image === null) {
            const { firstname, lastname, profileImage } = this.props.UserData;
            const { userPost } = this.props;
            return (
                <div>
                    <form onSubmit={this.props.handleSubmit(this.props.onShareSubmit)}>
                        <Field name={`share-${this.props.comment_Name}`} 
                            component={this.props.renderShareInput}
                        />
                        <div className='share-userProfile'>
                            <div className='share-user'>
                                <LazyImage srcImage={profileImage}
                                    altImage={'profileImage'} style={emtyObject}
                                    classImage='share-profileMyImg'
                                />
                                <span className='share-username'>
                                    <div className='share-usernameLink'>
                                        {firstname} {lastname}
                                    </div>
                                </span>
                                <span className='share-setting'>...</span>
                            </div>
                            <div className={this.state.showDescription ? 'share-Longdescription' :'share-description'}>
                                {userPost && userPost.length !== 0 ?
                                    <span>{userPost.length > 155 ? (
                                        <div className='share-descriptionHolder'>
                                            {this.state.showDescription ? userPost
                                            :userPost.substr(0, 155) + '...'}
                                            {this.state.showDescription ? 
                                            null
                                            :(<button onClick={this.handleShowDescription} className='showMoreDescription' type="button">
                                                Show More
                                            </button>)}
                                        </div>
                                    )
                                    :userPost}</span>
                                :null}
                            </div>
                            <div className='share-outil'>
                                <div className='share-like'>
                                    {this.props.likes === 1 ? (
                                        <span className='share-sLike'>
                                            {this.props.likes} <i className="fas fa-thumbs-up"></i> Like
                                        </span>
                                    ):(
                                        <span className='share-sDisLike'>
                                            {this.props.likes} <i className="far fa-thumbs-up"></i> Like
                                        </span>
                                    )}
                                </div>
                                <label className='share-comment'>
                                    <i className="far fa-comment"></i> Comment
                                </label>
                            </div>
                        </div>
                        <button type='submit' className="share-ShareModal" >
                            Share
                        </button>
                        <button type='button' className="cancel-ShareModal" 
                            onClick={this.props.handleCloseShareModal}>
                            Cancel
                        </button>
                    </form>
                </div>
            );
        } else {
            const { description, urls, user, id } = this.props.image;
            const foundLikedImage = this.props.LikesData.find(data => data.id === id);
            return (
                <form onSubmit={this.props.handleSubmit(this.props.onShareSubmit)}>
                    <Field name={`share-${this.props.comment_Name}`}
                        component={this.props.renderShareInput} />
                    <div className='share-userProfile'>
                        <div className='share-user'>
                            <LazyImage ClickImage={null}
                                srcImage={user.profile_image.large} 
                                altImage={user.first_name} style={emtyObject}
                                classImage='share-profileImg' 
                                imageRef={null}
                            />
                            <span className='share-username'>
                                <div className='share-usernameLink'>
                                    {user.name}
                                </div>
                            </span>
                            <span className='share-setting'>...</span>
                        </div>
                        <div className={this.state.showDescription ? 'share-Longdescription' :'share-description'}>
                            {description && description.length !== 0 ?
                                <span>{description.length > 155 ? (
                                    <div className='share-descriptionHolder'>
                                        {this.state.showDescription ? description
                                        :description.substr(0, 155) + '...'}
                                        {this.state.showDescription ? 
                                        null
                                        :<button onClick={this.handleShowDescription} className='showMoreDescription' type="button">
                                            Show More
                                        </button>}
                                    </div>
                                )
                                :description}</span>
                            :null}
                        </div>
                        <div className='share-DivtagImages'>
                            <LazyImage ClickImage={null}
                                srcImage={urls.regular} 
                                altImage={description} style={emtyObject} 
                                classImage={this.state.showDescription ?
                                    'share-tagImages share-tagImagesDescrtiption' :'share-tagImages'}
                                imageRef={this.imageRef}
                            />
                        </div>
                        <div className='share-outil'>
                            <div className='share-like'>
                                {foundLikedImage ? (
                                    <span className='share-sLike'>
                                        {this.props.likes} <i className="fas fa-thumbs-up"></i> Like
                                    </span>
                                ):(
                                    <span className='share-sDisLike'>
                                        {this.props.likes} <i className="far fa-thumbs-up"></i> Like
                                    </span>
                                )}
                            </div>
                            <label className='share-comment'>
                                <i className="far fa-comment"></i> Comment
                            </label>
                        </div>
                    </div>
                    <button type='submit' className="share-ShareModal" >
                        Share
                    </button>
                    <button type='button' className="cancel-ShareModal"
                        onClick={this.props.handleCloseShareModal}>
                        Cancel
                    </button>
                </form>
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
        UserData: getState.UserData,
        LikesData: getState.LikesData,
        Comments: getState.Comments
    };
};

export default connect(mapStateToProps, actions)(reduxForm ({
    form: 'shareForm-modal'})(ShareModalContent));
