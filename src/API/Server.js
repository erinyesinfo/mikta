import axios from "axios";

export default axios.create({
    baseURL: 'https://mikta.herokuapp.com',
    withCredentials: true
});
