import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../../../../../../Actions';
import './index.css';

/* Modal info */
import ImageInfoModal from './Modal';
/* Modal info Content */
import ImageInfo from './Modal/Content';

/* ThirdParty-Library */
import LazyImage from '../../../../../../ThirdParty-Library/Lazy Image/LazyImage';

class ImagePageContent extends Component {
    handleLike = () => {
        if (this.props.showImage && this.props.history.location.pathname === '/home/likes') {
            let element = document.querySelector('body');
            element.style.overflow = 'auto';
        }
        this.props.handleLike();
    };
    handleShowImageInfo = () => {
        let element = document.querySelector('body');
        element.style.overflow = 'hidden';
        return this.props.handleShowImageInfo();
    };
    handleCloseImageInfo = () => {
        let element = document.querySelector('body');
        element.style.overflow = 'auto';
        return this.props.handleCloseImageInfo();
    };
    ImageInfoContent = () => <ImageInfo img={this.props.img} />;
    renderImageInfo = () => {// show image info modal
        return (
          <ImageInfoModal handleCloseImageInfo={this.handleCloseImageInfo}
                showImageInfo={this.props.showImageInfo}
                ImageInfoContent={this.ImageInfoContent}
            />
        );
    };
    handleUpdateUnsplashUser = () => {
        if (!this.props.dataURL) {
            this.props.handleUpdateUnsplashUser(this.props.img.user);
        }
        let element = document.querySelector('body');
        element.style.overflowY = 'auto';
    };
    // handle share btn
    handleShare = () => alert('Attention, this feature is not available because i am not in the mood, anyways leave me');
    render() {
        let emtyObject = {};
        const { img, foundLikedImage, handleShowCollection, handleDownload, dataURL } = this.props;
        const foundCollectionImage = this.props.CollectionsData.find(
            data => data.preview_photos.find(d => d.id === img.id)
        );
        if (dataURL) {
            const { firstname, lastname, profileImage } = this.props.UserData;
            return (
                <React.Fragment>
                    <div className='wrapper-imagePage'>
                        <div className='nav-profile'>
                            <div className='profileTitle'>
                                <LazyImage srcImage={profileImage}
                                    altImage='profileImage' style={emtyObject}
                                    classImage='imageName'
                                />
                                <Link to='/home' className="image-user-name" onClick={this.handleUpdateUnsplashUser}>
                                    {firstname} {lastname}
                                </Link>
                            </div>
                            <div>
                                <button onClick={this.handleLike} 
                                className={foundLikedImage ? 'imagePage-likeHeart': 'imagePage-heartBtn'} >
                                    <i className="fas fa-heart"></i>
                                </button>
                                <button onClick={handleShowCollection} className={foundCollectionImage ? 'imagePage-plusBtn-success':'imagePage-plusBtn'}>
                                    <span className='plusI'><i className="fas fa-plus"></i></span> Collect
                                </button>
                            </div>
                        </div>
                        <div className='imageContainer'>
                            <div className='image-page'>
                                <LazyImage srcImage={img.urls.regular}
                                    altImage={img.description} style={emtyObject}
                                    classImage='image-page-likes'
                                />
                            </div>
                        </div>
                        <div className='down-btns'>
                            <button onClick={this.handleShare} className='imagePage-plusBtn'>
                                <span className='plusI'>
                                    <i className="fas fa-share"></i>
                                </span> &nbsp;Share
                            </button>
                        </div>
                    </div>
                    {/* Modal */}
                    {this.props.showImageInfo ?
                        this.renderImageInfo()
                    :null}
                </React.Fragment>
            );
        } return (
            <React.Fragment>
                <div className='wrapper-imagePage'>
                    <div className='nav-profile'>
                        <div className='profileTitle'>
                            <LazyImage srcImage={img.user.profile_image.large}
                                altImage={img.user.name} style={emtyObject}
                                classImage='imageName'
                            />
                            <Link to={`/@${img.user.username}`} className="image-user-name" onClick={this.handleUpdateUnsplashUser}>
                                {img.user.name}
                            </Link>
                        </div>
                        <div>
                            <button onClick={this.handleLike} 
                            className={foundLikedImage ? 'imagePage-likeHeart': 'imagePage-heartBtn'} >
                                <i className="fas fa-heart"></i>
                            </button>
                            <button onClick={handleShowCollection} className={foundCollectionImage ? 'imagePage-plusBtn-success':'imagePage-plusBtn'}>
                                <span className='plusI'><i className="fas fa-plus"></i></span> Collect
                            </button>
                            <button onClick={handleDownload} className='imagePage-downloadBtn'>
                                <span className='imagePage-plusI'><i className="fas fa-arrow-down"></i></span>
                            </button>
                        </div>
                    </div>
                    <div className='imageContainer'>
                        <div className='image-page'>
                            <LazyImage srcImage={img.urls.regular}
                                altImage={img.description} style={emtyObject}
                                classImage='image-page-likes'
                            />
                        </div>
                    </div>
                    <div className='down-btns'>
                        <button onClick={this.handleShare} className='imagePage-plusBtn'>
                            <span className='plusI'>
                                <i className="fas fa-share"></i>
                            </span> &nbsp;Share
                        </button>   
                        <button className='imagePage-heartBtn' onClick={this.props.handleShowImageInfo}>
                            <span className='imagePage-plusI'>
                                <span className='plusI'>
                                    <i className="fas fa-info-circle"></i>
                                </span>
                                &nbsp;&nbsp;Info
                            </span>
                        </button>
                    </div>
                </div>
                {/* Modal */}
                {this.props.showImageInfo ?
                    this.renderImageInfo()
                :null}
            </React.Fragment>
        );
    };
};

const mapStateToProps = getState => {
    if (getState.DBLoginStatus) {//login with db
        return {
            UserData: getState.DBUserData,
            CollectionsData: getState.DBUserCollectionsData
        };
    } return {
        UserData: getState.UserData,
        CollectionsData: getState.CollectionsData,
    };
};

export default connect(mapStateToProps, actions)(ImagePageContent);
