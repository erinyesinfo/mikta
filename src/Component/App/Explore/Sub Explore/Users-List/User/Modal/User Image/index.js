import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class UserImage extends Component {
  node = React.createRef();
  UNSAFE_componentWillMount() {
    document.addEventListener('mousedown', this.handleClick, false);
  };
  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClick, false);
  };
  handleRef = node => this.node = node;
  handleClick = e => {
    const { showUserImage, showShareModal, showEditModal, showBlockReport } = this.props;
    if (this.node.contains(e.target) && showUserImage) {
      return;
    } else if (showShareModal || showEditModal || showBlockReport) return;
    return this.props.handleCloseUserImage();
  };
  renderUserImageModal = () => {
    const { showUserImage, renderUserImageModalContent } = this.props;
    return (
      <div className={showUserImage ? 'modal-showUserImage-active' : ''} >
        <div id="modal-container-showUserImage" className={showUserImage ? 'showUserImage' : 'out'} >
          <div className="modal-background-showUserImage">
            <div className="modal-showUserImage" ref={this.handleRef} onClick={this.handleClick}>
              {renderUserImageModalContent()}
            </div>
          </div>
        </div>
      </div>
    );
  };
  render() {
    return ReactDOM.createPortal(
      this.renderUserImageModal(),
      document.querySelector('#modal')
    );
  };
};

export default UserImage;
