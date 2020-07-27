import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../../../../Actions';
import M from '../../../../logo.png';/* Logo */
import './index.css';

/* ThirdParty-Library */
import LazyImage from "../../../../../ThirdParty-Library/Lazy Image/LazyImage";

class Welcom extends Component {
    render() {
        let today = new Date(), curHr = today.getHours(), time = null;
        if (curHr >= 0 && curHr <= 4) {
            time = 'night';
        } else if (curHr >= 5 && curHr <= 11) {
            time = 'morning';
        } else if (curHr >= 12 && curHr <= 17) {
            time = 'afternoon';
        } else {
            time = 'night';
        }
        const { DBLoginStatus, LocalStorageLoginStatus } = this.props;
        const { firstname } = this.props.UserData;
        let emtyObject = {};
        if (!DBLoginStatus && !LocalStorageLoginStatus) return null;
        return (
            <div className='welcom-divWrapper'>
                <div className='welcom-innerDiv' draggable="false">
                    <LazyImage ClickImage={null} srcImage={M} 
                        altImage='logo' draggable="false"
                        style={emtyObject}
                        classImage=''
                        imageRef={null}
                    />
                    <h4 className='welcom-h4'>Good { time }, {firstname}</h4>
                </div>
            </div>
        );
    };
};

const mapStateToProps = getState => {
    if (getState.DBLoginStatus) {//login with db
        return {
            DBLoginStatus: getState.DBLoginStatus,
            LocalStorageLoginStatus: getState.LocalStorageLoginStatus,
            UserData: getState.DBUserData,
        };
    } return {
        DBLoginStatus: getState.DBLoginStatus,
        LocalStorageLoginStatus: getState.LocalStorageLoginStatus,
        UserData: getState.UserData,
    };
};

export default connect(mapStateToProps, actions)(Welcom);
