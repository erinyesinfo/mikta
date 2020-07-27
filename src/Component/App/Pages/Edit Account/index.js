import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import * as actions from '../../../../Actions';
import AccountSettings from './Account settings';
import './index.css';

class Account extends Component {
    constructor(props) {
        super(props);
        this.state = {
            matches768: window.matchMedia("(max-width: 768px)").matches,
        };
    };
    componentDidMount() {
        if (!this.props.DBLoginStatus && !this.props.LocalStorageLoginStatus) return this.props.history.push('/');
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
    };
    UNSAFE_componentWillMount() {
        window.addEventListener('resize', this.handler768);
        window.addEventListener('load', this.handler768);
        window.addEventListener('scroll', this.handler768);
    };
    componentWillUnmount() {
        window.removeEventListener('resize', this.handler768);
        window.removeEventListener('load', this.handler768);
        window.removeEventListener('scroll', this.handler768);
    };
    handler768 = () => this.setState({matches768: window.innerWidth <= 768});
    renderNavs = () => {
        const { url } = this.props.match;
        if (this.props.DBLoginStatus) {
            return (
                <div className="account-navs">
                    {url === "/account" ? (
                        <span className={url === "/account" ? "account-nav nav-active":"account-nav "}>Edit profile</span>
                    ):(
                        <Link className={url === "/account" ? "account-nav nav-active":"account-nav "} to="/account">Edit profile</Link>
                    )}
                    {url === "/account/password" ? (
                        <span className={url === "/account/password" ? "account-nav nav-active":"account-nav "}>Change password</span>
                    ):(
                        <Link className={url === "/account/password" ? "account-nav nav-active":"account-nav "} to="/account/password">Change password</Link>
                    )}
                    {url === "/account/close" ? (
                        <span className={url === "/account/close" ? "account-nav nav-active":"account-nav "}>Close account</span>
                    ):(
                        <Link className={url === "/account/close" ? "account-nav nav-active":"account-nav "} to="/account/close">Close account</Link>
                    )}
                </div>
            );
        } else {
            return <span>Edit profile</span>
        }
    };
    render() {
        return (
            <div className='container-account'>
                <div className='accountSettings'>
                    <h2>Account settings</h2>
                    {this.renderNavs()}
                    {this.state.matches768 ? <hr className='account-hr' />:null}
                </div>
                <AccountSettings history={this.props.history} url={this.props.match.url} />
            </div>
        );
    };
};

const mapStateToProps = getState => {
    if (getState.DBLoginStatus) {//login with db
        return {
            DBLoginStatus: getState.DBLoginStatus,
            LocalStorageLoginStatus: getState.LocalStorageLoginStatus,
            /* Username */
            UnsplashUserPhotos: getState.UnsplashUserPhotos,
            UnsplashUserLikes: getState.UnsplashUserLikes,
            UnsplashUserCollections: getState.UnsplashUserCollections,
            UnsplashCollectionPhotos: getState.UnsplashCollectionPhotos,
        };
    } return {
        DBLoginStatus: getState.DBLoginStatus,
        LocalStorageLoginStatus: getState.LocalStorageLoginStatus,
        /* Username */
        UnsplashUserPhotos: getState.UnsplashUserPhotos,
        UnsplashUserLikes: getState.UnsplashUserLikes,
        UnsplashUserCollections: getState.UnsplashUserCollections,
        UnsplashCollectionPhotos: getState.UnsplashCollectionPhotos,
    };
};

export default connect(mapStateToProps, actions)(Account);
