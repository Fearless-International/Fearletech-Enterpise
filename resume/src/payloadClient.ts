import axios from 'axios';

console.log('Axios:', axios);

const payloadClient = axios.create({
    baseURL: 'http://localhost:3000/api', // Correct API endpoint
});

export default payloadClient;