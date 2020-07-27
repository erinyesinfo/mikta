import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../../../../../../Actions';
import CollectionName from './Sub list';

class CollectionList extends Component {
    handlePreviewPhotos = async (data, fullData) => {
        const { preview, name } = data;
        const { CollectionsData } = this.props;
        const duplicates = CollectionsData.find(coll => coll.img.urls.regular === fullData.preview && coll.name === name);
        let element = document.querySelector('body');
        element.style.overflowY = 'auto';
        if (this.props.DBLoginStatus) {
            if (duplicates) {
                await this.props.handleUpdateCollectionsDataDB(name, true, preview, data, fullData)// add
            } else {
                // remove
                await this.props.handleUpdateCollectionsDataDB(name, false, data.img.urls.regular, data, fullData)
            };
        } else {
            if (duplicates) {
                await this.props.handleUpdateCollectionsData(name, true, preview, data, fullData)// add
            } else {
                // remove
                await this.props.handleUpdateCollectionsData(name, false, data.img.urls.regular, data, fullData)
            };
        }
    };
    render() {
        const { img, showCreateForm, CollectionsData } = this.props;
        return (
            <React.Fragment>
                <h1>Add to Collection</h1>
                <div onClick={showCreateForm} className='likes-innerDivText'>
                    Create New Collection
                </div>
                <div>
                    {CollectionsData.length !== 0 &&
                    CollectionsData.map(coll => 
                        <CollectionName key={coll.name}
                        handlePreviewPhotos={this.handlePreviewPhotos}
                        myBackground={coll.preview}
                        name={coll.name}
                        coll={coll}
                        preview_photos={coll.preview_photos}
                        // img passed by homeLike
                        img={img} />
                    )}
                </div>
            </React.Fragment>
        );
    };
};

const mapStateToProps = getState => {
    if (getState.DBLoginStatus) {//login with db
        return {
            DBLoginStatus: getState.DBLoginStatus,
            CollectionsData: getState.DBUserCollectionsData
        };
    } return {
        DBLoginStatus: getState.DBLoginStatus,
        CollectionsData: getState.CollectionsData
    };
};

export default connect(mapStateToProps, actions)(CollectionList);
