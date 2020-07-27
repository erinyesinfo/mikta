import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class EditCollection extends React.Component {
  node = React.createRef();
  UNSAFE_componentWillMount() {
    document.addEventListener('mousedown', this.handleClick, false);
  };
  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClick, false);
  };
  handleRef = node => this.node = node;
  handleClick = e => {
    const { showEditCollection } = this.props;
    if (this.node.contains(e.target) && showEditCollection) {
      return;
    } return this.props.handleCloseEditCollection();
  };
  renderEditCollectionModal = () => {
    const { showEditCollection, renderEditCollection } = this.props;
    return (
      <div className={showEditCollection ? 'modal-showEditCollection-active' : ''} >
        <div id="modal-container-showEditCollection" className={showEditCollection ? 'showEditCollection' : 'out'} >
          <div className="modal-background-showEditCollection">
            <div className="modal-showEditCollection" ref={this.handleRef} onClick={this.handleClick}>
              {renderEditCollection()}
            </div>
          </div>
        </div>
      </div>
    );
  };
  render() {
    return ReactDOM.createPortal(
      this.renderEditCollectionModal(),
      document.querySelector('#modal')
    );
  };
};

export default EditCollection;
