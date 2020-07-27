import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class ShareModal extends React.Component {
  node = React.createRef();
  UNSAFE_componentWillMount() {
    document.addEventListener('mousedown', this.handleClick, false);
  };
  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClick, false);
  };
  handleRef = node => this.node = node;
  handleClick = e => {
    const { showShareModal, showIsOk } = this.props;
    if (this.node.contains(e.target) && showShareModal) {
      return;
    } else if (showIsOk) return;
    return this.props.handleCloseShareModal();
  };
  renderShareModal = () => {
    const { showShareModal, renderShareModalContent } = this.props;
    return (
      <div className={showShareModal ? 'modal-share-active' : ''} >
        <div id="modal-container-share" className={showShareModal ? 'share' : 'out'} >
          <div className="modal-background-share">
            <div className="modal-share" ref={this.handleRef} onClick={this.handleClick}>
              {renderShareModalContent()}
            </div>
          </div>
        </div>
      </div>
    );
  };
  render() {
    return ReactDOM.createPortal(
      this.renderShareModal(),
      document.querySelector('#modal')
    );
  };
};

export default ShareModal;
