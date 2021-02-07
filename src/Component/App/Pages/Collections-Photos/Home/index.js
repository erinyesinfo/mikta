import React, { Component } from 'react';
import { v4 as uuid } from 'uuid';
import { connect } from 'react-redux';
import * as actions from '../../../../../Actions';
import ImageCard from '../../#Helper';// imageCard

/* Edit Collection Modal */
import EditCollectionModal from './Modal';
/* Edit Collection Modal Content */
import EditCollection from './Modal/Content';

/* helper */
import LazyImage from '../../../../ThirdParty-Library/Lazy Image/LazyImage';

class CollectionPhotos extends Component {
    constructor(props) {
        super(props);
        this.state = {
            spinner: false,
            preview: '',
            showEditCollection: false
        };
    };
    componentDidMount() {
        const { id, title, ib } = this.props.match.params;
        const findCollection = this.props.CollectionsData.find(image => image.id === id);
        if (findCollection) {
            this.props.handleCollectionPhotosPreview(findCollection.preview);
            if (findCollection.name !== title || findCollection.ib !== ib) {
                this.props.history.push(`/collections/${id}/${findCollection.name}/${findCollection.ib}`);
            }
        }
    };
    handleShowSpinner = () => this.setState({ spinner: true });
    handleCloseSpinner = () => this.setState({ spinner: false });
    handleShowEditCollection = () => {
        let element = document.querySelector('body');
        element.style.overflow = 'hidden';
        this.setState({ showEditCollection: true });
    };
    handleCloseEditCollection = () => {
        let element = document.querySelector('body');
        element.style.overflow = 'auto';
        return this.setState({ showEditCollection: false });
    };
    renderEditCollection = () => {
        const urlId = this.props.match.params.id;
        return this.props.CollectionsData.map(image => {
            if (image.id === urlId) {
                return (
                    <EditCollection key={uuid() || Math.random()}
                        id={urlId} img={image}
                        history={this.props.history}
                        handleCloseEditCollection={this.handleCloseEditCollection}
                        handleShowSpinner={this.handleShowSpinner}
                        handleCloseSpinner={this.handleCloseSpinner}
                        spinner={this.state.spinner}
                    />
                );
            } return null;
        });
    };
    renderEditCollectionModal = () => {
        return (
          <EditCollectionModal handleCloseEditCollection={this.handleCloseEditCollection} 
            showEditCollection={this.state.showEditCollection}
            renderEditCollection={this.renderEditCollection} />
        );
    };
    render() {
        if (this.props.CollectionsData.length === 0) {
            return <div className='likesContent'>No collection photos :(</div>;
        }
        let emtyObject = {};
        const { CollectionPhotosPreview, match, UserData } = this.props;
        const urlId = match.params.id;
        const { firstname, lastname, profileImage } = UserData;
        const findCollection = this.props.CollectionsData.find(image => image.id === urlId);
        const inlineStyle = {
            background: `linear-gradient(hsla(0,0%,100%,.7),hsla(0,0%,100%,.7) 50%,#fff), url(${findCollection.preview || CollectionPhotosPreview || ''})`,
            backgroundSize: 'cover'
        };
        return (
            <React.Fragment>
                <div style={inlineStyle} className='imgback'>
                    <div className='collectionInfo'>
                        <div className='nav-info'>
                            <div>
                                {this.props.CollectionsData.map(image => {
                                    if (image.id === urlId) {
                                        return (
                                            <h1 key={uuid()}>
                                                {image.name}
                                            </h1>
                                        );
                                    } return null
                                })}
                                <div className='info-user'>
                                    <div className='userImageProfile'>
                                    <LazyImage ClickImage={null} 
                                        srcImage={profileImage} draggable="false"
                                        altImage={'profileImage'} 
                                        style={emtyObject} classImage='' 
                                        imageRef={null} 
                                    />
                                    </div>
                                    {firstname} {lastname}
                                </div>
                            </div>
                            <div>
                                <button onClick={this.handleShowEditCollection} 
                                className='imagePage-plusBtn' type='button'>
                                    Edit
                                </button>
                            </div>
                        </div>
                        <div>
                            {this.props.CollectionsData.map(image => {
                                if (image.id === urlId) {
                                        return (
                                            <span key={uuid()}>
                                                {image.preview_photos.length === 1 ?
                                                    image.preview_photos.length + ' photo'
                                                :image.preview_photos.length + ' photos'}
                                            </span>
                                        );
                                } return null
                            })}
                        </div>
                    </div>
                </div>
                <div className='images'>
                    <div className='photosCategory'>
                        <div className='mediaWidth'>
                            {this.props.CollectionsData.map((image, i) => {
                                if(image.id === urlId) {
                                    return image.preview_photos.map((previewImg, i) => {
                                        return <ImageCard key={uuid() || Math.random()} img={previewImg}
                                        history={this.props.history} />
                                    });
                                } return null
                            })}
                        </div>
                    </div>
                </div>
                {this.state.showEditCollection ?
                    this.renderEditCollectionModal()
                :null}
            </React.Fragment>
        );
    };
};

const mapStateToProps = getState => {
    if (getState.DBLoginStatus) {//login with db
        return {
            UserData: getState.DBUserData,
            CollectionsData: getState.DBUserCollectionsData,
            CollectionPhotosPreview: getState.CollectionPhotosPreview,
        };
    } return {
        UserData: getState.UserData,
        CollectionsData: getState.CollectionsData,
        CollectionPhotosPreview: getState.CollectionPhotosPreview,
    };
};

export default connect(mapStateToProps, actions)(CollectionPhotos);
