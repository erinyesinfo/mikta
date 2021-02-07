import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../../Actions';

/* Home-CollectionPhotos */
import HomeCollectionPhotos from './Home';
/* user-CollectionPhotos */
import UserCollectionPhotos from './User';

class CollectionsIdPhotos extends Component {
    componentDidMount() {
        if (this.props.UnsplashSearchedPhotos.length > 0) {
            this.props.fetchUnsplashSearchedPhotos(true);
            this.props.handleIsSearchUnsplashPhotos(false);
        }
    };
    render() {
        const { match, history, location, CollectionsData } = this.props;
        const { id } = match.params; // grab id from url
        const findHomeCollectionId = CollectionsData.find(data => data.id === id);
        if (findHomeCollectionId) {
            return (
                <HomeCollectionPhotos
                    match={match}
                    history={history}
                    location={location}
                />
            );
        } return (
            <UserCollectionPhotos
                match={match}
                history={history}
                location={location}
            />
        );
    };
};

const mapStateToProps = getState => {
    if (getState.DBLoginStatus) {//login with db
        return {
            CollectionsData: getState.DBUserCollectionsData,
            UnsplashSearchedPhotos: getState.UnsplashSearchedPhotos//Search
        };
    } return {
        CollectionsData: getState.CollectionsData, 
        UnsplashSearchedPhotos: getState.UnsplashSearchedPhotos//Search
    };
};

export default connect(mapStateToProps, actions)(CollectionsIdPhotos);
