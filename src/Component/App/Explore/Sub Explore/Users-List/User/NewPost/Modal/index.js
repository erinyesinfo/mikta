import React from "react";
import ReactDOM from 'react-dom';
import "./index.css";

class PostSearchModal extends React.Component {
  node = React.createRef();
  UNSAFE_componentWillMount() {
    document.addEventListener('mousedown', this.handleClick, false);
  };
  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClick, false);
  };
  handleRef = (node) => { return this.node = node; }
  handleClick = e => {
    const { showPostSearch } = this.props;
    if (this.node.contains(e.target) && showPostSearch) {
      return;
    } return this.props.handleClosePostSearch();
  };
  renderPostSearchModal = () => {
    const { showPostSearch, PostSearchContent } = this.props;
    return (
      <div className={showPostSearch ? 'modal-showPostSearch-active' : ''} >
        <div id="modal-container-showPostSearch" className={showPostSearch ? 'showPostSearch' : 'out'} >
          <div className="modal-background-showPostSearch">
            <div className="modal-showPostSearch" ref={this.handleRef} onClick={this.handleClick}>
              {PostSearchContent()}
            </div>
          </div>
        </div>
      </div>
    );
  };
  render() {
    return ReactDOM.createPortal(
      this.renderPostSearchModal(),
      document.querySelector('#modal')
    );
  };
};

export default PostSearchModal;
