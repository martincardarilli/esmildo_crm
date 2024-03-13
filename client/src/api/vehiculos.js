import axios from "./axios";

export const getVehiculosRequest = async () => axios.get("/vehiculos");

export const getDeletedVehiculosRequest = async () => axios.get("/vehiculos/erased");

export const createVehiculoRequest = async (vehiculo) => axios.post("/vehiculos", vehiculo);

export const updateVehiculoRequest = async (id, vehiculo) =>
  axios.put(`/vehiculos/${id}`, vehiculo);

export const deleteVehiculoRequest = async (id) => axios.delete(`/vehiculos/${id}`);

export const getVehiculoRequest = async (id) => axios.get(`/vehiculos/${id}`); 