import React from "react";
import ReactDOM from 'react-dom';
import "./PostSearchModal.css";

class PostSearchModal extends React.Component {
  constructor(props) {
    super(props);
      this.state = {
        showfunction: this.props.isPostSearch,
    };
  }
  node = React.createRef();
  componentDidMount() {
    if (this.props.isPostSearch) {
      return this.props.handleShowPostSearch();
    }
    return this.handleClosePostSearch
  }
  UNSAFE_componentWillMount() {
    document.addEventListener('mousedown', this.handleClick, false);
  }
  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClick, false);
  }
  handleRef = (node) => { return this.node = node; }
  handleClick = e => {
    const { showPostSearch } = this.props;
    if ( (!this.node.contains(e.target) && !showPostSearch)
    || (this.node.contains(e.target) && showPostSearch)
    ) {
      return;
    }
    return this.props.handleClosePostSearch();
  };
  renderPostSearchModal = () => {
    const { showPostSearch, PostSearchContent } = this.props;
    return (
      <React.Fragment>
        {
          this.state.showfunction
        }
        <div className={showPostSearch ? 'modal-showPostSearch-active' : ''} >
          <div id="modal-container-showPostSearch" className={showPostSearch ? 'showPostSearch' : 'out'} >
            <div className="modal-background-showPostSearch">
              <div className="modal-showPostSearch" ref={this.handleRef} onClick={this.handleClick}>
                {PostSearchContent()}
                {/* <svg className="modal-svg" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" preserveAspectRatio="none" style={{zIndex: '0'}}>
                <rect x="0" y="0" fill="none" width="226" height="162" rx="3" ry="3"></rect>
                </svg> */}
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  };
  render() {
      return ReactDOM.createPortal(
          this.renderPostSearchModal(),
          document.querySelector('#modal')
      );
  }
}

export default PostSearchModal;