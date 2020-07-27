import React, { Component } from 'react';
import { scroller, Element } from 'react-scroll';
import zxcvbn from 'zxcvbn';//utility for checking password strength
import Cookies from 'universal-cookie';
import { connect } from 'react-redux';
import * as actions from '../../../../../../Actions';
import Server from '../../../../../../API/Server';
import './index.css';

class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstname: '',
            lastname: '',
            username: '',
            email: '',
            password: '',
            strength: '',
            feedback: '',
            spinner: false,
            errors: [],
        };
    };
    node = React.createRef();
    handleRef = node => this.node = node;
    callAPI = async () => {
        const data = {
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            username: this.state.username,
            email: this.state.email,
            password: this.state.password,
        };
        const api = await Server.post("/register", data);        
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
    handlePassword = () => {
        // Somewhere else, even another file
        scroller.scrollTo('scrollTo', {
            duration: 500,
            delay: 30,
            smooth: true,
            containerId: 'signup-id',
            offset: 0, // Scrolls to element + 50 pixels down the page
        })
        let strength = {
            0: "Worst ☹",
            1: "Bad ☹",
            2: "Weak ☹",
            3: "Good ☺",
            4: "Strong ☻"
        };

        let meter = document.getElementById('password-strength-meter');
        
        let val = this.state.password;
        let result = zxcvbn(val);
        
        // Update the password strength meter
        meter.value = result.score;
    
        // Update the text indicator
        if(val !== "") {
            this.setState({
                strength: strength[result.score],
                feedback: result.feedback.warning + " " + result.feedback.suggestions
            });
        } else {
            this.setState({ strength: '', feedback: '' });
        }
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
    onSubmit = async e => {
        e.preventDefault();
        await this.handleShowSpinner();
        const form = document.getElementById('signup-id');
        form.scrollTop = form.scrollHeight;
        this.callAPI();
    };
    render() {
        const { strength, feedback } = this.state;
        const inlineStyling = { height: '3px' };
        return (
            <React.Fragment>
                <h1>Sign Up</h1>
                <form onSubmit={this.onSubmit} id='signup-id'>
                    <div className="name-field">
                        <div className="input-container">
                            <label htmlFor="signup-firstname-id">
                                Firstname
                            </label>
                            <input type='text' name="firstname" id="signup-firstname-id"
                                autoFocus placeholder="Type your firstname" onChange={this.handleChange} value={this.state.firstname}
                            />
                            {this.state.errors.map(e => {
                                if (e.includes("firstname") || e.includes("Firstname")) {
                                    return <span key={e}>{e}</span>
                                } return null;
                            })}
                        </div>
                        <div className="input-container">
                            <label htmlFor="signup-lastname-id">
                                Lastname
                            </label>
                            <input type='text' name="lastname" id="signup-lastname-id"
                                placeholder="Type your lastname" onChange={this.handleChange} value={this.state.lastname}
                            />
                            {this.state.errors.map(e => {
                                if (e.includes("lastname") || e.includes("Lastname")) {
                                    return <span key={e}>{e}</span>
                                } return null;
                            })}
                        </div>
                    </div>
                    <div className="input-container">
                        <label htmlFor="signup-username-id">
                            Username
                        </label>
                        <input type='text' name="username" id="signup-username-id" autoComplete='false'
                            placeholder="Type your username" onChange={this.handleChange} value={this.state.username}
                        />
                        {this.state.errors.map(e => {
                            if (e.includes("username") || e.includes("Username")) {
                                return <span key={e}>{e}</span>
                            } return null;
                        })}
                    </div>
                    <div className="input-container">
                        <label htmlFor="signup-email-id">
                            Email
                        </label>
                        <input type='email' name="email" id="signup-email-id" autoComplete='false'
                            placeholder="Type your email" onChange={this.handleChange} value={this.state.email}
                        />
                        {this.state.errors.map(e => {
                            if (e.includes("email") || e.includes("Email")) {
                                return <span key={e}>{e}</span>
                            } return null;
                        })}
                    </div>
                    <div className="input-container">
                        <label htmlFor="signup-password-id">
                            Password
                        </label>
                        <input type='password' name="password" id="signup-password-id" onKeyUp={this.handlePassword}
                            placeholder="Type your password" ref={this.handleRef}
                            onChange={this.handleChange} value={this.state.password}
                        />
                        <meter max="4" style={inlineStyling} id="password-strength-meter" />
                        {this.state.errors.map(e => {
                            if (e.includes("password") || e.includes("Password")) {
                                return <span key={e}>{e}</span>
                            } return null;
                        })}
                        <div className="password-strength-meter-container">
                            <p id="password-strength-text">
                                {(strength || feedback) ? (
                                    <React.Fragment>
                                        Strength: 
                                        {strength ? (
                                            <strong>{this.state.strength}</strong>
                                        ):null}
                                        {feedback.length > 1 ? (
                                            <span className="feedback">{this.state.feedback}</span>
                                        ):null}
                                    </React.Fragment>
                                ):null}
                            </p>
                        </div>
                    </div>
                    {this.state.spinner ? (
                        <div className="edit-spinner"><i className="fas fa-circle-notch"></i></div>
                    ):null}
                    <Element name="scrollTo" />
                    <button className="signup-btn">SIGNUP</button>
                </form>
                <div className="signin-container">
                    <span>Already have an account?</span>
                    <button className="signin-btn" onClick={this.props.handleSignIn}>SIGN IN</button>
                </div>
            </React.Fragment>
        );
    };
};

export default connect(null, actions)(SignUp);
