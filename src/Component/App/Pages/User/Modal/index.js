import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Message extends Component {
  node = React.createRef();
  UNSAFE_componentWillMount() {
    document.addEventListener('mousedown', this.handleClick, false);
  };
  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClick, false);
  };
  handleRef = node => this.node = node;
  handleClick = e => {
    const { showMessageModal } = this.props;
    if (this.node.contains(e.target) && showMessageModal) {
      return;
    } return this.props.handleCloseMessageModal();
  };
  renderMessageModal = () => {
    const { showMessageModal, MessageModalContent } = this.props;
    return (
      <div className={showMessageModal ? 'modal-showMessageModal-active' : ''} >
        <div id="modal-container-showMessageModal" className={showMessageModal ? 'showMessageModal' : 'out'} >
          <div className="modal-background-showMessageModal">
            <div className="modal-showMessageModal" ref={this.handleRef} onClick={this.handleClick}>
              {MessageModalContent()}
            </div>
          </div>
        </div>
      </div>
    );
  };
  render() {
    return ReactDOM.createPortal(
      this.renderMessageModal(),
      document.querySelector('#modal')
    );
  };
};

export default Message;