import React, { Component } from 'react';

// create new collection
import CreateNewCollection from './Collection/New';
// read all collection
import CollectionList from './Collection/List';

/* ThirdParty-Library */
import LazyImage from '../../../../../../ThirdParty-Library/Lazy Image/LazyImage';

class CollectionModalContent extends Component {
    constructor(props) {
        super(props);
        this.state = { showCreateForm: false };
    };
    showCreateForm = () => this.setState({ showCreateForm: true });
    closeCreateForm = () => this.setState({ showCreateForm: false });
    render() {
        let emtyObject = {};
        const { img } = this.props;
        return (
            <div>
                <div className='helperDisplay'>
                    <div className='likes-createCollection'>
                        <div className='likes-divImgCreateCollection'>
                            <LazyImage ClickImage={null} srcImage={img.urls.regular} 
                            altImage={img.description} style={emtyObject} 
                            classImage='likes-imgCreateCollection' imageRef={null} />
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
    };
};

export default CollectionModalContent;
