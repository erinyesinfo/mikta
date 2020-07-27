import React, { Component } from 'react';
import './index.css';

class BlockReportModalContent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            result: false,
            report: '',
            reportTextarea: '',
            reportUser: false,
            reportUserHasFinished: false,
        };
    };
    handleChange = e => this.setState({ report: e.target.value });
    handleChangeTextarea = e => this.setState({ reportTextarea: e.target.value });
    handleCloseTimeOut = () => {
        const timeOut = setTimeout(() => {
            this.props.handleCloseBlockReport();
            return clearTimeout(timeOut);
        }, 3000);
    };
    onSubmit = e => {
        e.preventDefault();
        const { showBlockUser, showReportProfilePicture, showReportUser } = this.props;
        if (showBlockUser) return this.setState({ result: true }, this.handleCloseTimeOut);
        if (showReportProfilePicture) return this.setState({ result: true }, this.handleCloseTimeOut);
        if (showReportUser) {
            if (this.state.report.length === 0) return null;
            if (this.state.report === 'none-of-these') {
                return this.setState({ result: true, reportUser: true, report: 'textArea' });
            } else if (this.state.reportUser) {
                if (this.state.reportTextarea.length === 0) return null;
                return this.setState({ reportUserHasFinished: true }, this.handleCloseTimeOut);
            }
            return this.setState({ result: true }, this.handleCloseTimeOut);
        }
        return null;
    };
    render() {
        const { showBlockUser, showReportProfilePicture, showReportUser, handleCloseBlockReport } = this.props;
        if (showBlockUser) {
            if (this.state.result) {
                return (
                    <div className='report-user-done'>
                        <p>
                            Thank you, our team will dig deep to fix your issue
                        </p>
                        <p>
                            You will get an email when it's done
                        </p>
                    </div>
                );
            } return (
                <form onSubmit={this.onSubmit}>
                    <div className='report-user-container'>
                        <h4>Block user</h4>
                        <p>
                            Blocking this user will prevent them from commenting on photos you've uploaded.
                        </p>
                    </div>
                    <hr className='report-user-hr' />
                    <div className='report-user-btns'>
                        <button className='report-user-btn-cancel' type='button'
                            onClick={handleCloseBlockReport}>
                            Cancel
                        </button>
                        <button className='report-user-btn-submit' type='submit'>
                            Submit
                        </button>
                    </div>
                </form>
            );
        } else if (showReportProfilePicture) {
            if (this.state.result) {
                return (
                    <div className='report-user-done'>
                        <p>
                            Thank you, our team will dig deep to fix your issue
                        </p>
                        <p>
                            You will get an email when it's done
                        </p>
                    </div>
                )
            } return (
                <form onSubmit={this.onSubmit}>
                    <div className='report-user-container'>
                        <h4>Report profile picture</h4>
                        <p>
                            Abuse of the reporting system may result in termination of your account.
                        </p>
                        <p>
                            Are you sure you want to submit this report?
                        </p>
                    </div>
                    <hr className='report-user-hr' />
                    <div className='report-user-btns'>
                        <button className='report-user-btn-cancel' type='button'
                            onClick={handleCloseBlockReport}>
                            Cancel
                        </button>
                        <button className='report-user-btn-submit' type='submit'>
                            Submit
                        </button>
                    </div>
                </form>
            );
        } else if (showReportUser) {
            if ((this.state.result && (this.state.reportUser === false)) || this.state.reportUserHasFinished) {
                return (
                    <div className='report-user-done'>
                        <p>
                            Thank you, our team will dig deep to fix your issue
                        </p>
                        <p>
                            You will get an email when it's done
                        </p>
                    </div>
                )
            } else if (this.state.result && this.state.reportUser) {
                return (
                    <form onSubmit={this.onSubmit}>
                        <div className='report-user-container'>
                            <h4>Report user</h4>
                            <div className='report-user-issue'>Describe the issue?</div>
                            <textarea onChange={this.handleChangeTextarea} value={this.state.reportTextarea} placeholder='Your issue?' autoFocus></textarea>
                        </div>
                        <hr className='report-user-hr' />
                        <div className='report-user-btns'>
                            <button className='report-user-btn-cancel' type='button'
                                onClick={handleCloseBlockReport}>
                                Cancel
                            </button>
                            <button className='report-user-btn-submit' type='submit'>
                                Report
                            </button>
                        </div>
                    </form>
                );
            } return (
                <form onSubmit={this.onSubmit}>
                    <div className='report-user-container'>
                        <h4>Report user</h4>
                        <div className='report-user-issue'>What is the issue?</div>
                        
                        <div className='report-user-allInputsContainer'>
                            <div className='report-user-inputsContainer'>
                                <input type="radio" name="report" id='harassment-and-cyberbullying'
                                onChange={this.handleChange} value="harassment-and-cyberbullying" />
                                <label htmlFor='harassment-and-cyberbullying'> Harassment and cyberbullying</label>
                                <br />
                            </div>
                            <div className='report-user-inputsContainer'>
                                <input type="radio" name="report" id='impersonation'
                                onChange={this.handleChange} value="impersonation" />
                                <label htmlFor='impersonation'> Impersonation</label>
                                <br />
                            </div>
                            <div className='report-user-inputsContainer'>
                                <input type="radio" name="report" id='violent-threats'
                                onChange={this.handleChange} value="violent-threats" />
                                <label htmlFor='violent-threats'> Violent threats</label>
                                <br />
                            </div>
                            <div className='report-user-inputsContainer'>
                                <input type="radio" name="report" id='child-endangerment'
                                onChange={this.handleChange} value="child-endangerment" />
                                <label htmlFor='child-endangerment'> Child endangerment</label>
                                <br />
                            </div>
                            <div className='report-user-inputsContainer'>
                                <input type="radio" name="report" id='hate-speech'
                                onChange={this.handleChange} value="hate-speech" />
                                <label htmlFor='hate-speech'> Hate speech against a protected group</label>
                                <br />
                            </div>
                            <div className='report-user-inputsContainer'>
                                <input type="radio" name="report" id='spam-and-scams'
                                onChange={this.handleChange} value="spam-and-scams" />
                                <label htmlFor='spam-and-scams'> Spam and Scams</label>
                                <br />
                            </div>
                            <div className='report-user-inputsContainer'>
                                <input type="radio" name="report" id='privacy'
                                onChange={this.handleChange} value="privacy" />
                                <label htmlFor='privacy'> Privacy</label>
                                <br />
                            </div>
                            <div>
                                <input type="radio" name="report" id='none-of-these'
                                onChange={this.handleChange} value="none-of-these" />
                                <label htmlFor='none-of-these'> None of these are your issue</label>
                                <br />
                            </div>
                        </div>
                        <div className='report-user-description'>
                            Flagged photos and users are reviewed by our team 24 hours a day, seven days a week to determine whether they violate Community Guideline. Accounts are penalized for Community Guidelines violations and serious or repeated violations can lead to account termination.
                        </div>
                    </div>
                    <hr className='report-user-hr' />
                    <div className='report-user-btns'>
                        <button className='report-user-btn-cancel' type='button'
                            onClick={handleCloseBlockReport}>
                            Cancel
                        </button>
                        <button className='report-user-btn-submit' type='submit'>
                            Report
                        </button>
                    </div>
                </form>
            );
        } return null;
    };
};

export default BlockReportModalContent;
