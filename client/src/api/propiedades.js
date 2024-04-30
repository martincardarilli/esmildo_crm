import axios from "./axios";

export const getPropiedadesRequest = async () => axios.get("/propiedades");

export const getDeletedPropiedadesRequest = async () => axios.get("/propiedades/erased");

export const createPropiedadRequest = async (propiedad) => axios.post("/propiedades", propiedad);

export const updatePropiedadRequest = async (id, propiedad) => axios.put(`/propiedades/${id}`, propiedad);

export const deletePropiedadRequest = async (id) => axios.delete(`/propiedades/${id}`);

export const getPropiedadRequest = async (id) => axios.get(`/propiedades/${id}`); 