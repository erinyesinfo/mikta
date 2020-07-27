import React, { Component } from 'react';
import Cookies from 'universal-cookie';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../../Actions';
import { reduxForm, Field } from 'redux-form';
import M from '../logo.png';// logo
import Server from '../../../API/Server';
import './index.css';

/* helper */
import LazyImage from '../../ThirdParty-Library/Lazy Image/LazyImage';

/* LogedIn Modal */
import LogedInModal from './Modal';
/* LogedIn Modal Content */
import LogedInModalContent from './Modal/Content';

// icons
import { Loope, Twitter, In, Fb  } from './Icons';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      check: false,
      tools: false,
      mouseIn: false,
      properties: false,
      matches576: window.matchMedia("(max-width: 576px)").matches,
      showMenu: false,
      // login modal bool
      showLoginModal: false,
      history: '/',
    };
  };
  node = React.createRef();
  node2 = React.createRef();
  handleUserToolsRef = node => this.node = node;
  handleUserPropertiesRef = node2 => this.node2 = node2;
  componentDidUpdate() {
    if (this.props.DBLoginStatus && !document.cookie.includes("214082ee-34f0-4316-8881-a474d8c82d7b=a474d8c82d7b-8881-4316-34f0-214082ee")) {
      this.handleLogOut();
    }
  };
  UNSAFE_componentWillMount() {
    document.addEventListener('mousedown', this.handleCloseUserTools, false);
    document.addEventListener('mousedown', this.handleCloseUserProperties, false);
    
    window.addEventListener('resize', this.handler576);
    window.addEventListener('load', this.handler576);
    window.addEventListener('scroll', this.handler576);
  };
  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleCloseUserTools, false);
    document.removeEventListener('mousedown', this.handleCloseUserProperties, false);
    
    window.removeEventListener('resize', this.handler576);
    window.removeEventListener('load', this.handler576);
    window.removeEventListener('scroll', this.handler576);
  };
  handler576 = () => this.setState({matches576: window.innerWidth <= 576});
  renderInput = ({ input }) => {
    return (
      <input className='searchInp' {...input} autoComplete="off" 
        placeholder='Search free high-resolution photos' />
    );
  };
  onSubmit = formValues => {
    if (!formValues.title) return null;
    this.props.fetchUnsplashSearchedPhotos(true);
    this.props.handleSearchBool(true);
    this.props.fetchUnsplashSearchedPhotos(formValues.title, 1);
    return this.props.history.push(`/s/photos/${formValues.title}`);
  };
  handleShowLoginModal = () => {
    let element = document.querySelector("body");
    element.style.overflow = 'hidden';
    this.setState({ showLoginModal: true });
  };
  handleCloseLoginModal = () => {
    let element = document.querySelector("body");
    element.style.overflowY = 'auto';
    this.setState({ showLoginModal: false });
  };
  renderLoginModalContent = () => {
    return (
      <LogedInModalContent handleCloseLoginModal={this.handleCloseLoginModal}
        showLoginModal={this.state.showLoginModal} />
    );
  };
  renderLoginModal = () => {
    return (
      <LogedInModal handleCloseLoginModal={this.handleCloseLoginModal}
        showLoginModal={this.state.showLoginModal}
        renderLoginModalContent={this.renderLoginModalContent}
      />
    );
  };
  handleShowMenu = () => this.setState(st => ({ showMenu: !st.showMenu }));
  handleMouseEnter = () => this.setState({ mouseIn: true });
  handleMouseLeave = () => this.setState({ mouseIn: false });
  handleShowUserTools = () => this.setState({ tools: true });
  handleCloseUserTools = e => {
    if (!this.node) return null;
    if (typeof(e) !== "boolean" && (this.node.contains(e.target) || !this.state.tools)) {
      return null;
    }
    document.getElementById("tools-container").classList.add("tools-style");
    const timeOut = setTimeout(() => {
      this.setState({ tools: false });
      clearTimeout(timeOut);
    }, 400);
  };
  handleShowUserProperties = () => this.setState({ properties: true });
  handleCloseUserProperties = e => {
    if (!this.props.DBLoginStatus && !this.props.LocalStorageLoginStatus) return null;
    if (!this.node2) return null;
    if (typeof(e) !== "boolean" && (this.node2.contains(e.target) || !this.state.properties)) {
      return null;
    }
    document.getElementById("properties-container").classList.add("properties-style");
    const timeOut = setTimeout(() => {
      this.setState({ properties: false });
      clearTimeout(timeOut);
    }, 400);
  };
  handleCloseUserTools_Link = () => this.handleCloseUserTools(true);
  handleCloseUserProperties_Link = () => this.handleCloseUserProperties(true);
  handleLogOut = async () => {
    localStorage.clear();
    if (this.props.DBLoginStatus) {
      await this.props.handleDBloginStatus(false);
      const cookies = new Cookies();
      cookies.remove("214082ee-34f0-4316-8881-a474d8c82d7b");
      return new Promise(async (resolve, reject) => {
        const logedOut = await Server.post('/logout').catch(() => window.location.href = "/");
        if (logedOut.data === 'success') {
          resolve();
          return window.location.href = "/";
        } else {
          reject();
          return window.location.href = "/";
        }
      });
    }
    this.props.handleLocalStorageloginStatus(false);
  };
  render() {
    let { username, profileImage } = this.props.UserData;// default storage
    let emtyObject = {};
    return (
      <React.Fragment>
        <div className={this.state.matches576 ? 'headerWrapper':'headerHelper'}>
          <div className='container-search'>
            <div className='navsWrap'>
              <div className='logo-menu'>
                <Link className='link-a' to='/' draggable="false">
                  <LazyImage ClickImage={null} srcImage={M} draggable="false"
                    altImage='logo' style={emtyObject}
                    classImage='barner' imageRef={null}
                  />
                </Link>
              </div>
              <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="searchForm" >
                <Field name="title" component={this.renderInput} label="Enter Title" />
                <button className="searchBtn"><Loope /></button>
              </form>
              <div className='nav'>
                <span className='nav-explore'>
                  <Link className='link-a' to='/'>Explore</Link>
                </span>
                <span className='user-tools' onClick={this.handleShowUserTools} ref={this.handleUserToolsRef}
                  onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave}> 
                  <div className="tools">
                    <span className={(this.state.mouseIn || this.state.tools) ? "tools-span":""}></span>
                    <span className={(this.state.mouseIn || this.state.tools) ? "tools-span":""}></span>
                    <span className={(this.state.mouseIn || this.state.tools) ? "tools-span":""}></span>
                  </div>
                  {this.state.tools ? (
                      <div id="tools-container" className="user-tools-container">
                        <a rel="noopener noreferrer" target="_blank" href='https://erinyes.netlify.com'>About</a>
                        <a rel="noopener noreferrer" target="_blank" href='https://hoomer.netlify.com'>Blog</a>
                        <Link onClick={this.handleCloseUserTools_Link} to='/license'>License</Link>
                        <Link onClick={this.handleCloseUserTools_Link} to='/contact'>Contact</Link>
                        <hr className="tools-hr" />
                        <div className="social-info">
                          <Twitter />
                          <In />
                          <Fb />
                        </div>
                      </div>
                  ):null}
                </span>
                {(this.props.DBLoginStatus || this.props.LocalStorageLoginStatus) ? (
                  <div className="user-properties" onClick={this.handleShowUserProperties} ref={this.handleUserPropertiesRef}>
                    <LazyImage ClickImage={null} srcImage={profileImage} draggable={false}
                      altImage='avatare' style={emtyObject}
                      classImage='Avatar'
                      imageRef={null}
                    />
                    {this.state.properties ? (
                      <div id="properties-container" className="user-properties-container">
                        <Link to='/home' onClick={this.handleCloseUserProperties_Link}>View Profile</Link>
                        <Link to='/account' onClick={this.handleCloseUserProperties_Link}>Account settings</Link>
                        <hr className="propertie-hr" />
                        <span onClick={this.handleLogOut}>Logout @{username}</span>
                      </div>
                    ):null}
                  </div>
                ):(
                  <span onClick={this.handleShowLoginModal} className='nav-join'>
                    Join free
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
        {this.state.showLoginModal ? this.renderLoginModal():null}
      </React.Fragment>
    );
  };
};

const mapStateToProps = getState => {
  if (getState.DBLoginStatus) {//login with db
    return {
      DBLoginStatus: getState.DBLoginStatus,
      LocalStorageLoginStatus: getState.LocalStorageLoginStatus,
      UserData: getState.DBUserData
    };
  } return {
    DBLoginStatus: getState.DBLoginStatus,
    LocalStorageLoginStatus: getState.LocalStorageLoginStatus,
    UserData: getState.UserData
  };
};

export default connect(mapStateToProps, actions)(reduxForm ({form: 'searchForm'})(Header));
