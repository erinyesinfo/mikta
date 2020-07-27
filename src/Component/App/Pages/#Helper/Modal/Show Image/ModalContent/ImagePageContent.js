import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../../../../../Actions';
import './ImagePageContent.css';

/* Modal info */
import ImageInfoModal from "./Modal/ImageInfo";
/* Modal info Content */
import ImageInfo from './Modal/ModalContent/ImageInfo';

class ImagePageContent extends Component {
    ImageInfoContent = () => <ImageInfo img={this.props.img} />;
    renderImageInfo = () => {// show image info modal
        return (
          <ImageInfoModal handleShowImageInfo={this.props.handleShowImageInfo} 
            handleCloseImageInfo={this.props.handleCloseImageInfo}
            showImageInfo={this.props.showImageInfo}
            isShowImageInfo={this.props.isShowImageInfo}
            ImageInfoContent={this.ImageInfoContent}
            />
        );
    };
    handleClickRoute = () => {
        this.props.fetchUser(this.props.img.user);
        const replaceNames = this.props.img.user.name.replace(/[ ]/g, '_');
        this.props.history.push(`/@${replaceNames}`);
        var element = document.querySelector("body");
        element.style.overflowY = 'auto';
    };
    // handle share btn
    handleShare = () => alert('Attention, this feature is not available because i am not in the mood, anyways leave me');
    render() {
        const { img, foundLikedImage, handleLike, toggleCollection, handleDownload, dataURL } = this.props;
        const foundCollectionImage = this.props.Collection.find(
            data => data.preview_photos.find(d => d.id === img.id)
        );
        if (dataURL) {
            const { profileImage, firstName, lastName } = this.props.initialValues;
            return (
                <React.Fragment>
                    <div className='wrapper-imagePage'>
                        <div className='nav-profile'>
                            <div className='profileTitle'>
                                <img className='imageName' 
                                src={profileImage} alt={'profileImage'} />
                                <span className='image-spane-name'>
                                    {firstName} {lastName}
                                </span>
                            </div>
                            <div>
                                <button onClick={handleLike} 
                                className={foundLikedImage ? 'imagePage-likeHeart': 'imagePage-heartBtn'} >
                                    <i className="fas fa-heart"></i>
                                </button>
                                <button onClick={toggleCollection} className={foundCollectionImage ? 'imagePage-plusBtn-success':'imagePage-plusBtn'}>
                                    <span className='plusI'><i className="fas fa-plus"></i></span> Collect
                                </button>
                            </div>
                        </div>
                        <div className='imageContainer'>
                            <div className='image-page'>
                                <img className='image-page-likes' alt={img.description}
                                src={img.urls.regular} />
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
                    {this.props.isShowImageInfo ?
                        this.renderImageInfo()
                    :null}
                </React.Fragment>
            );
        } return (
            <React.Fragment>
                <div className='wrapper-imagePage'>
                    <div className='nav-profile'>
                        <div className='profileTitle'>
                            <img className='imageName' 
                            src={img.user.profile_image.large} alt={img.user.name} />
                            <span onClick={this.handleClickRoute} className='image-spane-name'>
                                {img.user.name}
                            </span>
                        </div>
                        <div>
                            <button onClick={handleLike} 
                            className={foundLikedImage ? 'imagePage-likeHeart': 'imagePage-heartBtn'} >
                                <i className="fas fa-heart"></i>
                            </button>
                            <button onClick={toggleCollection} className={foundCollectionImage ? 'imagePage-plusBtn-success':'imagePage-plusBtn'}>
                                <span className='plusI'><i className="fas fa-plus"></i></span> Collect
                            </button>
                            <button onClick={handleDownload} className='imagePage-heartBtn'>
                                <span className='imagePage-plusI'><i className="fas fa-arrow-down"></i></span>
                            </button>
                        </div>
                    </div>
                    <div className='imageContainer'>
                        <div className='image-page'>
                            <img className='image-page-likes' alt={img.description}
                            src={img.urls.regular} />
                        </div>
                    </div>
                    <div className='down-btns'>
                        <button onClick={this.handleShare} className='imagePage-plusBtn'>
                            <span className='plusI'>
                                <i className="fas fa-share"></i>
                            </span> &nbsp;Share
                        </button>   
                        <button className='imagePage-heartBtn' onClick={this.props.toggleImageInfo}>
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
                {this.props.isShowImageInfo ?
                    this.renderImageInfo()
                :null}
            </React.Fragment>
        );
    };
};

const mapStateToProps = getState => {
    return {
        initialValues: getState.ProfileData,
        Collection: getState.Collection,
    };
};

export default connect(mapStateToProps, actions)(ImagePageContent);
