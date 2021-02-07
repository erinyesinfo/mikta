import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../../../../../Actions';
import './index.css';

/* ThirdParty-Library */
import LazyImage from '../../../../../ThirdParty-Library/Lazy Image/LazyImage';

class Following extends Component {
    handleUpdateUnsplashUser = user => this.props.handleUpdateUnsplashUser(user);
    render() {
        const inlineStylingLazyImage = {
            width: '40px', height: '40px', 
            marginRight: '10px', borderRadius: '50%'
        };
        if (!this.props.LogedIn || this.props.FollowingsData.length === 0) return null;
        const Following = this.props.FollowingsData.map(user => {
            return (
                <div className='follow-div' key={user.id}>
                    <div className='follow-innerDiv'>
                        <LazyImage ClickImage={null} 
                            srcImage={user.profile_image.large}
                            altImage={user.name}
                            style={inlineStylingLazyImage}
                            imageRef={null}
                        />
                    </div>
                    <Link to={`/@${user.username}`} className='follow-user'
                        onClick={() => this.handleUpdateUnsplashUser(user)}>
                        {user.name.length <= 20 ?
                            user.name
                        :user.name.substr(0, 20) + '...'}
                    </Link>
                </div>
            );
        });
        return (
            <div className='follow-divWrapper'>
                <div className='follow-innerDivWrapper'>
                    Following
                    {Following}
                </div>
            </div>
        );
    };
};

const mapStateToProps = getState => {
    if (getState.DBLoginStatus) {//login with db
        return {
            LogedIn: getState.DBLoginStatus,
            FollowingsData: getState.DBUserFollowingsData
        };
    } return {
        LogedIn: getState.LocalStorageLoginStatus,
        FollowingsData: getState.FollowingsData
    };
};
  
export default connect(mapStateToProps, actions)(Following);
