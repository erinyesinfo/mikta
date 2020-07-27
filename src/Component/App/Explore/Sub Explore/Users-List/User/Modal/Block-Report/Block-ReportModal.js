import React from "react";
import ReactDOM from 'react-dom';
import "./Block-ReportModal.css";

class BlockReportModal extends React.Component {
  constructor(props) {
    super(props);
      this.state = {
        showfunction: this.props.isBlockReport,
    };
  }
  node = React.createRef();
  componentDidMount() {
    if (this.props.isBlockReport) {
      return this.props.handleShowBlockReport();
    }
    return this.handleCloseBlockReport();
  }
  UNSAFE_componentWillMount() {
    document.addEventListener('mousedown', this.handleClick, false);
  }
  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClick, false);
  }
  handleRef = node => this.node = node;
  handleClick = e => {
    const { showBlockReport } = this.props;
    if ( (!this.node.contains(e.target) && !showBlockReport)
    || (this.node.contains(e.target) && showBlockReport)
    ) {
      return;
    }
    return this.props.handleCloseBlockReport();
  };
  renderBlockReportModal = () => {
    const { showBlockReport, renderBlockReportModalContent } = this.props;
    return (
      <React.Fragment>
        {
          this.state.showfunction
        }
        <div className={showBlockReport ? 'modal-showBlockReport-active' : ''} >
          <div id="modal-container-showBlockReport" className={showBlockReport ? 'showBlockReport' : 'out'} >
            <div className="modal-background-showBlockReport">
              <div className="modal-showBlockReport" ref={this.handleRef} onClick={this.handleClick}>
                {renderBlockReportModalContent()}
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  };
  render() {
      return ReactDOM.createPortal(
          this.renderBlockReportModal(),
          document.querySelector('#modal')
      );
  }
}

export default BlockReportModal;