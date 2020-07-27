import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../../../../../../Actions';
import ImageUploading from 'react-images-uploading';
import SVG from './Icon';
import './index.css'; 

import PreImages from './Pre Images';

// https://www.npmjs.com/package/react-images-uploading

class Image extends Component {
  constructor(props) {
    super(props);
    this.state = { mouseIn: false };
  };
  onChange = imageList => {
    this.props.handleNewPostUploadPhotos(imageList);
    // imageList.name
    // imageList.dataURL
    // data for submit
  };
  render() {
    const mode = "single";// const mode = "multiple";
    const maxNumber = 10;
    return (
      <ImageUploading mode={mode} onChange={this.onChange} maxNumber={maxNumber}>
        {({ imageList, onImageUpload, onImageRemoveAll }) => (
          // write your building UI
          <div>
            <button type='button' className="upload-btn" onClick={onImageUpload}>
              <SVG />
              Upload images
            </button>
            {this.props.isUpload ? null :onImageRemoveAll}
            {imageList.map(
              image => <PreImages key={image.key} image={image} />
            )}
          </div>
        )}
      </ImageUploading>
    );
  };
};

export default connect(null, actions)(Image);
