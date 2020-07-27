import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../../../Actions';
import ImageCard from '../../#Helper';// imageCard

class LikePage extends Component {
    render() {
        if (this.props.LikesData.length === 0) {
            return <div className='likesContent'>No liked photos :(</div>;
        } return (
            <div className='images'>
                <div className='photosCategory'>
                    <div className='mediaWidth'>
                        {this.props.LikesData.map((image, i) => {
                            return (
                                <ImageCard key={image.id || Math.random()}
                                    img={image}
                                    history={this.props.history}
                                />
                            );
                        })}
                    </div>
                </div>
            </div>
        );
    };
};

const mapStateToProps = getState => {
    if (getState.DBLoginStatus) {//login with db
        return { LikesData: getState.DBUserLikesData };
    } return { LikesData: getState.LikesData };
};

export default connect(mapStateToProps, actions)(LikePage);
