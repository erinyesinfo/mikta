import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../../../../Actions';
import './UnsplashTerm.css';

class UnsplashTerm extends Component {
    // hide userAgreement forever
    handleHideUnsplashTerm = () => this.props.isUnsplashTerm(true);
    render() {
        const { UnplashTerm, LogIn, initialValues } = this.props;
        if (UnplashTerm) return null;
        if (LogIn) {
            const { firstName } = initialValues;
            return (
                <div className='term-divWrapper'>
                    <div className='term-innerDiv'>
                        Hi {firstName}, every image you see is based on the <strong>unsplash api</strong>
                    </div>
                    <button onClick={this.handleHideUnsplashTerm} type='button'>
                        X
                    </button>
                </div>
            );
        }
        return (
            <div className='term-divWrapper'>
                <div className='term-innerDiv'>
                    Hi whatever your name is, every image you see is based on the <strong>unsplash api</strong>
                </div>
                <button onClick={this.handleHideUnsplashTerm} type='button'>
                    X
                </button>
            </div>
        );
    };
};


const mapStateToProps = getState => {
    return {
        UnplashTerm: getState.isUnplashTerm,
        initialValues: getState.ProfileData,
        LogIn: getState.isLogIn,
    }
};

export default connect(mapStateToProps, actions)(UnsplashTerm);
