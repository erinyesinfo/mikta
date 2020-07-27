import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../../../Actions';
import ImageCard from '../../#Helper/ImageCard';

class UsersPhotos extends Component {
    constructor(props) {
        super(props);
        this.state = {
            delay: false,
            j: 1
        };
    }
    componentDidMount = () => {
        if (this.props.UserLikes.length === 0) {
            const { user } = this.props;
            this.props.fetchUserLikes(user.username, 1);
        }
        if (this.props.UserPhotos.length > 0) {
            this.props.fetchUserPhotos(true);
        }
        if (this.props.UserCollection.length > 0) {
            this.props.fetchUserCollection(true);
        }
        if (this.props.fetchCollectionPhotos.length > 0) {
            this.props.fetchUserCollectionPhotosDetailes(true);
            this.props.fetchUserCollectionPhotos(true);
        }
    };
    handleMoreLikes = () => {
        if (this.state.delay === false) {
            const { user } = this.props;
            this.setState(st => ({ j: st.j + 1, delay: true }) );
            return setTimeout(
                () => this.props.fetchUserLikes(user.username, this.state.j), 50);
        }

        alert('Attention, you need to wait 3 sec before you click again on load more photos :)');
        setTimeout(() => this.setState({ delay: false }), 3000);
    };
    render() {
        const { total_likes } = this.props;
        if (total_likes === 0) {
            return <div className='likesContent'>No liked photos :(</div>;
        } return (
            <div className='images'>
                <div className='photosCategory'>
                    <div className='mediaWidth'>
                        {this.props.UserLikes.map(image => {
                            return <ImageCard key={image.id || Math.random()} img={image}
                                        history={this.props.history} />
                        })}
                    </div>
                </div>
                {total_likes > this.state.j * 9 ? (
                    <div className='divLoadMore'>
                        <button className='loadMorePhotos' onClick={this.handleMoreLikes}>
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