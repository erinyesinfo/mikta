import React, { Component } from 'react';
import uuid from 'uuid/v4';
import { connect } from 'react-redux';
import * as actions from '../../../../../Actions';
import UserCard from './User';
import Welcom from './Welcom';
import NewPost from './User/NewPost';
import './index.css';

class UsersList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      delay: false,
      isRandomUsers: false,
    };
  };
  componentDidMount = () => {
    if (this.props.UnsplashRandomPhotos.length === 0) {
      this.props.fetchUnsplashRandomPhotos(5);
    }
  };
  randomUsers = () => {// get 10 random user and wait 7 sec after that
    if (this.state.delay) {
      return alert('Attention, you need to wait 7 sec before you click again on load more random users :)');
    }
    this.setState({ delay: true, isRandomUsers: true }, () => this.props.fetchUnsplashRandomPhotos());
    const timeOut = setTimeout(() => this.setState({ delay: false }, clearTimeout(timeOut)), 7000);
  };
  render() {
    const randomImages = this.props.UnsplashRandomPhotos.map((image, i) => {
      return (
        <UserCard key={image.id || Math.random()} image={image} i={i} 
        comment_Name={`comment_${uuid()}`} history={this.props.history} />
      );
    });
    return (
      <React.Fragment>
        <Welcom />
        <NewPost history={this.props.history} />
        <div className="image-list">{randomImages}</div>
        <div className='div-btnRandom'>
          {this.props.UnsplashRandomPhotos.length !== 0 ? (
            <button className='btnRandom' onClick={this.randomUsers}>
              {this.state.isRandomUsers ? 'Click for more!'
              :'Generate random users'}
            </button>
          ):null}
        </div>
      </React.Fragment>
    );
  };
};

const mapStateToProps = getState => {
  return { UnsplashRandomPhotos: getState.UnsplashRandomPhotos };
};

export default connect(mapStateToProps, actions)(UsersList);
