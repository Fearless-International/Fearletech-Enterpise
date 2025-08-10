import axios from 'axios';

console.log('Axios:', axios);

const payloadClient = axios.create({
    baseURL: 'https://content.fearlessint.com:3000/api', // Correct API endpoint
});

export default payloadClient;
