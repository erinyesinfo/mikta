import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../../../Actions';
import ImageCard from '../../#Helper/ImageCard';

class UsersPhotos extends Component {
    constructor(props) {
        super(props);
        this.state = {
            delay: false,
            i: 1
        };
    };
    componentDidMount = () => {
        if (this.props.UserCollection.length === 0) {
            const { user } = this.props;
            this.props.fetchUserPhotos(user.username, 1);
        }
        if (this.props.UserLikes.length > 0) {
            this.props.fetchUserLikes(true);
        }
        if (this.props.UserCollection.length > 0) {
            this.props.fetchUserCollection(true);
        }
        if (this.props.fetchCollectionPhotos.length > 0) {
            this.props.fetchUserCollectionPhotosDetailes(true);
            this.props.fetchUserCollectionPhotos(true);
        }
    };
    handleMorePhotos = () => {
        if (this.state.delay === false) {
            const { user } = this.props;
            this.setState(st => ({ i: st.i + 1, delay: true }) );
            return setTimeout(
                () => this.props.fetchUserPhotos(user.username, this.state.i), 50);   
        }
        alert('Attention, you need to wait 3 sec before you click again on load more photos :)');
        setTimeout(() => this.setState({ delay: false }), 3000);
    };
    render() {
        const { total_photos } = this.props;
        if (total_photos === 0) {
            return <div className='likesContent'>No User photos :(</div>;
        } return (
            <div className='images'>
                <div className='photosCategory'>
                    <div className='mediaWidth'>
                        {this.props.UserPhotos.map(image => {
                            return <ImageCard key={image.id || Math.random()} img={image}
                                        history={this.props.history} />
                        })}
                    </div>
                </div>
                {total_photos > this.state.i * 9 ? (
                    <div className='divLoadMore'>
                        <button className='loadMorePhotos' onClick={this.handleMorePhotos}>
                            Load more photos
                        </button>
                    </div>
                ):null}
            </div>
        );
    };
};

const mapStateToProps = getState => {
    return {
        user: getState.fetchUser,
        UserPhotos: getState.fetchUserPhotos,
        UserLikes: getState.fetchUserLikes,
        UserCollection: getState.fetchUserCollection,
        // collection detail page
        fetchCollectionPhotos: getState.fetchUserCollectionPhotos,
    };
};

export default connect(mapStateToProps, actions)(UsersPhotos);