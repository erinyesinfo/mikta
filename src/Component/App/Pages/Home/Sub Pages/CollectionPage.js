import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../../../Actions';
import HomeCollection from './Collection/HomeCollection';

class CollectionPage extends Component {
    render() {
        if (this.props.Collection.length === 0) {
            return <div className='likesContent'>No collections :(</div>;
        }
        const inlineStyling = { gridGap: '0.1px 20px', overflow: 'hidden', width: '100%' };
        return (
            <div className='images'>
                <div className='photosCategory'>
                    <div className='mediaWidth' style={inlineStyling}>
                        {this.props.Collection.map((image, i) => {
                            return <HomeCollection key={image.name || Math.random()} 
                                    image={image} i={i} three={false} preview={image.preview} 
                                    preview_photos={image.preview_photos}
                                    history={this.props.history} />
                        })}
                    </div>
                </div>
            </div>
        );
    };
};

const mapStateToProps = getState => {
    return {
        /* Collection */
        Collection: getState.Collection,
    };
};

export default connect(mapStateToProps, actions)(CollectionPage);
