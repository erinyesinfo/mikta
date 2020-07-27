import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../../../../Actions';
import uuid from 'uuid/v4'
import './HomeCollection.css';

/* helper */
import LazyImage from "../../../../../ThirdParty-Library/Lazy Image/LazyImage";

class HomeCollection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            spans: 40,
            mouseIn: false
        };
        this.collectionImageRef = React.createRef();
    }
    UNSAFE_componentWillMount() {
        window.addEventListener('resize', this.setSpans);
        window.addEventListener('load', this.setSpans);
        window.addEventListener('scroll', this.setSpans);
    }
    componentWillUnmount() {
        window.removeEventListener('resize', this.setSpans);
        window.removeEventListener('load', this.setSpans);
        window.removeEventListener('scroll', this.setSpans);
    }
    setSpans = () => {
        const height = !this.collectionImageRef.current ? 0:this.collectionImageRef.current.clientHeight;
        
        const spans = Math.ceil(height / 10);
        this.setState({ spans });
    };
    handleRouteCollection = () => {
        const { id, name } = this.props.image;
        return this.props.history.push(`/collections/${id}/${name}`);
    };
    handleMouseEnter = () => this.setState({ mouseIn: true });
    handleMouseLeave = () => this.setState({ mouseIn: false });
    render() {
        const { firstName, lastName } = this.props.initialProfileData;
        const { description, urls } = this.props.image.img;
        const { preview, preview_photos, name } = this.props.image;
        let emtyObject = {};
        const inlineStyling = { gridRowEnd: `span ${this.state.spans}` };
        
        if (!preview) {
            return (
                <div ref={this.collectionImageRef} className='selectAll'
                    style={inlineStyling}>
                    <div className='hNzsd' onClick={this.handleRouteCollection}>
                        <div className="_2zwgf">
                            <div className="_2vGrb"></div>
                            <div className="_2gO6E">
                                <div className="mTW0H"></div>
                                <div className="mTW0H"></div>
                            </div>
                        </div>
                    </div>
                    <div className='userInfo'>
                        <h3 className='title' onClick={this.handleRouteCollection}>
                            {name}
                        </h3>
                        <span className='info'>
                            {preview_photos.length}
                            &nbsp;photos · Curated by&nbsp;
                            {firstName} {lastName}
                        </span>
                    </div>
                </div>
            );
        }
        if (!description && !urls) return null
        return (
            <React.Fragment>
                <div ref={this.collectionImageRef} className='selectAll'
                    style={inlineStyling}>
                    <div onClick={this.handleRouteCollection}
                        className={this.state.mouseIn ? 'container-collection containerHover':'container-collection'}>
                        <div className='container_1'>
                            <LazyImage ClickImage={null} srcImage={preview} 
                                altImage={description} style={emtyObject} 
                                classImage='collection-preview'
                                imageRef={null}
                            />
                            {/* <img onClick={null} ref={this.imageRef} 
                            alt={description} src={preview} /> */}
                        </div>
                        <div className='container_2'>
                            {preview_photos.map((preview, i) => {
                                if (preview_photos.length === 2 && i !== 0) {
                                    const inlineStyling = { width: '40%' }
                                    return (
                                        <React.Fragment key={uuid()} >
                                            <LazyImage
                                                ClickImage={null} 
                                                srcImage={preview.urls.regular} 
                                                altImage={description} style={emtyObject} 
                                                classImage='constainer_2-colletion-img'
                                                imageRef={null}
                                            />
                                            <div className="mTW0H" style={inlineStyling}></div>
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
                                if (i > 2 || i === 0) return null;
                                return (
                                    <LazyImage key={preview.id} 
                                        ClickImage={null} 
                                        srcImage={preview.urls.regular} 
                                        altImage={description} style={emtyObject} 
                                        classImage='constainer_2-colletion-img'
                                        imageRef={null}
                                    />
                                )
                            })}
                        </div>
                    </div>
                    <div className='userInfo'>
                        <h3 onClick={this.handleRouteCollection}
                            onMouseEnter={this.handleMouseEnter}
                            onMouseLeave={this.handleMouseLeave}
                            className='title'>
                            {name}
                        </h3>
                        <span className='info'>
                            {preview_photos.length}
                            &nbsp;photos · Curated by&nbsp;
                            {firstName} {lastName}
                        </span>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (getState) => {
    return {
        initialProfileData: getState.ProfileData
    }
};

export default connect(mapStateToProps, actions)(HomeCollection);