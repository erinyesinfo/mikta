import { getDBUserData_type } from '../../Actions/types.js';
import profileImage from "../Icons/User.svg";

const defaultState = {
    firstname: '',
    lastname: '',
    email: '',
    username: '',
    portfolio: '',
    location: '',
    instagramUsername: '',
    twitterUsername: '',
    bio: '',
    interests: [ "wallpaper", "outdoor", "forest", "summer", "background" ],
    profileImage,
    checkMessage: false
};

const INIALSTATE = JSON.parse(localStorage.getItem("data-db")) || defaultState;

export default (state = INIALSTATE, action) => {
    switch (action.type) {
        case getDBUserData_type:
            return action.payload;
        default:
            return state;
    }
};