import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../../../Actions';
import ImageCard from '../../#Helper';// imageCard

class UsersPhotos extends Component {
    constructor(props) {
        super(props);
        this.state = {
            delay: false,
            j: 1
        };
    };
    componentDidMount = () => {
        if (this.props.UnsplashUserLikes.length === 0) {
            const { username } = this.props.match.params;
            this.props.fetchUnsplashUserLikes(username, 1);
        }
        if (this.props.UnsplashUserPhotos.length > 0) {
            this.props.fetchUnsplashUserPhotos(true);
        }
        if (this.props.UnsplashUserCollections.length > 0) {
            this.props.fetchUnsplashUserCollections(true);
        }
        if (this.props.UnsplashCollectionPhotos.length > 0) {
            this.props.fetchUnsplashUserCollectionPhotos(true);
            this.props.handleClearCollectionPhotos();
        }
    };
    handleMoreLikes = () => {
        if (this.state.delay) {
            return alert('Attention, you need to wait 3 sec before you click again on load more photos :)');
        }
        const { username } = this.props.UnsplashUser;
        this.setState(st => ({ j: st.j + 1, delay: true }), () => this.props.fetchUnsplashUserLikes(username, this.state.j));
        const timeOut = setTimeout(() => {
            this.setState({ delay: false }, () => clearTimeout(timeOut));
        }, 3000);
    };
    render() {
        const { total_likes } = this.props;
        if (total_likes === 0) {
            return <div className='likesContent'>No liked photos :(</div>;
        } 
        return (
            <div className='images'>
                <div className='photosCategory'>
                    <div className='mediaWidth'>
                        {this.props.UnsplashUserLikes.map((image, i) => (
                            <ImageCard key={image.id || Math.random()} img={image}
                                history={this.props.history}
                            />
                        ))}
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
        /* Unsplash User */
        UnsplashUser: getState.UnsplashUser,
        UnsplashUserPhotos: getState.UnsplashUserPhotos,
        UnsplashUserLikes: getState.UnsplashUserLikes,
        UnsplashUserCollections: getState.UnsplashUserCollections,
        UnsplashCollectionPhotos: getState.UnsplashCollectionPhotos
    };
};

export default connect(mapStateToProps, actions)(UsersPhotos);
