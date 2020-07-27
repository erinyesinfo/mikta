import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../../../../Actions';
import './Following.css';

/* ThirdParty-Library */
import LazyImage from '../../../../../ThirdParty-Library/Lazy Image/LazyImage';

class Following extends Component {
    handleUserRoute = user => {
        this.props.fetchUser(user);
        const replaceNames = user.name.replace(/[ ]/g, '_');
        this.props.history.push(`/@${replaceNames}`);
    };
    render() {
        const inlineStylingLazyImage = {
            width: '40px', height: '40px', 
            marginRight: '10px', borderRadius: '50%'
        };
        if (!this.props.LogIn) return null;
        const Following = this.props.isFollowing.map(user => {
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
                    <span onClick={() => this.handleUserRoute(user)} className='follow-user'>
                        {user.name.length <= 20 ?
                            user.name
                        :user.name.substr(0, 20) + '...'}
                    </span>
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
    return {
        isFollowing: getState.isFollowing,
        LogIn: getState.isLogIn,
    };
};
  
export default connect(mapStateToProps, actions)(Following);
