import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class ImageInfo extends React.Component {
  node = React.createRef();
  UNSAFE_componentWillMount() {
    document.addEventListener('mousedown', this.handleClick, false);
  };
  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClick, false);
  };
  handleRef = node => this.node = node;
  handleClick = e => {
    const { showImageInfo } = this.props;
    if (this.node.contains(e.target) && showImageInfo) {
      return;
    } return this.props.handleCloseImageInfo();
  };
  renderImageInfo = () => {
    const { showImageInfo, ImageInfoContent } = this.props;
    return (
      <div className={showImageInfo ? 'modal-showImageInfo-active' : ''} >
        <div id="modal-container-showImageInfo" className={showImageInfo ? 'showImageInfo' : 'out'} >
          <div className="modal-background-showImageInfo">
            <div className="modal-showImageInfo" ref={this.handleRef}
              onClick={this.handleClick}>
              {ImageInfoContent()}
            </div>
          </div>
        </div>
      </div>
    );
  };
  render() {
    return ReactDOM.createPortal(
      this.renderImageInfo(),
      document.querySelector('#modal')
    );
  };
};

export default ImageInfo;
