import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../../../../Actions';

/* helper */
import LazyImage from '../../../../ThirdParty-Library/Lazy Image/LazyImage';

class LikedImages extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mouseIn: false,
            spans: 40,
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
    handleProfileImg = e => e.stopPropagation();
    handleFetchUnsplashUser = e => {
        e.stopPropagation();
        this.props.handleUpdateUnsplashUser(this.props.img.user);
    };
    handleDownload = e => {
        e.stopPropagation();
        return this.props.handleDownload();
    };
    render() {
        const { handleShowImage, handleLike, handleShowCollection, img, dataURL } = this.props;
        const foundCollectionImage = this.props.CollectionsData.find(
            data => data.preview_photos.find(d => d.id === img.id)
        );
        // check if this is already liked
        const foundLikedImage = this.props.LikesData.find(data => data.id === img.id);
        let emtyObject = {};
        const inlineStyling = { gridRowEnd: `span ${this.state.spans}` };
        if (dataURL) {
            const { firstname, lastname, profileImage } = this.props.UserData;
            return (
                <div className='likes-userProfile-container' style={inlineStyling}>
                    <div onClick={handleShowImage}
                    onMouseEnter={this.handleMouseEnter} 
                    onMouseLeave={this.handleMouseLeave} 
                    className={this.state.mouseIn ? 'likes-userProfile bg-img': 'likes-userProfile'}>
                        {this.state.mouseIn ? 
                            <div className='mouseIn-up'>
                                <div>
                                    <button onClick={handleLike} 
                                    className={foundLikedImage ? 'likeHeart': 'heartBtn'} >
                                        <i className="fas fa-heart"></i>
                                    </button>
                                    <button onClick={handleShowCollection} className={foundCollectionImage ? 'plusBtn-success':'plusBtn'} >
                                        <span className='plusI'><i className="fas fa-plus"></i></span> Collect
                                    </button>
                                </div>
                            </div>
                        :null}
                        <img ref={this.handleRef} className='likes-tagImages' 
                        alt={img.description} src={img.urls.regular} />
                        {this.state.mouseIn ?
                            <div className='mouseIn-down'>
                                <div className='innerDiv'>
                                    <div className='innerDiv-profile'>
                                        <LazyImage ClickImage={this.handleProfileImg}
                                            srcImage={profileImage} 
                                            altImage={'profileImage'} style={emtyObject} 
                                            classImage='imageName' imageRef={null}
                                        />
                                        <Link to='/home' className='user-name'>
                                            {firstname} {lastname}
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        :null}
                    </div>
               </div>
            );
        } return (
            <div className='likes-userProfile-container' style={inlineStyling}>
                <div onClick={handleShowImage}
                onMouseEnter={this.handleMouseEnter} 
                onMouseLeave={this.handleMouseLeave} 
                className={this.state.mouseIn ? 'likes-userProfile bg-img': 'likes-userProfile'}>
                    {this.state.mouseIn ? 
                        <div className='mouseIn-up'>
                            <div>
                                <button onClick={handleLike} 
                                className={foundLikedImage ? 'likeHeart': 'heartBtn'} >
                                    <i className="fas fa-heart"></i>
                                </button>
                                <button onClick={handleShowCollection} className={foundCollectionImage ? 'plusBtn-success':'plusBtn'} >
                                    <span className='plusI'><i className="fas fa-plus"></i></span> Collect
                                </button>
                            </div>
                        </div>
                    :null}
                    <img ref={this.handleRef} className='likes-tagImages' 
                    alt={img.description} src={img.urls.regular} />
                    {this.state.mouseIn ?
                        <div className='mouseIn-down'>
                            <div className='innerDiv'>
                                <div className='innerDiv-profile'>
                                    <LazyImage ClickImage={this.handleProfileImg}
                                        srcImage={img.user.profile_image.large} 
                                        altImage={img.user.name} style={emtyObject} 
                                        classImage='imageName' imageRef={null}
                                    />
                                    <Link to={`/@${img.user.username}`} className='user-name'
                                        onClick={this.handleFetchUnsplashUser}>
                                        {img.user.name}
                                    </Link>
                                </div>
                                <button onClick={this.handleDownload} className='downloadBtn'>
                                    <span className='plusI'><i className="fas fa-arrow-down"></i></span>
                                </button>
                            </div>
                        </div>
                    :null}
                </div>
           </div>
        );
    };
};

const mapStateToProps = getState => {
    if (getState.DBLoginStatus) {//login with db
        return {
            UserData: getState.DBUserData,
            LikesData: getState.DBUserLikesData,
            CollectionsData: getState.DBUserCollectionsData
        };
    } return {
        UserData: getState.UserData,
        LikesData: getState.LikesData,
        CollectionsData: getState.CollectionsData,
    };
};

export default connect(mapStateToProps, actions)(LikedImages);
