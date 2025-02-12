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
export const fetchMatchStatus = (id) => API.get(`/match/match_status/${id}`);

export const fetchBattingTeam = (id) => API.get(`/inning/batting_team/${id}`);
export const fetchBowlingTeam = (id) => API.get(`/inning/bowling_team/${id}`);
export const fetchScore = (id) => API.get(`/inning/fetch_scoreboard/${id}`);
export const fetchScorecard = (id, formData) => API.post(`/inning/fetch_scorecard/${id}`, formData);
export const fetchBattingScorecard = (id) => API.get(`/inning/batting_scorecard/${id}`);
export const fetchBowlingScorecard = (id) => API.get(`/inning/bowling_scorecard/${id}`);
export const fetchStriker = (id) => API.get(`/inning/striker/${id}`);
export const fetchNonStriker = (id) => API.get(`/inning/non_striker/${id}`);
export const fetchBowler = (id) => API.get(`/inning/bowler/${id}`);
export const fetchStrikerStats = (id) => API.get(`/inning/striker_stats/${id}`);
export const fetchNonStrikerStats = (id) => API.get(`/inning/nonstriker_stats/${id}`);
export const fetchBowlerStats = (id) => API.get(`/inning/bowler_stats/${id}`);

export const fetchAvailableBatsmen = (id) => API.get(`/inning/available_batsmen/${id}`);
export const addNewBatsman = (id, formData) => API.post(`/inning/add_new_batsman/${id}`, formData);

export const fetchAvailableBowlers = (id) => API.get(`/inning/available_bowlers/${id}`);
export const updateBowler = (id, formData) => API.post(`/inning/update_bowler/${id}`, formData);

export const throwDelivery = (id) => API.get(`/inning/throw_delivery/${id}`);