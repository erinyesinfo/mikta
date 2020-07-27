import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../../../../../../Actions';
import ImageUploading from "react-images-uploading";
// { ImageUploadingPropsType, ImageListType, ImageType } is type for typescript
import uploadSvg from "../../../../../../../../IMG/Icons/Upload-icon.svg";
import "./Image.css";

import PreImages from "./Pre Images/Images";

// https://www.npmjs.com/package/react-images-uploading

class Image extends Component {
  constructor(props) {
    super(props);
    this.state = { mouseIn: false };
  };
  onChange = imageList => {
    this.props.uploadPhotos(imageList);
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
                <img src={uploadSvg} alt='upload-svg' />
                Upload images
            </button>
            {/* <button onClick={onImageRemoveAll}>Remove all images</button> */}

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
