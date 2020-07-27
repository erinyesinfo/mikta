import React, { Component } from 'react';
import uuid from 'uuid/v4';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../../../../../Actions';

/* helper */
import LazyImage from "../../../../../ThirdParty-Library/Lazy Image/LazyImage";

class ImageCardCollections extends Component {
    constructor(props) {
        super(props);
        this.state = { mouseIn: false };
    };
    handleMouseEnter = () => this.setState({ mouseIn: true });
    handleMouseLeave = () => this.setState({ mouseIn: false });
    render() {
        let emtyObject = {};
        const { preview_photos } = this.props;
        const { id, title, total_photos, user } = this.props.image;
        const { description, urls } = this.props.image.cover_photo;
        if (!description && !urls) return null;
        return (
            <span className='selectAll'>
                <Link to={`/collections/${id}/${title}`} className={this.state.mouseIn ?
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
                                );
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
                            );
                        })}
                    </div>
                </Link>
                <div className='userInfo'>
                    <h3 className='title'
                        onMouseEnter={this.handleMouseEnter}
                        onMouseLeave={this.handleMouseLeave}>
                        <Link to={`/collections/${id}/${title}`}>{title}</Link>
                    </h3>
                    <span className='info'>{total_photos} photos · Curated by {user.name}</span>
                </div>
            </span>
        );
    };
};

export default connect(null, actions)(ImageCardCollections);
