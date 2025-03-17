import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://127.0.0.1:8000/api', // Sesuaikan dengan URL backend Laravel kamu
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    }
});

export default instance;
