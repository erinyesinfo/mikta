import React, { Component } from 'react';
import uuid from 'uuid/v4';
import { connect } from 'react-redux';
import * as actions from '../../../../../../Actions';
import '../../../Home/Sub Pages/Collection/HomeCollection.css';

/* helper */
import LazyImage from "../../../../../ThirdParty-Library/Lazy Image/LazyImage";

class ImageCardCollections extends Component {
    constructor(props) {
        super(props);
        this.state = { mouseIn: false };
    };
    handleFetchColletionPhotos = () => {
        const { id, total_photos, title, user } = this.props.image;
        const { urls } = this.props.image.cover_photo;
        const { name, profile_image } = user;
        setTimeout(() => this.props.fetchUserCollectionPhotos(id, 1), 50);

        this.props.fetchUserCollectionPhotosDetailes(
            id, title, name, urls.regular, profile_image.large, total_photos
        );
        return this.props.history.push(`/collections/${id}/${title}`);
    };
    handleMouseEnter = () => this.setState({ mouseIn: true });
    handleMouseLeave = () => this.setState({ mouseIn: false });
    render() {
        let emtyObject = {};
        const { preview_photos } = this.props;
        const { title, total_photos, user } = this.props.image;
        const { description, urls } = this.props.image.cover_photo;
        if (!description && !urls) return null;
        return (
            <React.Fragment>
                <span className='selectAll'>
                    <div onClick={this.handleFetchColletionPhotos}
                        className={this.state.mouseIn ?
                            'container-collection containerHover':'container-collection'}>
                        <div className='container_1'>
                            <LazyImage ClickImage={null} srcImage={urls.regular} 
                                altImage={description} style={emtyObject}
                                classImage='collection-container1-img' imageRef={null}
                            />
                        </div>
                        <div className='container_2'>
                            {preview_photos.map((preview, i) => {
                                if (preview_photos.length === 2 && i !== 0) {
                                    const inlineStyle = { width: '40%' }
                                    return (
                                        <React.Fragment key={uuid()} >
                                            <LazyImage
                                                key={uuid()} ClickImage={null} 
                                                srcImage={preview.urls.regular} 
                                                altImage={description}
                                                style={emtyObject}
                                                classImage='constainer_2-colletion-img' 
                                                imageRef={this.imageRef}
                                            />
                                            <div className="mTW0H" style={inlineStyle}></div>
                                        </React.Fragment>
                                    )
                                }
                                if (preview_photos.length === 1) {
                                    return (
                                        <div className="_2gO6E" key={uuid()}>
                                            <div className="mTW0H"></div>
                                            <div className="mTW0H"></div>
                                        </div>
                                    );
                                }
                                if (i > 2 || i === 0) return null
                                return (
                                    <LazyImage key={uuid()} ClickImage={null} 
                                        srcImage={preview.urls.regular} 
                                        altImage={description}
                                        style={emtyObject}
                                        classImage='constainer_2-colletion-img'
                                        imageRef={this.imageRef}
                                    />
                                )
                            })}
                        </div>
                    </div>
                    <div className='userInfo'>
                        <h3 className='title'
                            onClick={this.handleFetchColletionPhotos}
                            onMouseEnter={this.handleMouseEnter}
                            onMouseLeave={this.handleMouseLeave}>
                            {title}
                        </h3>
                        <span className='info'>{total_photos} photos · Curated by {user.name}</span>
                    </div>
                </span>
            </React.Fragment>
        );
    };
};

export default connect(null, actions)(ImageCardCollections);