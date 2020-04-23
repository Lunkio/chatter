import axios from 'axios';
import { LoginData } from '../types';

const login = async (credentials: LoginData) => {
    const res = await axios.post('/api/login', credentials);
    return res.data;
};

export default { login };