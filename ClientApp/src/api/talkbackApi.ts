import axios from 'axios';
import { FormType } from '../types';

const talkbackApi = axios.create({
	baseURL: 'https://localhost:7025/',
	timeout: 3000,
});

export const login = async (form: FormType) => {
	return await talkbackApi.post('/login', form);
};

export const register = async (form: FormType) => {
	return await talkbackApi.post('/register', form);
};

export const refreshToken = async (token: string) => {
	return await talkbackApi.get('/refersh', {
		headers: { Authorization: `Bearer ${token}` },
	});
};

export default talkbackApi;
