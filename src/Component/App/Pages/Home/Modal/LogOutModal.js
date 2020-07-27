import React, { Component } from "react";
import ReactDOM from 'react-dom';
import "./LogOutModal.css";

class LogOutModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showfunction: this.props.isLogOutModal
    };
  }
  node = React.createRef();
  componentDidMount() {
    if (this.props.isLogOutModal) {
      return this.props.handleShowLogOutModal();
    }
    return this.props.handleCloseLogOutModal();
  }
  UNSAFE_componentWillMount() {
    document.addEventListener('mousedown', this.handleClick, false);
  }
  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClick, false);
  }
  handleRef = node => this.node = node;
  handleClick = e => {
    const { showLogOutModal } = this.props;
    if ( (!this.node.contains(e.target) && !showLogOutModal)
    || (this.node.contains(e.target) && showLogOutModal)
    ) {
      return;
    }
    return this.props.handleCloseLogOutModal();
  };
  renderLogOutModal = () => {
    const { showLogOutModal } = this.props;  
    return (
      <React.Fragment>
        {
          this.state.showfunction
        }
        <div className={showLogOutModal ? 'modal-active' : ''} >
          <div id="modal-container-showLogOutModal" className={showLogOutModal ? 'showLogOutModal' : 'out'} >
            <div className="modal-background-showLogOutModal">
              <div className="modal-showLogOutModal" ref={this.handleRef} onClick={this.handleClick}>
                <h2>...</h2>
                <button className="logOutBtn"
                  onClick={this.props.LogOut} >
                  Log Out
                </button>
                <button className="cancelBtn"
                  onClick={this.props.handleContactUs} >
                  Contact us
                </button>
                <button className="cancelBtn"
                  onClick={this.props.handleCloseLogOutModal}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  };
  render() {
      return ReactDOM.createPortal(
          this.renderLogOutModal(),
          document.querySelector('#modal')
      );
  }
}

export default LogOutModal;