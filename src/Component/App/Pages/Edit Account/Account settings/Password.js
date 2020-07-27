import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../../../Actions';
import Server from '../../../../../API/Server';

class Password extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: '',
            currentPassword: '',
            password: '',
            confirmPassword: '',
            currentPassword_error: '',
            password_error: '',
            confirmPassword_error: '',
            spinner: false,
            success: false
        };
    };
    componentDidMount() {
        if (!this.props.DBLoginStatus) return this.props.history.push("/account");
    };
    handleShowSpinner = () => this.setState({ spinner: true });
    handleCloseSpinner = () => this.setState({ spinner: false });
    handleChange = e => this.setState({ [e.target.name]: e.target.value });
    handleSubmit = async e => {
        e.preventDefault();
        const { currentPassword, password, confirmPassword, currentPassword_error, password_error, confirmPassword_error } = this.state;

        if (currentPassword.length === 0 || (currentPassword.length > 0 && currentPassword.length < 8) || currentPassword.length > 50) {
            this.setState({ currentPassword_error: "Current password is invalid" });
        } else {
            if (currentPassword_error.length !== 0) {
                this.setState({ currentPassword_error: "" });
            }
        }

        if (password.length === 0) {
            this.setState({ password_error: "You must provide a password." });
        } else if (password.length > 0 && password.length < 8) {
            this.setState({ password_error: "Password must be at least 8 characters." });
        } else if (password.length > 50) {
            this.setState({ password_error: "Password cannot exceed 50 characters." });
        } else {
            if (password_error.length !== 0) {
                this.setState({ password_error: "" });
            }
        }

        if (password !== confirmPassword) {
            this.setState({ confirmPassword_error: "Passwords did not match."});
        } else {
            if (confirmPassword_error.length !== 0) {
                this.setState({ confirmPassword_error: "" });
            }
        }
        if (this.state.error.length !== 0) { this.setState({ error: '' }); }
        if ((currentPassword.length === 0 || (currentPassword.length > 0 && currentPassword.length < 8) || currentPassword.length > 50)
        || (password.length === 0 || (password.length > 0 && password.length < 8) || password.length > 50)
        || (password !== confirmPassword)) {
            return null;
        }
        await this.handleShowSpinner();
        const data = { currentPassword, password };
        const api = await Server.post('/data-account-password', data);
        if (api.data !== "success") {
            if (api.data === "Your new password must be different from your previous password.") {
                return this.setState({ error: "Your new password must be different from your previous password." }, this.handleCloseSpinner);
            }
            this.setState({ currentPassword_error: "Current password is invalid" }, this.handleCloseSpinner);
        } else {
            this.setState({ currentPassword: '', password: '', confirmPassword: '', success: 'Password has been changed successfully' }, this.handleCloseSpinner);
            const timeOut = setTimeout(() => {
                if (this.state.success) {
                    this.setState({ success: false })
                } return clearTimeout(timeOut);
            }, 2000);
        }
    };
    render() {
        const { currentPassword, password, confirmPassword, currentPassword_error, password_error, confirmPassword_error, error, success } = this.state;        
        return (
            <form onSubmit={this.handleSubmit} className='container-edit-password'>
                <h3>Change password</h3>
                <div className="password-container">
                    <label htmlFor="currentPassword">
                        Current password
                    </label>
                    <input type='password' name="currentPassword" id="currentPassword"
                        className={currentPassword_error.length !== 0 ? "password-error":""}
                        autoFocus autoComplete="off"
                        onChange={this.handleChange} value={currentPassword}
                    />
                    {currentPassword_error.length !== 0 ? (
                        <span>Current password is invalid</span>
                    ):null}
                </div>
                <div className="password-container">
                    <label htmlFor="password">
                        Password
                    </label>
                    <input type='password' name="password" id="password"
                        className={password_error.length !== 0 ? "password-error":""}
                        onChange={this.handleChange} value={password} autoComplete="off"
                    />
                    {password_error.length !== 0 ? (
                        (password_error === "You must provide a password.") ? (
                            <span>You must provide a password.</span>
                        ):(password_error === "Password must be at least 8 characters.") ? (
                            <span>Password must be at least 8 characters.</span>
                        ):(password_error === "Password cannot exceed 50 characters.") ? (
                            <span>Password cannot exceed 50 characters.</span>
                        ):null
                    ):null}
                </div>
                <div className="password-container">
                    <label htmlFor="confirmPassword">
                        Password confirmation
                    </label>
                    <input type='password' name="confirmPassword" id="confirmPassword"
                        className={confirmPassword_error.length !== 0 ? "password-error":""}
                        onChange={this.handleChange} value={confirmPassword} autoComplete="off"
                    />
                    {confirmPassword_error.length !== 0 ? (
                        <span>Passwords did not match.</span>
                    ):null}
                </div>
                {this.state.spinner ? (
                    <div className="edit-spinner"><i className="fas fa-circle-notch"></i></div>
                ):null}
                {error.length !== 0 && error === "Your new password must be different from your previous password." ? (
                    <span className="password-error">Your new password must be different from your previous password.</span>
                ):null}
                {success !== false ? (
                    <span className="password-success">{success}</span>
                ):null}
                <button type="submit">Change password</button>
            </form>
        );
    };
};

const mapStateToProps = getState => {
    return { DBLoginStatus: getState.DBLoginStatus };
};

export default connect(mapStateToProps, actions)(Password);
