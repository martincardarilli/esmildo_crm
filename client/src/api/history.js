import axios from "./axios";

export const getChangesByUser = async (id) => axios.get(`/history/user/${id}`);

export const getChangesByDocument = async (id) => axios.get(`/history/document/${id}`);
