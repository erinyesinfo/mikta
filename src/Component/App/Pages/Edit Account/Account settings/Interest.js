import React, { Component } from 'react';

class Interest extends Component {
    node = React.createRef();
    componentDidMount() {
        const elementWidth = this.node;
        this.props.handleCalculateInterests(elementWidth.clientWidth);
    };
    handleRef = node => this.node = node;
    handleRemoveInterest = () => this.props.handleRemoveInterest(this.props.interest, this.node.clientWidth);
    render() {
        const { interest } = this.props;
        return (
            <span className="account-interest" key={interest} name={interest} id={`interest-${interest}`} ref={this.handleRef}>
                {interest} <span className="remove preventcopy" onClick={this.handleRemoveInterest}>x</span>
            </span>
        );
    };
};

export default Interest;
