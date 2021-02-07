import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../../../Actions';
import Server from '../../../../../API/Server';
import HomeCollection from './Collection';

class CollectionPage extends Component {
    async componentDidMount() {
        if (this.props.DBLoginStatus) {
            if (this.props.CollectionsData.length === 0) {
                const api = await Server.get("/collections");
                if (api.data !== 'failure') {
                    this.props.handleDidMountCollectionsData(api.data);
                }
            }
        }
    };
    render() {
        if (this.props.CollectionsData.length === 0) {
            return <div className='likesContent'>No collections :(</div>;
        }
        const inlineStyling = { gridGap: '0.1px 20px', overflow: 'hidden', width: '100%' };
        return (
            <div className='images'>
                <div className='photosCategory'>
                    <div className='mediaWidth' style={inlineStyling}>
                        {this.props.CollectionsData.map((image, i) => {
                            return (
                                <HomeCollection key={image.name || Math.random()} 
                                    image={image} i={i} three={false} preview={image.preview} 
                                    preview_photos={image.preview_photos}
                                    history={this.props.history}
                                />
                            );
                        })}
                    </div>
                </div>
            </div>
        );
    };
};

const mapStateToProps = getState => {
    if (getState.DBLoginStatus) {//login with db
        return {
            DBLoginStatus: getState.DBLoginStatus,//db login
            CollectionsData: getState.DBUserCollectionsData
        };
    } return {
        DBLoginStatus: getState.DBLoginStatus,//db login
        CollectionsData: getState.CollectionsData
    };
};

export default connect(mapStateToProps, actions)(CollectionPage);
