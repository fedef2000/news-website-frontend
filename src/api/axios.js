import axios from 'axios';

export default axios.create({
    baseURL: 'https://sindaco-del-calciomercato.herokuapp.com/'
});