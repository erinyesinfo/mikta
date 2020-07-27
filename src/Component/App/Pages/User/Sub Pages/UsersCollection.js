import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../../../Actions';
import ImageCardCollection from './Sub UsersCollection/ImageCardCollection';

class UsersCollection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            delay: false,
            k: 1
        }
    }
    componentDidMount = () => {
        if (this.props.UserCollection.length === 0) {
            const { user } = this.props;
            return this.props.fetchUserCollection(user.username, 1);
        }
        if (this.props.UserPhotos.length > 0) {
            this.props.fetchUserPhotos(true);
        }
        if (this.props.UserLikes.length > 0) {
            this.props.fetchUserLikes(true);
        }
        if (this.props.fetchCollectionPhotos.length > 0) {
            this.props.fetchUserCollectionPhotosDetailes(true);
            this.props.fetchUserCollectionPhotos(true);
        }
    };
    handleMoreCollection = () => {
        if (this.state.delay === false) {
            const { user } = this.props;
            this.setState(st => ({ k: st.k + 1, delay: true }) );
            setTimeout(
                () => this.props.fetchUserCollection(user.username, this.state.k), 50);
        }

        alert('Attention, you need to wait 3 sec before you click again on load more collection photos :)');
        setTimeout(() => this.setState({ delay: false }), 3000);
    };
    render() {
        const { total_collections } = this.props;
        if (total_collections === 0) {
            return <div className='likesContent'>No collections :(</div>;
        }
        const inlineStyling = { gridAutoRows: 'auto' };
        return (
            <div className='images'>
                <div className='photosCategory'>
                    <div className='mediaWidth' style={inlineStyling}>
                        {this.props.UserCollection.map(image => {
                            return <ImageCardCollection key={image.id || Math.random()} 
                                        image={image}
                                        preview_photos={image.preview_photos}
                                        history={this.props.history}
                                    />
                        })}
                    </div>
                </div>
                {total_collections > this.state.k * 9 ? (
                    <div className='divLoadMore'>
                        <button className='loadMorePhotos' onClick={this.handleMoreCollection}>
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

export default connect(mapStateToProps, actions)(UsersCollection);