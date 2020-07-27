import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../../../Actions';
import uuid from 'uuid/v4';
import ImageCard from '../../#Helper/ImageCard';
import EditCollection from './Edit Collection/EditCollection';

/* Edit Collection Modal */
import EditCollectionModal from './Modal/EditCollection';

/* Header */
import Header from '../../../Header/Header';

/* helper */
import LazyImage from "../../../../ThirdParty-Library/Lazy Image/LazyImage";

class CollectionPhotos extends Component {
    state = {
        isEditCollection: false,
        showEditCollection: false,
    }
    componentDidMount() {
        const { params } = this.props.match;
        const findCollectionTitle = this.props.Collection.find(
            image => image.name === params.collectionTitle
        );
        if (!findCollectionTitle) return this.props.history.push('/');
    }
    toggleEditCollection = () => {
        var element = document.querySelector("body");
        element.style.overflow = 'hidden';
        this.setState({ isEditCollection: true });
    }
    handleShowEditCollection = () => this.setState({ showEditCollection: true });
    handleCloseEditCollection = () => {
        var element = document.querySelector("body");
        element.style.overflow = 'auto';
        return this.setState({
            showEditCollection: false,
            isEditCollection: false,
        });
    };
    renderEditCollection = () => {
        const urlId = this.props.match.params.id;
        return this.props.Collection.map(image => {
            if (image.id === urlId) {
                return <EditCollection key={uuid() || Math.random()} img={image}
                history={this.props.history} 
                handleCloseEditCollection={this.handleCloseEditCollection} />
            } return null
        });
    };
    renderEditCollectionModal = () => {
        return (
          <EditCollectionModal handleShowEditCollection={this.handleShowEditCollection} 
            handleCloseEditCollection={this.handleCloseEditCollection} 
            showEditCollection={this.state.showEditCollection}
            isEditCollection={this.state.isEditCollection} 
            renderEditCollection={this.renderEditCollection} />
        );
    };
    render() {
        const { history } = this.props;
        if (this.props.Collection.length === 0) {
            return (
                <React.Fragment>
                    <Header history={history} />
                    <div className='likesContent'>No collection photos :(</div>
                </React.Fragment>
            );
        }
        let emtyObject = {};
        const { firstName, lastName, profileImage } = this.props.ProfileData;
        const urlId = this.props.match.params.id;
        
        const arrStyle = this.props.Collection.filter(image => {
            if (image.id === urlId) return image;
            return null;
        })
        const myStyle = arrStyle.reduce(data => data);
        const inlineStyle = {
            background: `linear-gradient(hsla(0,0%,100%,.7),hsla(0,0%,100%,.7) 50%,#fff), url(${myStyle.preview})`,
            backgroundSize: 'cover'
        }
        
        return (
            <React.Fragment>
                <Header history={history} />
                <div style={inlineStyle} className='imgback'>
                    <div className='collectionInfo'>
                        <div className='nav-info'>
                            <div>
                                {this.props.Collection.map(image => {
                                    if (image.id === urlId) {
                                        return (
                                            <h1 key={uuid()}>
                                                {image.name}
                                            </h1>
                                        )
                                    } return null
                                })}
                                <div className='info-user'>
                                    <div className='userImageProfile'>
                                    <LazyImage ClickImage={null} 
                                        srcImage={profileImage} 
                                        altImage={firstName} 
                                        style={emtyObject} classImage='' 
                                        imageRef={null} 
                                    />
                                    {/* <img src={profileImage} alt={firstName} /> */}
                                    </div>
                                    {firstName} {lastName}
                                </div>
                            </div>
                            <div>
                                <button onClick={this.toggleEditCollection} 
                                className='imagePage-plusBtn' type='button'>
                                    Edit
                                </button>
                            </div>
                        </div>
                        <div>
                            {this.props.Collection.map(image => {
                                if (image.id === urlId) {
                                        return (
                                            <span key={uuid()}>
                                                {image.preview_photos.length === 1 ?
                                                    image.preview_photos.length + ' photo'
                                                :image.preview_photos.length + ' photos'}
                                            </span>
                                        )
                                } return null
                            })}
                        </div>
                    </div>
                </div>
                <div className='images'>
                    <div className='photosCategory'>
                        <div className='mediaWidth'>
                            {this.props.Collection.map((image, i) => {
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
                {this.state.isEditCollection ?
                    this.renderEditCollectionModal()
                :null}
            </React.Fragment>
        )
    }
}

const mapStateToProps = (getState) => {
    return {
        Collection: getState.Collection,
        ProfileData: getState.ProfileData
    }
};

export default connect(mapStateToProps, actions)(CollectionPhotos);