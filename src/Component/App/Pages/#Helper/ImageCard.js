import React, { Component } from 'react';
import './ImageCard.css';
import { connect } from 'react-redux';
import * as actions from '../../../../Actions';
import LikedImages from './Image Card/LikedImages';

/* Show Image Modal */
import ShowImageModal from './Modal/Show Image/ShowImage';
/* ImagePage Modal Content */
import ImagePageContent from './Modal/Show Image/ModalContent/ImagePageContent';

/* Show Collection Modal */
import CollectionModal from './Modal/Show Collection/Collection';
/* Collection Modal Content */
import CollectionModalContent from './Modal/Show Collection/ModalContent/CollectionModalContent';

class ImageCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowImageInfo: false,
            showImageInfo: false,
            isShowImage: false,
            showImage: false,
            showCollection: false,
            isShowCollection: false,
        };
    };
    // like a photo
    handleLike = e => {
        if (e) { e.stopPropagation(); }
        if (!this.props.LogIn) return alert('Attention, you have to be log in in order to like photos!');
        const { img } = this.props;
        const foundLikedImage = this.props.LikesData.find(data => data.id === img.id);
        if (foundLikedImage) {
            if (this.state.isShowImage) {
                this.handleCloseImage();
            }
            return this.props.removeLikesData(img.id);
        } return this.props.likesData(img);
    };
    // donwload photo
    handleDownload = () => {
        const { img } = this.props;
        window.location.replace(`https://unsplash.com/photos/${img.id}/download?force=true`);
    };
    // image info
    toggleImageInfo = () => {
        var element = document.querySelector("body");
        element.style.overflow = 'hidden';
        this.setState({ isShowImageInfo: true });
    };
    handleShowImageInfo = () => this.setState({ showImageInfo: true });
    handleCloseImageInfo = () => {
        var element = document.querySelector("body");
        element.style.overflow = 'auto';
        this.setState({ showImageInfo: false, isShowImageInfo: false });
    }; // end of image info
    toggleImage = () => {
        var element = document.querySelector("body");
        element.style.overflow = 'hidden';
        this.setState({ isShowImage: true });
    };
    handleShowImage = () => this.setState({ showImage: true });
    handleCloseImage = () => {
        var element = document.querySelector("body");
        element.style.overflow = 'auto';
        this.setState({ showImage: false, isShowImage: false });
    };
    renderImagePage = () => {
        const { img } = this.props;
        const foundLikedImage = this.props.LikesData.find(data => data.id === img.id);
        return <ImagePageContent history={this.props.history}
                    img={img} handleLike={this.handleLike}
                    handleDownload={this.handleDownload} foundLikedImage={foundLikedImage}
                    toggleCollection={this.toggleCollection}
                    // img-info
                    toggleImageInfo={this.toggleImageInfo}
                    handleShowImageInfo={this.handleShowImageInfo}
                    handleCloseImageInfo={this.handleCloseImageInfo}
                    isShowImageInfo={this.state.isShowImageInfo}
                    showImageInfo={this.state.showImageInfo}
                    // image uploaded
                    dataURL={img.dataURL}
                />;
    }
    renderImage = () => {// show image modal page
        return (
          <ShowImageModal handleShowImage={this.handleShowImage} 
          handleCloseImage={this.handleCloseImage} showImage={this.state.showImage}
          isShowImage={this.state.isShowImage} renderImagePage={this.renderImagePage}
          showImageInfo={this.state.showImageInfo} />
        );
    };
    toggleCollection = (e) => {
        e.stopPropagation();
        if (!this.props.LogIn) return alert('Attention, you have to be log in in order to collect photos!');
        var element = document.querySelector("body");
        element.style.overflow = 'hidden';
        this.setState({ isShowCollection: true });
        return this.state.isShowImage ? (this.handleCloseImage(), element.style.overflow = 'hidden'):null
    };
    handleShowCollection = () => this.setState({ showCollection: true });
    handleCloseCollection = () => {
        var element = document.querySelector("body");
        element.style.overflow = 'auto';
        this.setState({ showCollection: false, isShowCollection: false });
    };
    renderCollectionPage = () => {
        return <CollectionModalContent img={this.props.img}
                    handleCloseCollection={this.handleCloseCollection}
                />
    };
    renderCollection = () => {// show modal collection
        return (
          <CollectionModal handleShowCollection={this.handleShowCollection} 
          handleCloseCollection={this.handleCloseCollection} showCollection={this.state.showCollection}
          isShowCollection={this.state.isShowCollection} renderCollectionPage={this.renderCollectionPage} />
        );
    };
    render() {
        const { img } = this.props;
        const foundLikedImage = this.props.LikesData.find(data => data.id === img.id);
        return (
            <React.Fragment>
                <LikedImages 
                    history={this.props.history}
                    toggleImage={this.toggleImage}
                    handleLike={this.handleLike}
                    handleDownload={this.handleDownload}
                    foundLikedImage={foundLikedImage}
                    toggleCollection={this.toggleCollection}
                    img={img}
                    User={this.props.User || false}
                    dataURL={img.dataURL}
                />
                {/* Modals */}
                {this.state.isShowImage ?
                    this.renderImage()
                :null}
                {this.state.isShowCollection ?
                    this.renderCollection()
                :null}
            </React.Fragment>
        );
    };
};

const mapStateToProps = getState => {
    return {
        LogIn: getState.isLogIn,
        Collection: getState.Collection,
        LikesData: getState.LikesData
    };
};

export default connect(mapStateToProps, actions)(ImageCard);
