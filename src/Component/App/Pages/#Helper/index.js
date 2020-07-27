import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../../Actions';
import CardImage from './Image Card';
import './index.css';

/* Show Image Modal */
import ShowImageModal from './Modal/Show Image';
/* ImagePage Modal Content */
import ImagePageContent from './Modal/Show Image/Content';

/* Show Collection Modal */
import CollectionModal from './Modal/Show Collection';
/* Collection Modal Content */
import CollectionModalContent from './Modal/Show Collection/Content';

class ImageCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showImageInfo: false,
            showImage: false,
            showCollection: false,
        };
    };
    // like a photo
    handleLike = e => {
        if (e) {
            e.stopPropagation();
        }
        if (!this.props.DBLoginStatus && !this.props.LocalStorageLoginStatus) return alert('Attention, you have to be log in in order to like images!');
        const { img } = this.props;
        const foundLikedImage = this.props.LikesData.find(data => data.id === img.id);
        if (this.props.DBLoginStatus) {//db login
            if (foundLikedImage) {//remove like image -1
                if (this.state.isShowImage) {
                    this.handleCloseImage();
                }
                return this.props.handleUpdateLikesDataDB(img.id);
            } return this.props.handleUpdateLikesDataDB(img);//like image +1
        } else {
            if (foundLikedImage) {//remove like image -1
                if (this.state.isShowImage) {
                    this.handleCloseImage();
                }
                return this.props.handleUpdateLikesData(img.id);
            } return this.props.handleUpdateLikesData(img);//like image +1
        }
    };
    // download photo
    handleDownload = () => {
        const { img } = this.props;
        window.location.replace(`https://unsplash.com/photos/${img.id}/download?force=true`);
    };
    // image-info modal
    handleShowImageInfo = () => this.setState({ showImageInfo: true });
    handleCloseImageInfo = () => this.setState({ showImageInfo: false });
    // image modal
    handleShowImage = () => {
        let element = document.querySelector('body');
        element.style.overflow = 'hidden';
        this.setState({ showImage: true });
    };
    handleCloseImage = () => {
        let element = document.querySelector('body');
        element.style.overflow = 'auto';
        this.setState({ showImage: false });
    };
    renderImagePage = () => {
        const { img } = this.props;
        const foundLikedImage = this.props.LikesData.find(data => data.id === img.id);
        return (
            <ImagePageContent history={this.props.history}
                img={img} handleLike={this.handleLike}
                handleDownload={this.handleDownload} foundLikedImage={foundLikedImage}
                handleShowCollection={this.handleShowCollection}
                // image-info functions modal
                handleShowImageInfo={this.handleShowImageInfo}
                handleCloseImageInfo={this.handleCloseImageInfo}
                showImage={this.state.showImage}
                showImageInfo={this.state.showImageInfo}
                // image uploaded
                dataURL={img.dataURL}
            />
        );
    };
    renderImage = () => {// show image modal page
        return (
            <ShowImageModal handleCloseImage={this.handleCloseImage}
                showImage={this.state.showImage}
                renderImagePage={this.renderImagePage}
                showImageInfo={this.state.showImageInfo}
                showCollection={this.state.showCollection}
            />
        );
    };
    // collection modal
    handleShowCollection = e => {
        e.stopPropagation();
        if (!this.props.DBLoginStatus && !this.props.LocalStorageLoginStatus) return alert('Attention, you have to be log in in order to collect photos!');
        let element = document.querySelector('body');
        element.style.overflow = 'hidden';
        this.setState({ showCollection: true });
        return this.state.showCollection ? (this.handleCloseImage(), element.style.overflow = 'hidden'):null
    };
    handleCloseCollection = () => {
        if (!this.state.showImage) {
            let element = document.querySelector('body');
            element.style.overflow = 'auto';
        }
        this.setState({ showCollection: false });
    };
    renderCollectionPage = () => {
        return (
            <CollectionModalContent img={this.props.img}
                handleCloseCollection={this.handleCloseCollection}
            />
        );
    };
    renderCollection = () => {// show modal collection
        return (
            <CollectionModal handleCloseCollection={this.handleCloseCollection}
                showCollection={this.state.showCollection}
                renderCollectionPage={this.renderCollectionPage}
            />
        );
    };
    render() {
        const { img } = this.props;
        const foundLikedImage = this.props.LikesData.find(data => data.id === img.id);
        return (
            <React.Fragment>
                <CardImage 
                    history={this.props.history}
                    handleShowImage={this.handleShowImage}
                    handleLike={this.handleLike}
                    handleDownload={this.handleDownload}
                    foundLikedImage={foundLikedImage}
                    handleShowCollection={this.handleShowCollection}
                    img={img}
                    dataURL={img.dataURL}
                />
                {/* Modals */}
                {this.state.showImage ?
                    this.renderImage()
                :null}
                {this.state.showCollection ?
                    this.renderCollection()
                :null}
            </React.Fragment>
        );
    };
};

const mapStateToProps = getState => {
    if (getState.DBLoginStatus) {//login with db
        return {
            DBLoginStatus: getState.DBLoginStatus,
            LocalStorageLoginStatus: getState.LocalStorageLoginStatus,
            LikesData: getState.DBUserLikesData
        };
    } return {
        DBLoginStatus: getState.DBLoginStatus,
        LocalStorageLoginStatus: getState.LocalStorageLoginStatus,
        LikesData: getState.LikesData
    };
};

export default connect(mapStateToProps, actions)(ImageCard);
