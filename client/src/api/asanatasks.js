import axios from "./axios";

export const getAsanaTasksRequest = async () => axios.get("/asanatasks");

export const createAsanaTaskRequest = async (task) => axios.post("/asanatasks", task);

export const updateAsanaTaskRequest = async (task) =>
  axios.put(`/asanatasks/${task._id}`, task);

export const deleteAsanaTaskRequest = async (id) => axios.delete(`/asanatasks/${id}`);

export const getAsanaTaskRequest = async (id) => axios.get(`/asanatasks/${id}`);
