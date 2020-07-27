import React, { Component } from 'react';

import SignIN from './SignIN form';
import SignUp from './SignUp form';

class Content extends Component {
    constructor(props) {
        super(props);
        this.state = { signIn: true };
    };
    handleSignIn = () => this.setState({ signIn: true });
    handleSignUp = () => this.setState({ signIn: false });
    render() {
        return (
            <div className={this.state.signIn ? 'login':'signup'}>
                {this.state.signIn ? (
                    <SignIN handleCloseLoginModal={this.props.handleCloseLoginModal}
                        handleSignUp={this.handleSignUp}
                    />
                ):(
                    <SignUp handleSignIn={this.handleSignIn} />
                )}
            </div>
        );
    };
};

export default Content;
