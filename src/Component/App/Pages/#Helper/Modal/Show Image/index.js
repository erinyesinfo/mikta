import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class ShowImage extends React.Component {
  node = React.createRef();
  UNSAFE_componentWillMount() {
    document.addEventListener('mousedown', this.handleClick, false);
  };
  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClick, false);
  };
  handleRef = node => this.node = node;
  handleClick = e => {
    const { showImage, showImageInfo, showCollection } = this.props;
    if (this.node.contains(e.target) && showImage) {
      return;
    } else if (showImageInfo || showCollection) return;
    return this.props.handleCloseImage();
  };
  renderShowImage = () => {
    const { showImage, renderImagePage } = this.props;
    return (
      <div className={showImage ? 'modal-showImage-active':''} >
        <div id="modal-container-showImage" className={showImage ? 'showImage':'out'} >
          <div className="modal-background-showImage">
            <div className="modal-showImage" ref={this.handleRef}
              onClick={this.handleClick}>
              {renderImagePage()}
            </div>
          </div>
        </div>
      </div>
    );
  };
  render() {
    return ReactDOM.createPortal(
      this.renderShowImage(),
      document.querySelector('#modal')
    );
  };
};

export default ShowImage;
