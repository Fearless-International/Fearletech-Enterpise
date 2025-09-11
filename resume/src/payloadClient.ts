import axios from 'axios';

console.log('Axios:', axios);

const payloadClient = axios.create({
    baseURL: 'https://fearletech-enterpise.onrender.com/api', // Correct API endpoint
});

export default payloadClient;