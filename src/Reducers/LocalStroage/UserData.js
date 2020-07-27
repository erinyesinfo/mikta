import { getUserData_type } from '../../Actions/types.js';
import profileImage from "../Icons/User.svg";

const defaultState = {
    firstname: 'Jhon',
    lastname: 'Doe',
    email: 'jhonDoe@gmail.com',
    username: 'jhonDoe',
    portfolio: '',
    location: '',
    instagramUsername: '',
    twitterUsername: '',
    bio: '',
    interests: [ "wallpaper", "outdoor", "forest", "summer", "background" ],
    profileImage,
    checkMessage: false
};

const INIALSTATE = JSON.parse(localStorage.getItem("data")) || defaultState;

export default (state = INIALSTATE, action) => {
    switch (action.type) {
        case getUserData_type:
            return action.payload;
        default:
            return state;
    }
};