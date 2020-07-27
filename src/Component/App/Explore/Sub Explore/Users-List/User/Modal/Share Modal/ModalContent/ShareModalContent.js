import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import * as actions from '../../../../../../../../../Actions';
import './ShareModalContent.css';

/* ThirdParty-Library */
import LazyImage from "../../../../../../../../ThirdParty-Library/Lazy Image/LazyImage";

class ShareModalContent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showDescription: false
        }
    }
    imageRef = React.createRef();
    handleShowDescription = () => this.setState({ showDescription: true });
    render() {
        let emtyObject = {};
        if (this.props.isRandom) {
            return this.props.image.map(img => {
                const { description, urls } = img;
                const { profileImage, firstName, lastName } = this.props.initialValues;
                const { userPost, id } = this.props;
                const foundLikedImage = this.props.LikesData.find(data => data.id === img.id);
                return (
                    <div key={id} className='share-container'>
                        <React.Fragment>
                            <form onSubmit={this.props.handleSubmit(this.props.onShareSubmit)}>
                                <Field name={`share-${this.props.comment_Name}`}
                                    component={this.props.renderShareInput} />
                                <div className='share-userProfile'>
                                    <div className='share-user'>
                                        <LazyImage srcImage={profileImage}
                                            altImage={firstName} style={emtyObject}
                                            classImage='share-profileMyImg'
                                        />
                                        {/* <img className='share-profileMyImg' src={profileImage} 
                                        alt={firstName} /> */}
                                        <span className='share-username'>
                                            <div className='share-usernameLink'>
                                                {firstName} {lastName}
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
                                        {/* <img className={this.state.showDescription ? 'share-tagImages share-tagImagesDescrtiption' :'share-tagImages'} ref={this.imageRef} alt={description} src={urls.regular} /> */}
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
                        </React.Fragment>
                    </div>
                );
            });
        } else if (this.props.image === null) {
            const { profileImage, firstName, lastName } = this.props.initialValues;
            const { userPost } = this.props;
            return (
                <div>
                    <React.Fragment>
                        <form onSubmit={this.props.handleSubmit(this.props.onShareSubmit)}>
                            <Field name={`share-${this.props.comment_Name}`} 
                                component={this.props.renderShareInput}
                            />
                            <div className='share-userProfile'>
                                <div className='share-user'>
                                    <LazyImage srcImage={profileImage}
                                        altImage={firstName} style={emtyObject}
                                        classImage='share-profileMyImg'
                                    />
                                    {/* <img className='share-profileMyImg' src={profileImage} 
                                    alt={firstName} /> */}
                                    <span className='share-username'>
                                        <div className='share-usernameLink'>
                                            {firstName} {lastName}
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
                    </React.Fragment>
                </div>
            );
        } else {
            const { description, urls, user, id } = this.props.image;
            const foundLikedImage = this.props.LikesData.find(data => data.id === id);
            return (
                <React.Fragment>
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
                                {/* <img className='share-profileImg' src={user.profile_image.large} 
                                alt={user.first_name} /> */}
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
                                {/* <img className={this.state.showDescription ? 'share-tagImages share-tagImagesDescrtiption' :'share-tagImages'} ref={this.imageRef} alt={description} src={urls.regular} /> */}
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
                </React.Fragment>
            );
        }
    }
}

const mapStateToProps = (getState) => {
    return {
        initialValues: getState.ProfileData,
        Comments: getState.Comments,
        LikesData: getState.LikesData,
    }
};

export default connect(mapStateToProps, actions)(reduxForm ({
    form: 'shareForm-modal'})(ShareModalContent));