import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:5000',
    withCredentials: true,
});

export const registerUser = (data) => API.post('/auth/register', data);
export const loginUser = (data) => API.post('/auth/login', data);
export const logoutUser = () => API.post('/auth/logout');
export const getMe = () => API.get('/auth/me');

export const createMatch = (formData) => API.post('/match/create', formData);
export const fetchDefaultPlayingXI = (formData) => API.post('/match/default_xi', formData);
export const fetchTossDetails = (id) => API.get(`/match/toss_details/${id}`);
export const updateTossDetails = (id, formData) => API.post(`/match/toss_details/${id}`, formData);
export const fetchIsTossDone = (id) => API.get(`/match/is_toss_done/${id}`);
export const fetchTeams = (id) => API.get(`/match/team_names/${id}`);
export const fetchInningNumber = (id) => API.get(`/match/inning_number/${id}`);

export const fetchBattingTeam = (id) => API.get(`/inning/batting_team/${id}`);
export const fetchBowlingTeam = (id) => API.get(`/inning/bowling_team/${id}`);