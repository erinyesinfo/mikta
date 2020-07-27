import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../../Actions';
import { reduxForm, Field } from 'redux-form';
import './Header.css';
import M from '../../../IMG/mikta.svg';

/* helper */
import LazyImage from "../../ThirdParty-Library/Lazy Image/LazyImage";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      matches576: window.matchMedia("(max-width: 576px)").matches,
      showMenu: false
    };
  };
  UNSAFE_componentWillMount() {
    window.addEventListener('resize', this.handler576);
    window.addEventListener('load', this.handler576);
    window.addEventListener('scroll', this.handler576);
  };
  componentWillUnmount() {
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
    this.props.fetchPhotos(true);
    this.props.isSearch(true);
    this.props.fetchPhotos(formValues.title, 1);
    return this.props.history.push(`/s/photos/${formValues.title}`);
  };
  onClickLogIn = () => this.props.isLogIn(true);
  handleShowMenu = () => this.setState(st => ({ showMenu: !st.showMenu }));
  render() {
    let emtyObject = {};
    return (
      <div className={this.state.matches576 ? 'headerWrapper':'headerHelper'}>
        <div className='container-search'>
          <div className='logo-menu'>
            <div>
              <Link className='link-a' to='/'>
                <LazyImage ClickImage={null} srcImage={M} 
                  altImage={'logo'} style={emtyObject}
                  classImage='barner'
                  imageRef={null}
                />
                {/* <img className='barner' src={M} alt='logo' /> */}
              </Link>
            </div>
            {this.state.matches576 ?
              <button onClick={this.handleShowMenu} type='button' className='nav-menu'>
                <i className="fas fa-bars"></i>
              </button>
            :null}
          </div>
          {!this.state.matches576 || this.state.showMenu ? (
              <div className='navsWrap'>
                <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="searchForm" >
                  <Field name="title" component={this.renderInput} label="Enter Title" />
                  <button className="searchBtn">Submit</button>
                </form>
                <div className='nav'>
                  <span className='nav-explore'>
                    <Link className='link-a' to='/'>Explore</Link>
                  </span>
                  {this.props.LogIn ? (
                    <span className='nav-home'> 
                      <Link className='link-a' to='/home'>Home</Link>
                    </span>
                  ): (
                  <span onClick={this.onClickLogIn} className='nav-login'>
                    <Link className='link-a' to='/'>
                      Log in
                    </Link>
                  </span>
                  )}
                </div>
              </div>
            ):null}
        </div>
      </div>
    );
  };
};

const mapStateToProps = getState => {
  return {
    LogIn: getState.isLogIn,
    // search
    images: getState.fetchPhotos
  };
};

export default connect(mapStateToProps, actions)(reduxForm ({form: 'searchForm'})(Header));
