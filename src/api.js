import axios from 'axios';

const API = axios.create({ 
  baseURL: 'http://localhost:5001/api' 
});

// ✅ 'signup' ko badal kar 'signUp' (Capital U) kar diya hai taaki Signup.jsx se match ho jaye
export const signUp = (data) => API.post('/auth/signup', data);

export const login = (data) => API.post('/auth/login', data);

export const fetchDonors = (bg, loc) => API.get(`/donors/search?bloodGroup=${bg}&location=${loc}`);