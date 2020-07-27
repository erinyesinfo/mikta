import React from "react";
import ReactDOM from 'react-dom';
import "./ShareModal.css";

class ShareModal extends React.Component {
  constructor(props) {
    super(props);
      this.state = {
        showfunction: this.props.isShareModal,
    };
  }
  node = React.createRef();
  componentDidMount() {
    if (this.props.isShareModal) {
      return this.props.handleShowShareModal();
    }
    return this.handleCloseShareModal();
  }
  UNSAFE_componentWillMount() {
    document.addEventListener('mousedown', this.handleClick, false);
  }
  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClick, false);
  }
  handleRef = (node) => { return this.node = node; }
  handleClick = e => {
    const { showShareModal, showIsOk } = this.props;
    if ( (!this.node.contains(e.target) && !showShareModal)
    || (this.node.contains(e.target) && showShareModal)
    ) {
      return;
    } else if (showIsOk) return;
    return this.props.handleCloseShareModal();
  };
  renderShareModal = () => {
    const { showShareModal, renderShareContent } = this.props;
    return (
      <React.Fragment>
        {
          this.state.showfunction
        }
        <div className={showShareModal ? 'modal-share-active' : ''} >
          <div id="modal-container-share" className={showShareModal ? 'share' : 'out'} >
            <div className="modal-background-share">
              <div className="modal-share" ref={this.handleRef} onClick={this.handleClick}>
                {renderShareContent()}
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  };
  render() {
      return ReactDOM.createPortal(
          this.renderShareModal(),
          document.querySelector('#modal')
      );
  }
}

export default ShareModal;