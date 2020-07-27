import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../../../Actions';
import UsersPhotos from './Sub Pages/UsersPhotos';
import UsersLikes from './Sub Pages/UsersLikes';
import UsersCollection from './Sub Pages/UsersCollection';
import './index.css';

/* Message Modal */
import MessageModal from './Modal';
/* Message Modal */
import MessageModalContent from './Modal/Content';

/* helper */
import LazyImage from '../../../ThirdParty-Library/Lazy Image/LazyImage';

class Username extends Component {
    constructor(props) {
        super(props);
        this.state = { showMessageModal: false };
    };
    componentDidMount() {
        const username_params = this.props.match.params.username;
        if (Object.keys(this.props.UnsplashUser).length === 0) {
            this.props.fetchUnsplashUser(username_params);
        }
        if (this.props.UnsplashSearchedPhotos.length > 0) {
            this.props.fetchUnsplashSearchedPhotos(true);
            this.props.handleIsSearch(false);
        }
    };
    componentDidUpdate() {
        const username_params = this.props.match.params.username;
        const { username } = Object.keys(this.props.UnsplashUser).length > 0 ? this.props.UnsplashUser:false;
        if (username_params !== username) return this.props.fetchUnsplashUser(username_params);
    };
    handleShowMessageModal = () => {
        if (!this.props.DBLoginStatus && !this.props.LocalStorageLoginStatus) {
            return alert('Attention, you have to be log in in order to collect photos!');
        }
        let element = document.querySelector('body');
        element.style.overflow = 'hidden';
        return this.setState({ showMessageModal: true });
    };
    handleCloseMessageModal = () => {
        let element = document.querySelector('body');
        element.style.overflow = 'auto';
        return this.setState({ showMessageModal: false });
    };
    MessageModalContent = () => <MessageModalContent />;
    renderMessageModal = () => {
        return (
            <MessageModal handleCloseMessageModal={this.handleCloseMessageModal}
            showMessageModal={this.state.showMessageModal}
            MessageModalContent={this.MessageModalContent} />
        );
    };
    handleClickFollow = () => {
        if (!this.props.DBLoginStatus && !this.props.LocalStorageLoginStatus) {
            return alert('Attention, you have to be log in in order to follow users!');
        }
        const { UnsplashUser } = this.props;
        const isDuplicate = this.props.FollowingData.find(user => user.id === UnsplashUser.id);
        if (this.props.DBLoginStatus) {//db
            if (isDuplicate) return this.props.handleUpdataFollowingDataDB(UnsplashUser, false);
            return this.props.handleUpdataFollowingDataDB(UnsplashUser, true);
        }
        if (isDuplicate) return this.props.handleUpdataFollowingData(UnsplashUser, false);
        return this.props.handleUpdataFollowingData(UnsplashUser, true);
    };
    renderUserProfileInfo = () => {
        const { id, name, location, portfolio_url, bio, profile_image } = this.props.UnsplashUser;
        const isDuplicate = this.props.FollowingData.find(data => data.id === id);
        let emtyObject = {};
        return (
            <div className='allUserInfo'>
                <LazyImage ClickImage={null}
                    srcImage={profile_image.large}
                    altImage={name} style={emtyObject}
                    classImage='allUserInfo-image'
                    imageRef={null}
                />
                <div className='userInfo'>
                    <div className='userInfo_1'>
                        <div className='userInfo_name'>
                            {name}
                        </div>
                        <div className='userInfo-btns'>
                            <button onClick={this.handleClickFollow} 
                                className={isDuplicate ? 'followingBtn followBtn':'followBtn'}>{isDuplicate ? (
                                <i className="fas fa-user-times"> Following</i>
                                ):(<i className="fas fa-user-plus"> Follow</i>)}
                            </button>
                            <button onClick={this.handleShowMessageModal}
                                className='messageBtn'>
                                Message
                            </button>
                        </div>
                    </div>
                    {location || portfolio_url ? (
                        <div className='user-location-portfolio_url'>
                            {location ? (
                                    <div className='user'>
                                        <i className="fas fa-map-marker-alt"></i> &nbsp;
                                        <a target='blank' href={`https://unsplash.com/s/photos/${location}`}>
                                            {location}&nbsp;&nbsp;
                                        </a>
                                    </div>
                            ):null}
                            {portfolio_url ? (
                                        <div className='user'> 
                                            <i className="fas fa-globe-americas"></i> &nbsp;
                                            <a target='blank' href={portfolio_url}>
                                                {portfolio_url}&nbsp;&nbsp;
                                            </a>
                                        </div>
                            ) : null}
                        </div>
                    ): null}
                    {bio ? (
                        <div className='user-bio'>
                            <div>{bio}</div>
                        </div>
                    ): null}
                </div>
            </div>
        );
    };
    renderNavs = () => {
        const { total_photos, total_likes, total_collections } = this.props.UnsplashUser;
        const path = this.props.match.params.username;
        const url = this.props.match.url;
        const activeStyle = {
            color: 'black',
            boxShadow: 'inset 0 -2px #111',
            cursor: 'default',
            paddingBottom: '20px'
        };
        return (
            <React.Fragment>
                <div className='navWrapper'>
                    <div className='photos'>
                        <NavLink onClick={this.handleClickPhotos} exact activeStyle={activeStyle}
                        className='navLink' to={`/@${path}`}>
                            <i className="fas fa-image"></i> &nbsp;Photos {total_photos}
                        </NavLink>
                    </div>
                    <div className='likes'>
                        <NavLink onClick={this.handleClickLikes} exact activeStyle={activeStyle}
                        className='navLink' to={`/@${path}/likes`}>
                            <i className="fas fa-heart"></i> &nbsp;Likes {total_likes}
                        </NavLink>
                    </div>
                    <div className='collections'>
                        <NavLink onClick={this.handleClickCollection}
                        exact activeStyle={activeStyle}
                        className='navLink' to={`/@${path}/collections`}>
                            <i className="fab fa-buffer"></i> &nbsp;Collections {total_collections}
                        </NavLink>
                    </div>
                </div>
                <hr className='hr-nav' />
                <div>
                    {url === `/@${path}` ? 
                        <UsersPhotos total_photos={total_photos} 
                            history={this.props.history} match={this.props.match} />
                    :url === `/@${path}/likes` ? 
                        <UsersLikes total_likes={total_likes} 
                            history={this.props.history} match={this.props.match} />
                    :url === `/@${path}/collections` ? 
                        <UsersCollection total_collections={total_collections}
                            history={this.props.history} match={this.props.match} />
                    :null}
                </div>
            </React.Fragment>
        );
    };
    render() {
        if (Object.keys(this.props.UnsplashUser).length === 0) return null;
        return (
            <React.Fragment>
                <div className='usernameWrapper'>
                    <div className='informationWrapper'>
                    {
                        /* render user info */
                        this.renderUserProfileInfo()
                    }
                    </div>
                    {
                        /* render navs */
                        this.renderNavs()
                    }
                </div>
                {this.state.showMessageModal ? 
                    this.renderMessageModal()
                :null}
            </React.Fragment>
        );
    };
};

const mapStateToProps = getState => {
    if (getState.DBLoginStatus) {//login with db
        return {
            DBLoginStatus: getState.DBLoginStatus,
            LocalStorageLoginStatus: getState.LocalStorageLoginStatus,
            FollowingData: getState.DBUserFollowingData,
            // search
            UnsplashSearchedPhotos: getState.UnsplashSearchedPhotos,
            UnsplashUser: getState.UnsplashUser
        };
    } return {
        DBLoginStatus: getState.DBLoginStatus,
        LocalStorageLoginStatus: getState.LocalStorageLoginStatus,
        FollowingData: getState.FollowingData,
        // search
        UnsplashSearchedPhotos: getState.UnsplashSearchedPhotos,
        UnsplashUser: getState.UnsplashUser
    };
};

export default connect(mapStateToProps, actions)(Username);
