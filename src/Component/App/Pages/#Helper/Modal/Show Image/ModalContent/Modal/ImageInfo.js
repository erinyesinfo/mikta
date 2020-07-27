import React from "react";
import ReactDOM from 'react-dom';
import "./ImageInfo.css";

class ImageInfo extends React.Component {
  constructor(props) {
    super(props);
      this.state = {
        showfunction: this.props.isShowImageInfo,
    };
  }
  node = React.createRef();
  componentDidMount() {
    if (this.props.isShowImageInfo) {
      return this.props.handleShowImageInfo();
    }
    return this.handleCloseImageInfo();
  }
  UNSAFE_componentWillMount() {
    document.addEventListener('mousedown', this.handleClick, false);
  }
  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClick, false);
  }
  handleRef = (node) => { return this.node = node; }
  handleClick = e => {
    const { showImageInfo } = this.props;
    if ( (!this.node.contains(e.target) && !showImageInfo)
    || (this.node.contains(e.target) && showImageInfo)
    ) {
      return;
    }
    return this.props.handleCloseImageInfo();
  };
  renderImageInfo = () => {
    const { showImageInfo, ImageInfoContent } = this.props;
    return (
      <React.Fragment>
        {
          this.state.showfunction
        }
        <div className={showImageInfo ? 'modal-showImageInfo-active' : ''} >
          <div id="modal-container-showImageInfo" className={showImageInfo ? 'showImageInfo' : 'out'} >
            <div className="modal-background-showImageInfo">
              <div className="modal-showImageInfo" ref={this.handleRef}
                onClick={this.handleClick}>
                {ImageInfoContent()}
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  };
  render() {
      return ReactDOM.createPortal(
          this.renderImageInfo(),
          document.querySelector('#modal')
      );
  }
}

export default ImageInfo;