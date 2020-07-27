import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../../../../Actions';
/* Logo */
import M from '../../../../../../IMG/mikta.svg';
import './Welcom.css';

/* ThirdParty-Library */
import LazyImage from "../../../../../ThirdParty-Library/Lazy Image/LazyImage";

const Welcom = ({ initialValues, LogIn }) => {
    const { firstName } = initialValues;
    if (!LogIn) return null;
    let emtyObject = {};
    return (
        <div className='welcom-divWrapper'>
            <div className='welcom-innerDiv'>
                <LazyImage ClickImage={null} srcImage={M} 
                    altImage='logo'
                    style={emtyObject}
                    classImage=''
                    imageRef={null}
                />
                {/* <img src={M} alt='logo' /> */}
                <h4 className='welcom-h4'>Good afternon, {firstName}</h4>
            </div>
        </div>
    );
};

const mapStateToProps = getState => {
    return {
        initialValues: getState.ProfileData,
        LogIn: getState.isLogIn,
    };
};

export default connect(mapStateToProps, actions)(Welcom);