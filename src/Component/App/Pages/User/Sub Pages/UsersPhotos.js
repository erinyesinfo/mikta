import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../../../Actions';
import ImageCard from '../../#Helper';// imageCard

class UsersPhotos extends Component {
    constructor(props) {
        super(props);
        this.state = {
            delay: false,
            i: 1
        };
    };
    componentDidMount = () => {
        const { username } = this.props.match.params;
        if (this.props.UnsplashUserPhotos.length === 0) {
            this.props.fetchUnsplashUserPhotos(username, 1);
        }
        if (this.props.UnsplashUserLikes.length > 0) {
            this.props.fetchUnsplashUserLikes(true);
        }
        if (this.props.UnsplashUserCollections.length > 0) {
            this.props.fetchUnsplashUserCollections(true);
        }
        if (this.props.UnsplashCollectionPhotos.length > 0) {
            this.props.fetchUnsplashUserCollectionPhotos(true);
            this.props.handleClearCollectionPhotos();
        }
    };
    handleMorePhotos = () => {
        if (this.state.delay) {
            return alert('Attention, you need to wait 3 sec before you click again on load more photos :)');
        }
        const { username } = this.props.UnsplashUser;
        this.setState(st => ({ i: st.i + 1, delay: true }), () => this.props.fetchUserPhotos(username, this.state.i));
        const timeOut = setTimeout(() => this.setState({ delay: false }, () => clearTimeout(timeOut)), 3000);
    };
    render() {
        const { total_photos } = this.props;
        if (total_photos === 0) {
            return <div className='likesContent'>No User photos :(</div>;
        } return (
            <div className='images'>
                <div className='photosCategory'>
                    <div className='mediaWidth'>
                        {this.props.UnsplashUserPhotos.map((image, i) => {
                            return (
                                <ImageCard key={image.id || Math.random()} img={image}
                                    history={this.props.history} />
                            );
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
        /* Unsplash User */
        UnsplashUser: getState.UnsplashUser,
        UnsplashUserPhotos: getState.UnsplashUserPhotos,
        UnsplashUserLikes: getState.UnsplashUserLikes,
        UnsplashUserCollections: getState.UnsplashUserCollections,
        UnsplashCollectionPhotos: getState.UnsplashCollectionPhotos
    };
};

export default connect(mapStateToProps, actions)(UsersPhotos);
