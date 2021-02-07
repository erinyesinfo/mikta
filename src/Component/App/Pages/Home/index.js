import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../../../Actions';
import './index.css';

/* Sub Pages */
import SharedPage from './Sub Pages/SharedPage';
import LikePage from './Sub Pages/LikePage';
import CollectionPage from './Sub Pages/CollectionPage';

/* helper */
import LazyImage from '../../../ThirdParty-Library/Lazy Image/LazyImage';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = { showLogOutModal: false };
    };
    capitalizeFirstLetter = string => string.charAt(0).toUpperCase() + string.slice(1);
    componentDidMount() {
        if (!this.props.DBLoginStatus && !this.props.LocalStorageLoginStatus) {
            return this.props.history.push('/')
        }
        if (this.props.UnsplashUserPhotos.length > 0) {
            this.props.fetchUnsplashUserPhotos(true);
        }
        if (this.props.UnsplashUserLikes.length > 0) {
            this.props.fetchUnsplashUserLikes(true);
        }
        if (this.props.UnsplashUserCollections.length > 0) {
            this.props.fetchUnsplashUserCollections(true);
        }
        if (this.props.UnsplashCollectionPhotos.length > 0) {
            this.props.fetchUnsplashUserCollectionPhotos(true);
            this.props.handleClearCollectionPhotos();
        }
        if (this.props.UnsplashSearchedPhotos.length > 0) {
            this.props.fetchUnsplashSearchedPhotos(true);
            this.props.handleIsSearchUnsplashPhotos(false);
        }
    };
    renderProfileInfo = () => {
        let emtyObject = {};
        const { firstname, lastname, location, portfolio, instagramUsername, twitterUsername, bio, interests, profileImage } = this.props.UserData;
        return (
            <div className='container-helper'>
                <LazyImage srcImage={profileImage} draggable={false}
                    altImage='profile-img' style={emtyObject} 
                    classImage='imgProfile-home' imageRef={null}
                />
                <div className='profileInfo'>
                    <div className='outils-info'>
                        <h1 className='acountName'>{firstname} {lastname}</h1>
                        <Link className='editProfile' to="/account">
                            Edit Profile
                        </Link>
                    </div>
                    {location || portfolio ? (
                            <div className={!(instagramUsername || twitterUsername) ? 'userLocation-portfolio-less':'userLocation-portfolio'}>
                                {location ? (
                                    <a className='user' rel="noopener noreferrer" target='_blank' href={`https://unsplash.com/s/photos/${this.capitalizeFirstLetter(location)}`}>
                                        <i className="fas fa-map-marker-alt"></i><span> &nbsp;&nbsp;</span>
                                        {location.length < 22 ?
                                            this.capitalizeFirstLetter(location):
                                        location.substr(0, 22)+"..."}
                                    </a>
                                ) : null}
                                {portfolio ? (
                                    <a className='user' rel="noopener noreferrer" target='_blank' href={'https://'+portfolio}> 
                                        <i className="fas fa-globe-americas"></i><span> &nbsp;&nbsp;</span>
                                        {portfolio.length < 25 ? portfolio:portfolio.substr(0, 25)+"..."}
                                    </a>
                                ) : null}
                            </div>
                        ): null}
                    {instagramUsername || twitterUsername ? (
                            <div className={!(location || portfolio) ? 'userinstagram-twitter-extra':'userinstagram-twitter'}>
                                {instagramUsername ? (
                                    <div className='user'>
                                        <span>Follow me on Instagram @</span>
                                        {instagramUsername.length < 20 ? instagramUsername:instagramUsername.substr(0, 20)+"..."}
                                    </div>
                                ) : null}
                                {twitterUsername ? (
                                    <div className='user'>
                                        <span>Follow me on Twitter @</span>
                                        {twitterUsername.length < 20 ? twitterUsername:twitterUsername.substr(0, 20)+"..."}
                                    </div>
                                ) : null}
                            </div>
                        ): null}
                    <div className='outils-description'>
                        {bio ? (
                        <div>
                            {bio}
                        </div>
                        ):(
                        <div>
                            Download free, beautiful high-quality photos curated by {firstname}.
                        </div>
                        )}
                    </div>
                    <div className='outils-interests'>
                        {interests ? (
                        <div className='outils-interests-container'>
                            <div>Interests</div>
                            <div>
                            {interests.map(interest => {
                                if (interest.length > 18) return <div key={interest}><Link to={`/s/photos/${interest}`}>{interest.substr(0, 18)}...</Link></div>
                                return <div key={interest}><Link to={`/s/photos/${interest}`}>{interest}</Link></div>
                            })}
                            </div>
                        </div>
                        ):(null)}
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
        };
        return (
            <React.Fragment>
                <div className='navWrapper'>
                    <div className='photos'>
                        <NavLink exact activeStyle={activeStyle}
                        className='navLink' to={`/home`}>
                            <i className="fas fa-image"></i> &nbsp;Shared&nbsp;
                            {this.props.SharedData.length || this.props.NavsLength.shared || null}
                        </NavLink>
                    </div>
                    <div className='likes'>
                        <NavLink exact activeStyle={activeStyle}
                        className='navLink' to={`/home/likes`}>
                            <i className="fas fa-heart"></i> &nbsp;Likes&nbsp;
                            {this.props.LikesData.length || this.props.NavsLength.likes || null}
                        </NavLink>
                    </div>
                    <div className='collections'>
                        <NavLink exact activeStyle={activeStyle}
                        className='navLink' to={`/home/collections`}>
                            <i className="fab fa-buffer"></i> &nbsp;Collections&nbsp;
                            {this.props.CollectionsData.length || this.props.NavsLength.collections || null}
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
                {this.state.showLogOutModal ? (
                    this.renderLogOutModal()
                ): null}
            </React.Fragment>
        );
    };
};

const mapStateToProps = getState => {
    if (getState.DBLoginStatus) {//login with db
        return {
            DBLoginStatus: getState.DBLoginStatus,//db login
            LocalStorageLoginStatus: getState.LocalStorageLoginStatus,//localstorage login
            UserData: getState.DBUserData,// db user data
            SharedData: getState.DBUserSharedData,
            LikesData: getState.DBUserLikesData,
            CollectionsData: getState.DBUserCollectionsData,
            NavsLength: getState.NavsLength,
            /* Username */
            UnsplashUserPhotos: getState.UnsplashUserPhotos,
            UnsplashUserLikes: getState.UnsplashUserLikes,
            UnsplashUserCollections: getState.UnsplashUserCollections,
            UnsplashCollectionPhotos: getState.UnsplashCollectionPhotos,
            /* Search */
            UnsplashSearchedPhotos: getState.UnsplashSearchedPhotos
        };
    } return {
        DBLoginStatus: getState.DBLoginStatus,//db login
        LocalStorageLoginStatus: getState.LocalStorageLoginStatus,//localstorage login
        UserData: getState.UserData,//localStorage user data
        SharedData: getState.SharedData,
        LikesData: getState.LikesData,
        CollectionsData: getState.CollectionsData,
        NavsLength: getState.NavsLength,
        /* Username */
        UnsplashUserPhotos: getState.UnsplashUserPhotos,
        UnsplashUserLikes: getState.UnsplashUserLikes,
        UnsplashUserCollections: getState.UnsplashUserCollections,
        UnsplashCollectionPhotos: getState.UnsplashCollectionPhotos,
        /* Search */
        UnsplashSearchedPhotos: getState.UnsplashSearchedPhotos
    };
};

export default connect(mapStateToProps, actions)(Home);
