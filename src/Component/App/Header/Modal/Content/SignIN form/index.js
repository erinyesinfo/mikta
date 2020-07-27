import React, { Component } from 'react';
import Cookies from 'universal-cookie';
import { connect } from 'react-redux';
import * as actions from '../../../../../../Actions';
import Server from '../../../../../../API/Server';
import './index.css';

// icons
import { User, Padlock } from './Icons';

class SignIN extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            spinner: false,
            errors: '',
        };
    };
    callAPI = async () => {
        const data = {
            username: this.state.username,
            password: this.state.password
        };
        const api = await Server.post("/login", data);
        if (api.data === "success") {
            let day = 1000 * 3600 * 24;
            this.handleCloseSpinner();
            const cookies = new Cookies();
            const option = {
                path: '/',
                expires: new Date(Date.now() + day),
                cookie: { maxAge: day },
                sameSite: 'lax',
                secure: true
            };
            cookies.set('214082ee-34f0-4316-8881-a474d8c82d7b', 'a474d8c82d7b-8881-4316-34f0-214082ee', option);
            return window.location.reload();
        } else {
            return this.setState({ errors: api.data }, this.handleCloseSpinner);
        };
    };
    handleChange = e => {
        if (e.target.name === 'password') {
            return this.setState({ password: e.target.value });
        }
        let value = e.target.value.replace(/(<|>|&)/g, '');
        this.setState({ [e.target.name]: value.replace(/ +/g, '') });
    };
    handleShowSpinner = () => this.setState({ spinner: true });
    handleCloseSpinner = () => this.setState({ spinner: false });
    handleSubmit = async e => {
        e.preventDefault();
        await this.handleShowSpinner();
        this.callAPI();
    };
    handleGuestLogin = () => {// login as guest with localstorage
        this.props.handleCloseLoginModal();
        return this.props.handleLocalStorageloginStatus(true);
    };
    render() {
        return (
            <React.Fragment>
                <h1>Login</h1>
                <form onSubmit={this.handleSubmit}>
                    <div className="input-container">
                        <label htmlFor="username-id">Username</label>
                        <User />
                        <input type="text" id="username-id" name="username"
                            placeholder="Type your username" onChange={this.handleChange} value={this.state.username}
                            onFocus={this.handleFocus} onBlur={this.handleBlur}
                        />
                        {this.state.errors === 'Invalid username!' ? (
                            <span>{this.state.errors}</span>
                        ):null}
                    </div>
                    <div className="input-container">
                        <label htmlFor="password-id">Password</label>
                        <Padlock />
                        <input type="password" id="password-id" name="password"
                            placeholder="Type your password" onChange={this.handleChange} value={this.state.password}
                            onFocus={this.handleFocus} onBlur={this.handleBlur}
                        />
                        {this.state.errors === 'Invalid passsword!' ? (
                            <span>{this.state.errors}</span>
                        ):null}
                        {this.state.errors !== 'Invalid username!' && this.state.errors !== 'Invalid passsword!' ? (
                            <span>{this.state.errors}</span>
                        ):null}
                    </div>
                    {this.state.spinner ? (
                        <div className="edit-spinner"><i className="fas fa-circle-notch"></i></div>
                    ):null}
                    <button className="login-btn">LOGIN</button>
                </form>
                <div className="guest-container">
                    <span>Or login as guest</span>
                    <button className="guest-btn" onClick={this.handleGuestLogin}>GUEST</button>
                </div>
                <div className="signup-container">
                    <span>Have not account yet?</span>
                    <button className="signup-btn" onClick={this.props.handleSignUp}>SIGN UP</button>
                </div>
            </React.Fragment>
        );
    };
};

export default connect(null, actions)(SignIN);
