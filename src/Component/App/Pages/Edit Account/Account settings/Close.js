import React, { Component } from 'react';
import Cookies from 'universal-cookie';
import { connect } from 'react-redux';
import * as actions from '../../../../../Actions';
import Server from '../../../../../API/Server';

class Close extends Component {
    constructor(props) {
        super(props);
        this.state = {
            password: '',
            password_error: '',
            spinner: false
        };
    };
    componentDidMount() {
        if (!this.props.DBLoginStatus) return this.props.history.push("/account");
    };
    handleShowSpinner = () => this.setState({ spinner: true });
    handleCloseSpinner = () => this.setState({ spinner: false });
    handleChange = e => this.setState({ password: e.target.value });
    handleSubmit = async e => {
        e.preventDefault();
        await this.handleShowSpinner();
        const { password, password_error } = this.state;
        if (password.length === 0 || (password.length > 0 && password.length < 8) || password.length > 50) {
            return this.setState({ password_error: "Current password is invalid" }, this.handleCloseSpinner);
        } else {
            if (password_error.length !== 0) {
                this.setState({ password_error: "" });
            }
        }
        const data = { password };
        const api = await Server.post("/data-account-close", data);
        if (api.data !== "success") {
            this.setState({ password_error: "Current password is invalid" }, this.handleCloseSpinner);
        } else {
            this.handleCloseSpinner();
            const cookies = new Cookies();
            if (cookies.get("214082ee-34f0-4316-8881-a474d8c82d7b")) {
                cookies.remove("214082ee-34f0-4316-8881-a474d8c82d7b");
            }
            await Server.post('/logout');
            this.props.history.push("/");
            return window.location.reload();
        }
    };
    render() {
        const { password, password_error } = this.state;
        return (
            <form onSubmit={this.handleSubmit} className='container-close'>
                <h3>Close account</h3>
                <div>Warning<span>: closing your account is irreversible. It deletes all of your photos, collections, and stats.</span></div>
                <div className="password-container">
                    <label htmlFor="password">
                        Current password
                    </label>
                    <input type='password' name="password" id="password" autoFocus
                        className={password_error.length !== 0 ? "password-error":""}
                        onChange={this.handleChange} value={password} autoComplete="off"
                    />
                    {password_error.length !== 0 ? (
                        <span>Current password is invalid</span>
                    ):null}
                </div>
                {this.state.spinner ? (
                    <div className="edit-spinner"><i className="fas fa-circle-notch"></i></div>
                ):null}
                <button type="submit">Delete account</button>
            </form>
        );
    };
};

const mapStateToProps = getState => {
    return { DBLoginStatus: getState.DBLoginStatus };
};

export default connect(mapStateToProps, actions)(Close);
