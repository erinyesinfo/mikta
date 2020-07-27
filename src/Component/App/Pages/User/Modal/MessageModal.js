import React from "react";
import ReactDOM from 'react-dom';
import "./MessageModal.css";

class MessageModal extends React.Component {
  constructor(props) {
    super(props);
      this.state = {
        showfunction: this.props.isMessageModal,
    };
  }
  node = React.createRef();
  componentDidMount() {
    if (this.props.isMessageModal) {
      return this.props.handleShowMessageModal();
    }
    return this.handleCloseMessageModal();
  }
  UNSAFE_componentWillMount() {
    document.addEventListener('mousedown', this.handleClick, false);
  }
  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClick, false);
  }
  handleRef = node => this.node = node;
  handleClick = e => {
    const { showMessageModal } = this.props;
    if ( (!this.node.contains(e.target) && !showMessageModal)
    || (this.node.contains(e.target) && showMessageModal)
    ) {
      return;
    }
    return this.props.handleCloseMessageModal();
  };
  renderMessageModal = () => {
    const { showMessageModal, MessageModalContent } = this.props;
    return (
      <React.Fragment>
        {
          this.state.showfunction
        }
        <div className={showMessageModal ? 'modal-showMessageModal-active' : ''} >
          <div id="modal-container-showMessageModal" className={showMessageModal ? 'showMessageModal' : 'out'} >
            <div className="modal-background-showMessageModal">
              <div className="modal-showMessageModal" ref={this.handleRef} onClick={this.handleClick}>
                {MessageModalContent()}
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  };
  render() {
      return ReactDOM.createPortal(
          this.renderMessageModal(),
          document.querySelector('#modal')
      );
  }
}

export default MessageModal;