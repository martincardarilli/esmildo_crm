import { createContext, useContext, useState } from "react";
import {
  createPropiedadRequest,
  deletePropiedadRequest,
  getPropiedadesRequest,
  getDeletedPropiedadesRequest,
  getPropiedadRequest,
  updatePropiedadRequest,
} from "../api/propiedades.js"; // Asegúrate de tener estas funciones implementadas

import * as historyController from '../api/history.js';

//import { toast } from "react-toastify";

const PropiedadContext = createContext();

export const usePropiedades = () => {
  const context = useContext(PropiedadContext);
  if (!context)
    throw new Error("usePropiedades must be used within a PropiedadProvider");
  return context;
};

export function PropiedadProvider({ children }) {
  const [propiedades, setPropiedades] = useState([]);

  const getPropiedades = async () => {
    const res = await getPropiedadesRequest();
    setPropiedades(res.data);
  };

  const getDeletedPropiedades = async () => {

    try{

    const res = await getDeletedPropiedadesRequest();
    //setPropiedades(res.data);

    return res;

    }catch(error){

      throw error;

    }

  };

  const deletePropiedad = async (id) => {
    try {
      const res = await deletePropiedadRequest(id);
      if (res.status === 204)
        setPropiedades(propiedades.filter((propiedad) => propiedad._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const createPropiedad = async (propiedad) => {
    try {
      console.log("-----------------propiedad CONTEXT---------------");
      console.log(propiedad);
      console.log("-----------------propiedad CONTEXT (antes de enviar)---------------");

      // Que le quite el id...
//delete propiedad.id;
console.log(propiedad);


          const response = await createPropiedadRequest(propiedad);

      //console.log(response);

      if (response.status === 201) {
        setPropiedades([
          ...propiedades,
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

   
      const res = await historyController.getChangesByDocument(id);

      console.log(res);
      // historyController.getChangesByDocument
      return res.data;
    } catch (error) {
      console.error(error);
    }
  };

  const updatePropiedad = async (id, propiedad) => {
    try {
      //console.log(id);
      //console.log('1834 | updatePropiedad() > backend |' ,propiedad);
      /*
      let propiedadFix = {
        name: propiedad.name,
        address: propiedad.address,
        hourFee: propiedad.hourFee
      };
      */
     
     // console.log("try to update");
      const response = await updatePropiedadRequest(id, propiedad);
      console.log(response);
      if (response.status === 200) {
        setPropiedades(
          propiedades.map((item) => (item._id === id ? response.data : item))
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
        propiedades,
        getPropiedades,
        getDeletedPropiedades,
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
