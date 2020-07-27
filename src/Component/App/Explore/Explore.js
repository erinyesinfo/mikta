import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../Actions';
import UsersList from './Sub Explore/Users-List/UsersList';
import News from './Sub Explore/News/News';
import './Explore.css';

/* Header */
import Header from '../Header/Header';

class Explore extends Component {
    componentDidMount() {
        if (this.props.UserPhotos.length > 0) {
            this.props.fetchUserPhotos(true);
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
        if (this.props.images.length > 0) {
            this.props.fetchPhotos(true);
            this.props.isSearch(false);
        }
    }
    render() {
        return (
            <React.Fragment>
                <Header history={this.props.history} />
                <div className="splitUi">
                    <div>
                        <UsersList history={this.props.history} />
                    </div>
                    <News history={this.props.history} />
                </div>
            </React.Fragment>
        );
    };
};

const mapStateToProps = getState => {
    return {
        /* Username */
        UserPhotos: getState.fetchUserPhotos,
        UserLikes: getState.fetchUserLikes,
        UserCollection: getState.fetchUserCollection,
        /* Collection detail page */
        fetchCollectionPhotos: getState.fetchUserCollectionPhotos,
        /* Search */
        images: getState.fetchPhotos
    };
};

export default connect(mapStateToProps, actions)(Explore);
