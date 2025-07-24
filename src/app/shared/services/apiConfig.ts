
import axios from 'axios';
import { Environment } from '../environment';

export const Api = () => {
    return axios.create({
        baseURL: Environment.URL_BASE,
    });
};