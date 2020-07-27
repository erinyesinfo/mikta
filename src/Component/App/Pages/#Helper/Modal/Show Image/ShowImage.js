import React from "react";
import ReactDOM from 'react-dom';
import "./ShowImage.css";

class ShowImage extends React.Component {
  constructor(props) {
    super(props);
      this.state = {
        showfunction: this.props.isShowImage,
    };
  };
  node = React.createRef();
  componentDidMount() {
    if (this.props.isShowImage) {
      return this.props.handleShowImage();
    } return this.handleCloseImage();
  };
  UNSAFE_componentWillMount() {
    document.addEventListener('mousedown', this.handleClick, false);
  };
  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClick, false);
  };
  handleRef = node => this.node = node;
  handleClick = e => {
    const { showImage, showImageInfo } = this.props;
    if ( (!this.node.contains(e.target) && !showImage)
    || (this.node.contains(e.target) && showImage)
    ) {
      return;
    } else if (showImageInfo) return;
    return this.props.handleCloseImage();
  };
  renderShowImage = () => {
    const { showImage, renderImagePage } = this.props;
    return (
      <React.Fragment>
        {
          this.state.showfunction
        }
        <div className={showImage ? 'modal-showImage-active':''} >
          <div id="modal-container-showImage" className={showImage ? 'showImage':'out'} >
            <div className="modal-background-showImage">
              <div className="modal-showImage" ref={this.handleRef}
                onClick={this.handleClick}>
                {renderImagePage()}
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  };
  render() {
    return ReactDOM.createPortal(
      this.renderShowImage(),
      document.querySelector('#modal')
    );
  };
};

export default ShowImage;
