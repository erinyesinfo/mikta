import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class EditModal extends Component {
  node = React.createRef();
  UNSAFE_componentWillMount() {
    document.addEventListener('mousedown', this.handleClick, false);
  };
  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClick, false);
  };
  handleRef = node => this.node = node;
  handleClick = e => {
    const { showEditModal } = this.props;
    if (this.node.contains(e.target) && showEditModal) {
      return;
    } return this.props.handleCloseEditModal();
  };
  renderEditModal = () => {
    const { showEditModal, renderFormEditModal } = this.props;
    return (
      <div className={showEditModal ? 'modal-active' : ''} >
        <div id="modal-container-shared-showEditModal"
          className={showEditModal ? 'shared-showEditModal' : 'out'} >
          <div className="modal-background-shared-showEditModal">
            <div className="modal-shared-showEditModal" ref={this.handleRef} onClick={this.handleClick}>
              <h2>...</h2>
              {renderFormEditModal()}
            </div>
          </div>
        </div>
      </div>
    );
  };
  render() {
    return ReactDOM.createPortal(
      this.renderEditModal(),
      document.querySelector('#modal')
    );
  };
};

export default EditModal;
