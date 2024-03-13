import { createContext, useContext, useState } from "react";
import {
  createPropiedadRequest,
  deletePropiedadRequest,
  getVehiculosRequest,
  getDeletedVehiculosRequest,
  getPropiedadRequest,
  updatePropiedadRequest,
} from "../api/vehiculos.js"; // Asegúrate de tener estas funciones implementadas

import * as historyController from '../api/history.js';

//import { toast } from "react-toastify";

const PropiedadContext = createContext();

export const useVehiculos = () => {
  const context = useContext(PropiedadContext);
  if (!context)
    throw new Error("useVehiculos must be used within a PropiedadProvider");
  return context;
};

export function PropiedadProvider({ children }) {
  const [vehiculos, setVehiculos] = useState([]);

  const getVehiculos = async () => {
    const res = await getVehiculosRequest();
    setVehiculos(res.data);
  };

  const getDeletedVehiculos = async () => {

    try{

    const res = await getDeletedVehiculosRequest();
    //setVehiculos(res.data);

    return res;

    }catch(error){

      throw error;

    }

  };

  const deletePropiedad = async (id) => {
    try {
      const res = await deletePropiedadRequest(id);
      if (res.status === 204)
        setVehiculos(vehiculos.filter((vehiculo) => vehiculo._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const createPropiedad = async (vehiculo) => {
    try {
      console.log(vehiculo);
      /* {id: 5, name: '123', address: '123', hourFee: '123'} */

      /* ESTO NECESITA ACTUALIZARSE CADA VEZ QUE SE AGREGA UN CAMPO NUEVO,
      
      O SER DINAMICO */

      let vehiculoFix = {
        name: vehiculo.name,
        address: vehiculo.address,
        hourFee: vehiculo.hourFee,
      };

      const response = await createPropiedadRequest(vehiculoFix);

      //console.log(response);

      if (response.status === 201) {
        setVehiculos([
          ...vehiculos,
          response.data,
        ]); /* wtf? VER Propiedad.CONTROLLER.JS */
        //toast.success("Cliente creado con éxito!");
        //toast.success("Propiedad created!");
      }

      return response; // Devuelve la respuesta de axios
    } catch (error) {
      console.error(error);

      // Extrae el mensaje de error del backend
      /*const errorMessage =
        error.response && error.response.data && error.response.data.message
          ? error.response.data.message
          : "Ocurrió un error desconocido";

      toast.error(`Error: ${errorMessage}`);*/

      throw error; // Lanza el error para manejarlo en el componente
    }
  };

  const getPropiedad = async (id) => {
    try {
      const res = await getPropiedadRequest(id);
      return res.data;
    } catch (error) {
      console.error(error);
    }
  };

  const getPropiedadUpdates = async (id) => {
    try {
      //const res = await getPropiedadRequest(id);
      console.log('2207 B vehiculoContext starting | ');
   
      const res = await historyController.getChangesByDocument(id);
      console.log('2204 B vehiculoContext AFTER | ');
      console.log(res);
      // historyController.getChangesByDocument
      return res.data;
    } catch (error) {
      console.error(error);
    }
  };

  const updatePropiedad = async (id, vehiculo) => {
    try {
      //console.log(id);
      //console.log('1834 | updatePropiedad() > backend |' ,vehiculo);
      /*
      let vehiculoFix = {
        name: vehiculo.name,
        address: vehiculo.address,
        hourFee: vehiculo.hourFee
      };
      */
     
     // console.log("try to update");
      const response = await updatePropiedadRequest(id, vehiculo);
      console.log(response);
      if (response.status === 200) {
        setVehiculos(
          vehiculos.map((item) => (item._id === id ? response.data : item))
        );
        //toast.success("Propiedad updated!");
        return response; 
      }
    } catch (error) {

      throw error;
    }
  };

  return (
    <PropiedadContext.Provider
      value={{
        vehiculos,
        getVehiculos,
        getDeletedVehiculos,
        deletePropiedad,
        createPropiedad,
        getPropiedad,
        updatePropiedad,
        getPropiedadUpdates,
      }}
    >
      {children}
    </PropiedadContext.Provider>
  );
}
