import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../../../Actions';
import UsersPhotos from './Sub Pages/UsersPhotos';
import UsersLikes from './Sub Pages/UsersLikes';
import UsersCollection from './Sub Pages/UsersCollection';
import "./Username.css";

/* Header */
import Header from '../../Header/Header';

/* Message Modal */
import MessageModal from './Modal/MessageModal';
/* Message Modal */
import MessageModalContent from './Modal/ModalContent/MessageModalContent';

/* helper */
import LazyImage from "../../../ThirdParty-Library/Lazy Image/LazyImage";

class Username extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isMessageModal: false,
            showMessageModal: false,
        };
    };
    componentDidMount() {
        const userMatch = this.props.match.params.username.replace('_', ' ');
        const IsUser = Object.keys(this.props.user).length > 0;
        const { name } = IsUser ? this.props.user:false;
        if (!IsUser || userMatch !== name) {
            this.props.history.push('/');
        }
        if (this.props.images.length > 0) {
            this.props.fetchPhotos(true);
            this.props.isSearch(false);
        }
    };
    toggleMessageModal = () => {
        if (!this.props.LogIn) return alert('Attention, you have to be log in in order to collect photos!');
        var element = document.querySelector("body");
        element.style.overflow = 'hidden';
        return this.setState({ isMessageModal: true });
    };
    handleShowMessageModal = () => this.setState({ showMessageModal: true });
    handleCloseMessageModal = () => {
        var element = document.querySelector("body");
        element.style.overflow = 'auto';
        return this.setState({ showMessageModal: false, isMessageModal: false });
    };
    MessageModalContent = () => <MessageModalContent />;
    renderMessageModal = () => {
        return (
            <MessageModal handleShowMessageModal={this.handleShowMessageModal} 
            handleCloseMessageModal={this.handleCloseMessageModal}
            showMessageModal={this.state.showMessageModal} 
            isMessageModal={this.state.isMessageModal}
            MessageModalContent={this.MessageModalContent} />
        );
    };
    handleClickFollow = () => {
        if (!this.props.LogIn) return alert('Attention, you have to be log in in order to follow users!');
        const { user } = this.props;
        const isDuplicate = this.props.isFollowing.find(u => u.id === user.id);
        if (isDuplicate) return this.props.Following(user, false);
        return this.props.Following(user, true);
    };
    renderUserProfileInfo = () => {
        const { user } = this.props;
        const isDuplicate = this.props.isFollowing.find(u => u.id === user.id);
        let emtyObject = {};
        return (
            <div className='allUserInfo'>
                <LazyImage ClickImage={null}
                    srcImage={user.profile_image.large}
                    altImage={user.name} style={emtyObject}
                    classImage='allUserInfo-image'
                    imageRef={null}
                />
                <div className='userInfo'>
                    <div className='userInfo_1'>
                        <div className='userInfo_name'>
                            {user.name}
                        </div>
                        <div className='userInfo-btns'>
                            <button onClick={this.handleClickFollow} 
                                className={isDuplicate ? 'followingBtn followBtn':'followBtn'}>{isDuplicate ? (
                                <i className="fas fa-user-times"> Following</i>
                                ):(<i className="fas fa-user-plus"> Follow</i>)}
                            </button>
                            <button onClick={this.toggleMessageModal}
                                className='messageBtn'>
                                Message
                            </button>
                        </div>
                    </div>
                    {user.location || user.portfolio_url ? (
                        <div className='user-location-portfolio_url'>
                            {user.location ? (
                                <div className='user'>
                                    <i className="fas fa-map-marker-alt"></i> &nbsp;
                                    <a target='blank' href={`https://unsplash.com/s/photos/${user.location}`}>
                                        {user.location}&nbsp;&nbsp;
                                    </a>
                                </div>
                            ):null}
                            {user.portfolio_url ? (
                                <div className='user'> 
                                    <i className="fas fa-globe-americas"></i> &nbsp;
                                    <a target='blank' href={user.portfolio_url}>
                                        {user.portfolio_url}&nbsp;&nbsp;
                                    </a>
                                </div>
                            ) : null}
                        </div>
                    ): null}
                    {user.bio ? (
                        <div className='user-bio'>
                            <div>{user.bio}</div>
                        </div>
                    ): null}
                </div>
            </div>
        );
    };
    renderNavs = () => {
        const { user, match } = this.props;
        const path = match.params.username;
        const url = match.url;
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
                            <i className="fas fa-image"></i> &nbsp;Photos {user.total_photos}
                        </NavLink>
                    </div>
                    <div className='likes'>
                        <NavLink onClick={this.handleClickLikes} exact activeStyle={activeStyle}
                        className='navLink' to={`/@${path}/likes`}>
                            <i className="fas fa-heart"></i> &nbsp;Likes {user.total_likes}
                        </NavLink>
                    </div>
                    <div className='collections'>
                        <NavLink onClick={this.handleClickCollection}
                        exact activeStyle={activeStyle}
                        className='navLink' to={`/@${path}/collections`}>
                            <i className="fab fa-buffer"></i> &nbsp;Collections {user.total_collections}
                        </NavLink>
                    </div>
                </div>
                <hr className='hr-nav' />
                <div>
                    {url === `/@${path}` ? 
                        <UsersPhotos total_photos={user.total_photos}
                            history={this.props.history} />
                    :url === `/@${path}/likes` ? 
                        <UsersLikes total_likes={user.total_likes}
                            history={this.props.history} />
                    :url === `/@${path}/collections` ? 
                        <UsersCollection total_collections={user.total_collections}
                            history={this.props.history} />
                    :null}
                </div>
            </React.Fragment>
        );
    };
    render() {
        const { user } = this.props;
        if (Object.keys(user).length === 0) return null;
        return (
            <React.Fragment>
                <Header history={this.props.history} />
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
                {this.state.isMessageModal ? 
                    this.renderMessageModal()
                :null}
            </React.Fragment>
        )
    };
};

const mapStateToProps = (getState) => {
    return {
        user: getState.fetchUser,
        LogIn: getState.isLogIn,
        isFollowing: getState.isFollowing,
        // search
        images: getState.fetchPhotos
    };
};

export default connect(mapStateToProps, actions)(Username);