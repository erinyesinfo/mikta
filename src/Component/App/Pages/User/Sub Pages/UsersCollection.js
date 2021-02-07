import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../../../Actions';
import ImageCardCollection from './Sub UsersCollection';

class UsersCollection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            delay: false,
            k: 1
        };
    };
    componentDidMount = () => {
        if (this.props.UnsplashUserCollections.length === 0) {
            const { username } = this.props.match.params;
            this.props.fetchUnsplashUserCollections(username, 1);
        }
        if (this.props.UnsplashUserPhotos.length > 0) {
            this.props.fetchUnsplashUserPhotos(true);
        }
        if (this.props.UnsplashUserLikes.length > 0) {
            this.props.fetchUnsplashUserLikes(true);
        }
        if (this.props.UnsplashCollectionPhotos.length > 0) {
            this.props.fetchUnsplashUserCollectionPhotos(true);
            this.props.handleClearCollectionPhotos();
        }
    };
    handleMoreCollection = () => {
        if (this.state.delay) {
            return alert('Attention, you need to wait 3 sec before you click again on load more collection photos :)');
        }
        const { username } = this.props.UnsplashUser;
        this.setState(st => ({ k: st.k + 1, delay: true }) , () => this.props.fetchUnsplashUserCollections(username, this.state.k));
        const timeOut = setTimeout(() => this.setState({ delay: false }, clearTimeout(timeOut)), 3000);
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
                        {this.props.UnsplashUserCollections.map((image, i) => (
                            <ImageCardCollection key={image.id || Math.random()} 
                                image={image}
                                preview_photos={image.preview_photos}
                                history={this.props.history}
                            />
                        ))}
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
        /* Unsplash User */
        UnsplashUser: getState.UnsplashUser,
        UnsplashUserPhotos: getState.UnsplashUserPhotos,
        UnsplashUserLikes: getState.UnsplashUserLikes,
        UnsplashUserCollections: getState.UnsplashUserCollections,
        UnsplashCollectionPhotos: getState.UnsplashCollectionPhotos
    };
};

export default connect(mapStateToProps, actions)(UsersCollection);
