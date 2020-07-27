import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './Home.css';
import { connect } from 'react-redux';
import * as actions from '../../../../Actions';

/* Sub Pages */
import SharedPage from './Sub Pages/SharedPage';
import LikePage from './Sub Pages/LikePage';
import CollectionPage from './Sub Pages/CollectionPage';

/* Header */
import Header from '../../Header/Header';

/* LogOut Modal */
import LogOutModal from './Modal/LogOutModal';

/* helper */
import LazyImage from "../../../ThirdParty-Library/Lazy Image/LazyImage";

class Username extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLogOutModal: false,
            showLogOutModal: false,
        };
    };
    capitalizeFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1);
    componentDidMount() {
        if (this.props.LogIn === false) {
            return this.props.history.push('/')
        }
        if (this.props.UserPhotos.length > 0) {
            this.props.fetchUserPhotos(true);
        }
        if (this.props.UserLikes.length > 0) {
            this.props.fetchUserLikes(true);
        }
        if (this.props.UserCollection.length > 0) {
            this.props.fetchUserCollection(true);
        }
        if (this.props.fetchCollectionPhotos.length > 0) {
            this.props.fetchUserCollectionPhotosDetailes(true);
            this.props.fetchUserCollectionPhotos(true);
        }
        if (this.props.images.length > 0) {
            this.props.fetchPhotos(true);
            this.props.isSearch(false);
        }
        
    }
    onLogOut = () => {
        this.props.isLogIn(false);
        this.props.history.push('/')
    };
    editProfile = () => this.props.history.push('/account');
    toggleLogOutModal = () => {
        var element = document.querySelector("body");
        element.style.overflow = 'hidden';
        return this.setState({ isLogOutModal: true });
    };
    handleShowLogOutModal = () => this.setState({ showLogOutModal: true });
    handleCloseLogOutModal = () => {
        var element = document.querySelector("body");
        element.style.overflow = 'auto';
        return this.setState({ showLogOutModal: false, isLogOutModal: false });
    };
    handleContactUs = () => {
        this.props.history.push('/contact');
        return this.handleCloseLogOutModal();
    };
    renderLogOutModal = () => {
        return (
            <LogOutModal handleShowLogOutModal={this.handleShowLogOutModal}
            handleCloseLogOutModal={this.handleCloseLogOutModal}
            handleContactUs={this.handleContactUs}
            isLogOutModal={this.state.isLogOutModal}
            showLogOutModal={this.state.showLogOutModal}
            LogOut={this.onLogOut} />
        );
    };
    renderProfileInfo = () => {
        let emtyObject = {};
        const { firstName, lastName, location, portfolio, instagramUsername, twitterUsername, bio, profileImage } = this.props.initialValues;
        return (
            <div className='container-helper'>
                <LazyImage ClickImage={null} srcImage={profileImage} 
                    altImage='profile-img' style={emtyObject} 
                    classImage='imgProfile-home' imageRef={null}
                />
                {/* <img className='imgProfile-home' src={profileImage}
                alt='profile-img' /> */}
                <div className='profileInfo'>
                    <div className='outils-info'>
                        <h1 className='acountName'>{firstName} {lastName}</h1>
                        <button className='editProfile' onClick={this.editProfile}>
                            Edit Profile
                        </button>
                        <button className='more' onClick={this.toggleLogOutModal}>
                            ...
                        </button>
                    </div>
                    {location || portfolio ? (
                            <div className='userLocation-portfolio'>
                                {location ? (
                                    <div className='user'>
                                        <i className="fas fa-map-marker-alt"></i> &nbsp;&nbsp;
                                        <a target='blank' href={`https://unsplash.com/s/photos/${this.capitalizeFirstLetter(location)}`}>
                                            {/*initialValues.location*/}
                                            {location.length < 15 ?
                                            this.capitalizeFirstLetter(location) :
                                            location.substr(0, 15)}...
                                        </a>
                                    </div>
                                ) : null}
                                {portfolio ? (
                                    <div className='user'> 
                                        <i className="fas fa-globe-americas"></i> &nbsp;&nbsp;
                                        <a target='blank' href={portfolio}>
                                            {portfolio.length < 25 ?
                                            portfolio :
                                            portfolio.substr(0, 25)}...
                                        </a>
                                    </div>
                                ) : null}
                            </div>
                        ): null}
                    {instagramUsername || twitterUsername ? (
                            <div className='userinstagram-twitter'>
                                {instagramUsername ? (
                                    <div className='user'>
                                        Follow me on Instagram @
                                        {instagramUsername.length < 20 ? instagramUsername :
                                        instagramUsername.substr(0, 20)}...
                                    </div>
                                ) : null}
                                {twitterUsername ? (
                                    <div className='user'>
                                        Follow me on Twitter @
                                        {twitterUsername.length < 20 ? twitterUsername : twitterUsername.substr(0, 20)}...
                                    </div>
                                ) : null}
                            </div>
                        ): null}
                    <div className='outils-description'>
                        {bio ? (
                        <div>
                            {bio.length < 280 ? bio : bio.substr(0, 280)}...
                        </div>
                        ):(
                        <div>
                            Download free, beautiful high-quality photos curated by jig.
                        </div>
                        )}
                    </div>
                </div>
            </div>
        );
    };
    renderHomeNavs = () => {
        const url = this.props.match.url;
        let activeStyle = {
            color: 'black',
            boxShadow: 'inset 0 -2px #111',
            cursor: 'default',
            paddingBottom: '20px'
        }
        return (
            <React.Fragment>
                <div className='navWrapper'>
                    <div className='photos'>
                        <NavLink exact activeStyle={activeStyle}
                        className='navLink' to={`/home`}>
                            <i className="fas fa-image"></i> &nbsp;Shared {this.props.SharedData.length}
                        </NavLink>
                    </div>
                    <div className='likes'>
                        <NavLink exact activeStyle={activeStyle}
                        className='navLink' to={`/home/likes`}>
                            <i className="fas fa-heart"></i> &nbsp;Likes {this.props.LikesData.length}
                        </NavLink>
                    </div>
                    <div className='collections'>
                        <NavLink exact activeStyle={activeStyle}
                        className='navLink' to={`/home/collections`}>
                            <i className="fab fa-buffer"></i> &nbsp;Collections {this.props.Collection.length}
                        </NavLink>
                    </div>
                </div>
                <hr className='hr-nav' />
                <div>
                    {url === `/home` ? <SharedPage history={this.props.history} />
                        :url === `/home/likes` ? <LikePage history={this.props.history} />
                        :url === `/home/collections` ? <CollectionPage history={this.props.history} />
                    :null}
                </div>
            </React.Fragment>
        );
    };
    render() {
        return (
            <React.Fragment>
                <Header history={this.props.history} />
                <div className='container'>
                    <div className='container-child'>
                        {
                            /* render profile info */
                            this.renderProfileInfo()
                        }
                    </div>
                </div>
                {
                    /* render navs */
                    this.renderHomeNavs()
                }

                {/* Modals */}
                {this.state.isLogOutModal ? (
                    this.renderLogOutModal()
                ): null}
            </React.Fragment>
        );
    };
};

const mapStateToProps = getState => {
    return {
        initialValues: getState.ProfileData,
        LogIn: getState.isLogIn,
        /* SharedData */
        SharedData: getState.SharedData,
        /* Likes */
        LikesData: getState.LikesData,
        /* Collection */
        Collection: getState.Collection,
        /* Username */
        UserPhotos: getState.fetchUserPhotos,
        UserLikes: getState.fetchUserLikes,
        UserCollection: getState.fetchUserCollection,
        // collection detail page
        fetchCollectionPhotos: getState.fetchUserCollectionPhotos,
        // search
        images: getState.fetchPhotos
    };
};

export default connect(mapStateToProps, actions)(Username);
