import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../Actions';

/* Header */
import Header from '../Header/Header';

class NotFound extends Component {
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
        const { history } = this.props;
        const inlineStyle = {
        textAlign: 'left',
        margin: '40px 0 0 20px',
        };
        return (
            <React.Fragment>
                <Header history={history} />
                <div style={inlineStyle}>
                    <h1>404 Page Not Found!</h1>
                </div>
            </React.Fragment>
        )
    }
}

const mapStateToProps = (getState) => {
    return {
        /* Username */
        UserPhotos: getState.fetchUserPhotos,
        UserLikes: getState.fetchUserLikes,
        UserCollection: getState.fetchUserCollection,
        // collection detail page
        fetchCollectionPhotos: getState.fetchUserCollectionPhotos,
        // search
        images: getState.fetchPhotos
    }
}

export default connect(mapStateToProps, actions)(NotFound);