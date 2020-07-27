import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class LogedIn extends React.Component {
  node = React.createRef();
  UNSAFE_componentWillMount() {
    document.addEventListener('mousedown', this.handleClick, false);
  };
  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClick, false);
  };
  handleRef = node => this.node = node;
  handleClick = e => {
    const { showLoginModal } = this.props;
    if (this.node.contains(e.target) && showLoginModal) {
      return;
    } return this.props.handleCloseLoginModal();
  };
  renderLoginModal = () => {
    const { showLoginModal, renderLoginModalContent } = this.props;
    return (
      <div className={showLoginModal ? 'modal-showLogin-active':''}>
        <div id="modal-container-showLogin" className={showLoginModal ? 'showLogin':'out'} >
          <div className="modal-background-showLogin">
            <div className="modal-showLogin" ref={this.handleRef} onClick={this.handleClick}>
              {renderLoginModalContent()}
            </div>
          </div>
        </div>
      </div>
    );
  };
  render() {
    return ReactDOM.createPortal(
      this.renderLoginModal(),
      document.querySelector('#modal')
    );
  };
};

export default LogedIn;