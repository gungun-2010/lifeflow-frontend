import axios from "axios";

const API = axios.create({
  baseURL: "https://lifeflow-backend-5rm3.onrender.com/api"
});

export const signUp = (data) =>
  API.post("/auth/signup", data);

export const login = (data) =>
  API.post("/auth/login", data);

export const fetchDonors = (bg, loc) =>
  API.get(
    `/donors/search?bloodGroup=${bg}&location=${loc}`
  );

export default API;

