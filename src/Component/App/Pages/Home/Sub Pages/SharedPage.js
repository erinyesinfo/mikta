import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../../../Actions';
import HomeShared from './Shared';
import Following from './Following';

class SharedPage extends Component {
    render() {
        if (this.props.SharedData.length === 0) {
            return <div className='likesContent'>No shared photos :(</div>;
        }
        const SharedData = this.props.SharedData.map(image => {
            const foundLikedImage = this.props.LikesData.find(
                data => data.id === image.id
            );
            return (
                <HomeShared key={image.id || Math.random()} img={image}
                    history={this.props.history}
                    likes={foundLikedImage}
                />
            );
        });
        return (
            <div className='splitUi-shared'>
                <div className='images'>
                    <div className='photosCategory'>
                        <div className='one'>
                            {SharedData}
                        </div>
                    </div>
                </div>
                <Following history={this.props.history} />
            </div>
        );
    };
};

const mapStateToProps = getState => {
    if (getState.DBLoginStatus) {//login with db
        return {
            SharedData: getState.DBUserSharedData,
            LikesData: getState.DBUserLikesData
        };
    } return {
        SharedData: getState.SharedData,
        LikesData: getState.LikesData
    };
};

export default connect(mapStateToProps, actions)(SharedPage);
