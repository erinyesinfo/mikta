import { getUserData } from '../Actions/types.js';
import huntersRace from "../IMG/hunters-race-408744-unsplash.jpg";

const defaultState = {
    firstName: 'Jhon',
    lastName: 'Doe',
    emailaddress: '',
    username: '',
    portfolio: '',
    location: '',
    instagramUsername: '',
    twitterUsername: '',
    bio: '',
    interests: '',
    profileImage: huntersRace,
    checkMessage: false
};

const INIALSTATE = JSON.parse(localStorage.getItem("data")) || defaultState;

export default (state = INIALSTATE, action) => {
    switch (action.type) {
        case getUserData:
            return action.payload;
        default:
            return state;
    }
};