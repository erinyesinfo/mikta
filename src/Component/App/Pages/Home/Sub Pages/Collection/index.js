import React, { Component } from 'react';
import { v4 as uuid } from 'uuid';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../../../../../Actions';
import './index.css';

/* helper */
import LazyImage from '../../../../../ThirdParty-Library/Lazy Image/LazyImage';

class HomeCollection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            spans: 40,
            mouseIn: false
        };
    };
    node = React.createRef();
    handleRef = node => this.node = node;
    UNSAFE_componentWillMount() {
        window.addEventListener('resize', this.setSpans);
        window.addEventListener('load', this.setSpans);
        window.addEventListener('scroll', this.setSpans);
    };
    componentWillUnmount() {
        window.removeEventListener('resize', this.setSpans);
        window.removeEventListener('load', this.setSpans);
        window.removeEventListener('scroll', this.setSpans);
    };
    setSpans = () => {
        const height = !this.node ? 0:this.node.clientHeight;
        const spans = Math.ceil(height / 10);
        this.setState({ spans });
    };
    handleMouseEnter = () => this.setState({ mouseIn: true });
    handleMouseLeave = () => this.setState({ mouseIn: false });
    render() {
        let emtyObject = {};
        const { firstname, lastname  } = this.props.UserData;
        const { description, urls } = this.props.image.img;
        const { id, preview, preview_photos, name, ib } = this.props.image;
        const inlineStyling = { gridRowEnd: `span ${this.state.spans}` };
        if (!preview) {
            return (
                <div ref={this.handleRef} className='selectAll'
                    style={inlineStyling}>
                    <Link className='hNzsd' to={`/collections/${id}/${name}/${ib}`}>
                        <div className="_2zwgf">
                            <div className="_2vGrb"></div>
                            <div className="_2gO6E">
                                <div className="mTW0H"></div>
                                <div className="mTW0H"></div>
                            </div>
                        </div>
                    </Link>
                    <div className='userInfo'>
                        <h3 className='title'>
                            <Link to={`/collections/${id}/${name}/${ib}`}>{name}</Link>
                        </h3>
                        <span className='info'>
                            {preview_photos.length}
                            &nbsp;photos · Curated by&nbsp;
                            {firstname} {lastname}
                        </span>
                    </div>
                </div>
            );
        }
        if (!description && !urls) return null;
        return (
            <React.Fragment>
                <div ref={this.handleRef} className='selectAll'
                    style={inlineStyling}>
                    <Link to={`/collections/${id}/${name}/${ib}`}
                        className={this.state.mouseIn ? 'container-collection containerHover':'container-collection'}>
                        <div className='container_1'>
                            <LazyImage ClickImage={null} srcImage={preview} 
                                altImage={description} style={emtyObject} 
                                classImage='collection-preview'
                                imageRef={null}
                            />
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
                    </Link>
                    <div className='userInfo'>
                        <h3 onMouseEnter={this.handleMouseEnter}
                            onMouseLeave={this.handleMouseLeave}
                            className='title'>
                            <Link to={`/collections/${id}/${name}/${ib}`}>{name}</Link>
                        </h3>
                        <span className='info'>
                            {preview_photos.length}
                            &nbsp;photos · Curated by&nbsp;
                            {firstname} {lastname}
                        </span>
                    </div>
                </div>
            </React.Fragment>
        );
    };
};

const mapStateToProps = getState => {
    if (getState.DBLoginStatus) {//login with db
        return { UserData: getState.DBUserData };
    } return { UserData: getState.UserData };
};

export default connect(mapStateToProps, actions)(HomeCollection);
