import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Photo extends React.Component {
  node = React.createRef();
  UNSAFE_componentWillMount() {
    document.addEventListener('mousedown', this.handleClick, false);
  };
  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClick, false);
  };
  handleRef = node => this.node = node;
  handleClick = e => {
    const { editPhoto } = this.props;
    if (this.node.contains(e.target) && editPhoto) {
      return null;
    } return this.props.handleCloseEditPhoto();
  };
  renderEditPhotoModal = () => {
    const { editPhoto, renderModalEditPhotoContent } = this.props;
    return (
      <React.Fragment>
        <div className={editPhoto ? 'modal-showPhoto-active' : ''} >
          <div id="modal-container-showPhoto" className={editPhoto ? 'showPhoto' : 'out'} >
            <div className="modal-background-showPhoto">
              <div className="modal-showPhoto" ref={this.handleRef} onClick={this.handleClick}>
                {renderModalEditPhotoContent()}
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  };
  render() {
    return ReactDOM.createPortal(
      this.renderEditPhotoModal(),
      document.querySelector('#modal')
    );
  };
};

export default Photo;