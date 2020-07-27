import React, { Component } from "react";
import ReactDOM from 'react-dom';
import "./EditModal.css";

class EditModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showfunction: this.props.isEditModal
    };
  };
  node = React.createRef();
  componentDidMount() {
    if (this.props.isEditModal) {
      return this.props.handleShowEditModal();
    } return this.props.handleCloseEditModal()
  };
  UNSAFE_componentWillMount() {
    document.addEventListener('mousedown', this.handleClick, false);
  };
  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClick, false);
  };
  handleRef = node => this.node = node;
  handleClick = e => {
    const { showEditModal } = this.props;
    if ( (!this.node.contains(e.target) && !showEditModal)
    || (this.node.contains(e.target) && showEditModal)
    ) {
      return;
    } return this.props.handleCloseEditModal();
  };
  renderEditModal = () => {
    const { showEditModal, renderEditModalContent } = this.props;
    return (
      <React.Fragment>
        {
          this.state.showfunction
        }
        <div className={showEditModal ? 'modal-active' : ''} >
          <div id="modal-container-showEditModal" className={showEditModal ? 'showEditModal' : 'out'} >
            <div className="modal-background-showEditModal">
              <div className="modal-showEditModal" ref={this.handleRef} onClick={this.handleClick}>
                <h2>...</h2>
                {renderEditModalContent()}
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
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
