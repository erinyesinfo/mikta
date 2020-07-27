import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Collection extends React.Component {
  node = React.createRef();
  UNSAFE_componentWillMount() {
    document.addEventListener('mousedown', this.handleClick, false);
  };
  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClick, false);
  };
  handleRef = node => this.node = node;
  handleClick = e => {
    const { showCollection } = this.props;
    if (this.node.contains(e.target) && showCollection) {
      return;
    } return this.props.handleCloseCollection();
  };
  renderCollection = () => {
    const { showCollection, renderCollectionPage } = this.props;
    return (
      <div className={showCollection ? 'modal-showCollection-active' : ''} >
        <div id="modal-container-showCollection" className={showCollection ? 'showCollection' : 'out'} >
          <div className="modal-background-showCollection">
            <div className="modal-showCollection" ref={this.handleRef} onClick={this.handleClick}>
              {renderCollectionPage()}
            </div>
          </div>
        </div>
      </div>
    );
  };
  render() {
    return ReactDOM.createPortal(
      this.renderCollection(),
      document.querySelector('#modal')
    );
  };
};

export default Collection;
