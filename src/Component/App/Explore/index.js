import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../Actions';
import UsersList from './Sub Explore/Users-List';
import News from './Sub Explore/News';
import './index.css';

class Explore extends Component {
    componentDidMount() {
        if (this.props.UnsplashUserPhotos.length > 0) {
            this.props.fetchUnsplashUserPhotos(true);
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
        if (this.props.UnsplashSearchedPhotos.length > 0) {
            this.props.fetchUnsplashSearchedPhotos(true);
            this.props.handleIsSearch(false);
        }
    };
    render() {
        return (
            <div className="splitUi">
                <div>
                    <UsersList history={this.props.history} />
                </div>
                <News history={this.props.history} />
            </div>
        );
    };
};

const mapStateToProps = getState => {
    return {
        /* Unsplash User */
        UnsplashUserPhotos: getState.UnsplashUserPhotos,
        UnsplashUserLikes: getState.UnsplashUserLikes,
        UnsplashUserCollections: getState.UnsplashUserCollections,
        UnsplashCollectionPhotos: getState.UnsplashCollectionPhotos,
        /* Search */
        UnsplashSearchedPhotos: getState.UnsplashSearchedPhotos
    };
};

export default connect(mapStateToProps, actions)(Explore);
