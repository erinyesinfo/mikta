import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../../../../../../Actions';
import './index.css';

class Setting extends Component {
    constructor(props) {
        super(props);
        this.state = { showSetting: false };
    };
    node = React.createRef();
    UNSAFE_componentWillMount() {
        document.addEventListener('mousedown', this.handleClick, false);
    };
    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClick, false);
    };
    handleRef = node => this.node = node;
    handleClick = e => {
        if (this.node.contains(e.target)) return;
        this.setState({ showSetting: false });
    };
    handleShowSetting = () => this.setState(st => ({ showSetting: !st.showSetting }) );
    handleEdit = () => this.setState({ showSetting: false }, this.props.handleShowEditModal);
    handleRemove = () => {
        if (this.props.showUserImage) {
            let element = document.querySelector('body');
            element.style.overflowY = 'auto';
        } return this.props.handleNewPost(this.props.id, true);
    };
    render() {
        // PostCard.js
        return (
            <span className='postCard-setting' onClick={this.handleClick}
                ref={this.handleRef}>
                <span className='threeDots' onClick={this.handleShowSetting}>
                    ...
                </span>
                {this.state.showSetting ? (
                    <div className='showSetting-btns'>
                        <button type='button' onClick={this.handleEdit}>
                            Edit
                        </button>
                        <button type='button' onClick={this.handleRemove}>
                            Remove
                        </button>
                    </div>
                ):null}
            </span>
        );
    };
};

export default connect(null, actions)(Setting);
