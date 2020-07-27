import React from 'react';
import Profile from './Profile';
import Password from './Password';
import Close from './Close';
import './index.css';

const AccountSettings = ({ url, history }) => {
    if (url === "/account") {
        return <Profile history={history} />;
    } else if (url === "/account/password") {
        return <Password history={history} />;
    } else if (url === "/account/close") {
        return <Close history={history} />;
    } return null;
};

export default AccountSettings;
