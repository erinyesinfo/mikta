import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../../../Actions';

/* helper */
import LazyImage from "../../../../ThirdParty-Library/Lazy Image/LazyImage";

class LikedImages extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mouseIn: false,
            spans: 40,
        };
        this.imageRef = React.createRef();
    };
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
        const height = !this.imageRef.current ? 0:this.imageRef.current.clientHeight;
        const spans = Math.ceil(height / 10);
        this.setState({ spans });
    };
    handleMouseEnter = () => this.setState({ mouseIn: true });
    handleMouseLeave = () => this.setState({ mouseIn: false });
    handleProfileImg = e => e.stopPropagation();
    handleClickRoute = e => {
        e.stopPropagation();
        this.props.fetchUser(this.props.img.user);
        const replaceNames = this.props.img.user.name.replace(/[ ]/g, '_');
        this.props.history.push(`/@${replaceNames}`);
    };
    handleDownload = e => {
        e.stopPropagation();
        return this.props.handleDownload();
    };
    render() {
        const { toggleImage, handleLike, toggleCollection, img, User, dataURL } = this.props;
        const foundCollectionImage = this.props.Collection.find(
            data => data.preview_photos.find(d => d.id === img.id)
        );
        // check if this is already liked
        const foundLikedImage = this.props.LikesData.find(data => data.id === img.id);
        let emtyObject = {};
        const inlineStyling = { gridRowEnd: `span ${this.state.spans}` };
        
        if (dataURL) {
            const { profileImage, firstName, lastName } = this.props.ProfileData;
            return (
                <div className='likes-userProfile-container' style={inlineStyling}>
                    <div onClick={toggleImage}
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
                                    <button onClick={toggleCollection} className={foundCollectionImage ? 'plusBtn-success':'plusBtn'} >
                                        <span className='plusI'><i className="fas fa-plus"></i></span> Collect
                                    </button>
                                </div>
                            </div>
                        :null}
                        {/* <LazyImage ClickImage={null}
                                srcImage={img.urls.regular} 
                                altImage={img.description} 
                                style={emtyObject}
                                classImage='likes-tagImages' 
                                imageRef={this.imageRef}
                            />
                        */}
                        <img ref={this.imageRef} className='likes-tagImages' 
                        alt={img.description} src={img.urls.regular} />
                        {this.state.mouseIn ?
                            <div className={User ? 'mouseIn-down-user':'mouseIn-down'}>
                                <div className={User ? '':'innerDiv'}>
                                    {User ? null:(
                                        <div className='innerDiv-profile'>
                                            <LazyImage ClickImage={this.handleProfileImg}
                                                srcImage={profileImage} 
                                                altImage={'profileImage'} style={emtyObject} 
                                                classImage='imageName' imageRef={null}
                                            />
                                            {/* <img onClick={this.handleProfileImg} className='imageName' 
                                                src={img.user.profile_image.large} alt={img.user.name} /> */}
                                            <span onClick={this.handleProfileImg} className='spane-name'>
                                                {firstName} {lastName}</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        :null}
                    </div>
               </div>
            );
        } return (
            <div className='likes-userProfile-container' style={inlineStyling}>
                <div onClick={toggleImage}
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
                                <button onClick={toggleCollection} className={foundCollectionImage ? 'plusBtn-success':'plusBtn'} >
                                    <span className='plusI'><i className="fas fa-plus"></i></span> Collect
                                </button>
                            </div>
                        </div>
                    :null}
                    {/* <LazyImage ClickImage={null}
                            srcImage={img.urls.regular} 
                            altImage={img.description} 
                            style={emtyObject}
                            classImage='likes-tagImages' 
                            imageRef={this.imageRef}
                        />
                    */}
                    <img ref={this.imageRef} className='likes-tagImages' 
                    alt={img.description} src={img.urls.regular} />
                    {this.state.mouseIn ?
                        <div className={User ? 'mouseIn-down-user':'mouseIn-down'}>
                            <div className={User ? '':'innerDiv'}>
                                {User ? null:(
                                    <div className='innerDiv-profile'>
                                        <LazyImage ClickImage={this.handleProfileImg}
                                            srcImage={img.user.profile_image.large} 
                                            altImage={img.user.name} style={emtyObject} 
                                            classImage='imageName' imageRef={null}
                                        />
                                        {/* <img onClick={this.handleProfileImg} className='imageName' 
                                            src={img.user.profile_image.large} alt={img.user.name} /> */}
                                        <span onClick={this.handleClickRoute} className='spane-name'>
                                            {img.user.name}</span>
                                    </div>
                                )}
                                <button onClick={this.handleDownload} className='heartBtn'>
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
    return {
        ProfileData: getState.ProfileData,
        Collection: getState.Collection,
        LikesData: getState.LikesData,
    };
};


export default connect(mapStateToProps, actions)(LikedImages);
