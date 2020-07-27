import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../../Actions';

/* Home-CollectionPhotos */
import HomeCollectionPhotos from '../Home/CollectionPhotos/CollectionPhotos';
/* user-CollectionPhotos */
import UserCollectionPhotos from '../User/CollectionPhotos/CollectionPhotos';

class CollectionsIdPhotos extends Component {
    componentDidMount() {
        if (this.props.images.length > 0) {
            this.props.fetchPhotos(true);
            this.props.isSearch(false);
        }
    }
    render() {
        const { match, history, location, Collection } = this.props;
        const { id } = match.params; // grab id from url
        const findHomeCollectionId = Collection.find(data => data.id === id);
        if (findHomeCollectionId) {
            return <HomeCollectionPhotos
                        match={match}
                        history={history}
                        location={location}
                    />
        }
        return <UserCollectionPhotos
                    match={match}
                    history={history}
                    location={location}
                />
    }
}

const mapStateToProps = (getState) => {
    return {
        Collection: getState.Collection,
        // search
        images: getState.fetchPhotos
    }
};

export default connect(mapStateToProps, actions)(CollectionsIdPhotos);