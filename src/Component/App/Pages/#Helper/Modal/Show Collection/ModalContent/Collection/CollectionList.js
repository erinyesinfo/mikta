import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../../../../../../Actions';
import CollectionName from './Sub/CollectionName';

class CollectionList extends Component {
    handlePreviewPhotos = (data, fullData) => {
        const { preview, name } = data;
        const { Collection } = this.props;

        const duplicates = Collection.find(coll => coll.img.urls.regular === fullData.preview && coll.name === name);
        if (duplicates) {
            // add
            return this.props.collection(name, true, preview, data, fullData)
        } else {
            // remove
            var element = document.querySelector("body");
            element.style.overflowY = 'auto';
            return this.props.collection(name, false, data.img.urls.regular, data, fullData)
        }
    };
    render() {
        const { img, showCreateForm } = this.props;
        return (
            <React.Fragment>
                <h1>Add to Collection</h1>
                <div onClick={showCreateForm} className='likes-innerDivText'>
                    Create New Collection
                </div>
                <div>
                    {this.props.Collection.length !== 0 &&
                    this.props.Collection.map(coll => 
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
        )
    }
}

const mapStateToProps = (getState) => {
    return {
        //initialValues: getState.ProfileData,
        /* Collection */
        Collection: getState.Collection,
    }
};

export default connect(mapStateToProps, actions)(CollectionList);