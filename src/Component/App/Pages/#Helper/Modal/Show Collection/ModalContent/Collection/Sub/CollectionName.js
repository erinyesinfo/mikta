import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../../../../../../../Actions';

class CollectionName extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mouseInCollection: false,
            mouseCollection: false,
        };
    }
    handleMouseEnterCollection = () => {
        const  { img, preview_photos } = this.props;
        const find = preview_photos.find(data => data.id === img.id);
        if (find) {
            return this.setState({ mouseInCollection: true, mouseCollection: true });
        } else {
            return this.setState({ mouseInCollection: true, mouseCollection: false });
        }
    }
    handleMouseLeaveCollection = () => this.setState({ mouseInCollection: false });
    handlePreviewPhotos = () => {
        const  { coll, img } = this.props;
        return this.props.handlePreviewPhotos(coll, img);
    };
    render() {
        const  { name, myBackground, preview_photos } = this.props;
        const find = this.props.preview_photos.find(data => data.id === this.props.img.id);
        return (
            <button onMouseEnter={this.handleMouseEnterCollection} 
            onMouseLeave={this.handleMouseLeaveCollection} 
            onClick={this.handlePreviewPhotos} className='btn-nameImage' >
                <div className='div-nameImage' >
                    <img className='img-bg-img' src={myBackground} alt={myBackground} />
                    <span className={find 
                        ? 'addSuccess':'spanWrapper'}>
                        <span className='spanHelper'>
                            <span className='photosLength'>{preview_photos.length} {preview_photos.length === 1 ? "Photo": "Photos"}</span> 
                            <span className='span-photoName'>
                                {name.length < 18 ?
                                    name
                                :name.substring(0, 18) + '...'}
                            </span>
                        </span>
                        {find && this.state.mouseInCollection === false ? 
                            <span className="span-check">
                                <i className="fas fa-check"></i>
                            </span>
                        :this.state.mouseInCollection && this.state.mouseCollection === false ? 
                            <span className='span-add'>
                                +
                            </span>
                        :this.state.mouseInCollection && this.state.mouseCollection ?
                            <span className="span-sub">
                                -
                            </span>
                            
                        :null}
                    </span>
                </div>
            </button>
        )
    }
}

const mapStateToProps = (getState) => {
    return { Collection: getState.Collection }
};

export default connect(mapStateToProps, actions)(CollectionName);