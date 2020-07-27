import React, { Component } from 'react';

// create new collection
import CreateNewCollection from './Collection/CreateNewCollection';
// read all collection
import CollectionList from './Collection/CollectionList';

/* ThirdParty-Library */
import LazyImage from "../../../../../../ThirdParty-Library/Lazy Image/LazyImage";

class CollectionModalContent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showCreateForm: false
        }
    }
    showCreateForm = () => this.setState({ showCreateForm: true });
    closeCreateForm = () => this.setState({ showCreateForm: false });
    render() {
        const { img } = this.props;
        return (
            <div>
                <div className='helperDisplay'>
                    <div className='likes-createCollection'>
                        <div className='likes-divImgCreateCollection'>
                            <LazyImage ClickImage={null} srcImage={img.urls.regular} 
                            altImage={img.description} style={{}} 
                            classImage='likes-imgCreateCollection' imageRef={null} />
                            {/* <img className='likes-imgCreateCollection' 
                            alt={img.description} 
                            src={img.urls.regular} /> */}
                        </div>
                        <div className='likes-divText'>
                            {this.state.showCreateForm ? (
                                <CreateNewCollection img={img}
                                handleCloseCollection={this.props.handleCloseCollection}
                                closeCreateForm={this.closeCreateForm} />
                            ):(
                                <CollectionList img={img}
                                showCreateForm={this.showCreateForm} />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default CollectionModalContent;