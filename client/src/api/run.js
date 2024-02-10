import axios from "./axios";

export const getRunsRequest = async () => axios.get("/run");

export const getRunRequest = async (id) => axios.get(`/run/${id}`); 


