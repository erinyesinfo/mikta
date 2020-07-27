import React, { Component } from 'react'
import { connect } from 'react-redux';
import * as actions from '../../../../../Actions';
import uuid from 'uuid/v4';
import UserCard from './User/UserCard';
import UnsplashTerm from './UnsplashTerm/UnsplashTerm';
import Welcom from './Welcom/Welcom';
import NewPost from './User/NewPost/NewPost';
import './UsersList.css';

class UsersList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      delay: false,
      isRandomUsers: false,
    };
  };
  randomUsers = () => { // get 10 random user and wait 7 sec after that
    if (this.state.delay === false) {
      this.setState({ delay: true, isRandomUsers: true });
      return setTimeout(() => this.props.fetchRandomPhotos(), 50);
    }

    alert('Attention, you need to wait 7 sec before you click again on load more random users :)');
    setTimeout(() => this.setState({ delay: false }), 7000);
  };
  render() {
    const randomImages = this.props.randomImages.map((image, i) => {
      return (
        <UserCard key={image.id || Math.random()} image={image} i={i} 
        comment_Name={`comment_${uuid()}`} history={this.props.history} />
      );
    });
    return (
      <React.Fragment>
        <UnsplashTerm />
        <Welcom />
        <NewPost history={this.props.history} />
        <div className="image-list">{randomImages}</div>
        <div className='div-btnRandom'>
          <button className='btnRandom' onClick={this.randomUsers}>
            {this.state.isRandomUsers ? 'Click for more!'
            :'Generate random users'}
          </button>
        </div>
      </React.Fragment>
    );
  };
};

const mapStateToProps = getState => {
  return { randomImages: getState.fetchRandomPhotos }
};

export default connect(mapStateToProps, actions)(UsersList);
