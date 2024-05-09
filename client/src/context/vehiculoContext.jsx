import { createContext, useContext, useState } from "react";
import {
  createVehiculoRequest,
  deleteVehiculoRequest,
  getVehiculosRequest,
  getDeletedVehiculosRequest,
  getVehiculoRequest,
  updateVehiculoRequest,
} from "../api/vehiculos.js"; // Asegúrate de tener estas funciones implementadas

import * as historyController from '../api/history.js';

//import { toast } from "react-toastify";

const VehiculoContext = createContext();

export const useVehiculos = () => {
  const context = useContext(VehiculoContext);
  if (!context)
    throw new Error("useVehiculos must be used within a VehiculoProvider");
  return context;
};

export function VehiculoProvider({ children }) {
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

  const deleteVehiculo = async (id) => {
    try {
        const res = await deleteVehiculoRequest(id);
        if (res.status === 204) {
            setVehiculos(prevVehiculos => prevVehiculos.filter(vehiculo => vehiculo._id !== id));
        } else {
            console.error('Failed to delete vehiculo with status:', res.status);
        }
        return res;
    } catch (error) {
        console.error('Failed to delete vehiculo:', error);
        // Opcional: rethrow el error si quieres manejarlo más arriba en la jerarquía de componentes
        throw error;
    }
};

  const createVehiculo = async (vehiculo) => {
    try {
      console.log(vehiculo);
      /* {id: 5, name: '123', address: '123', hourFee: '123'} */

      /* ESTO NECESITA ACTUALIZARSE CADA VEZ QUE SE AGREGA UN CAMPO NUEVO,
      
      O SER DINAMICO */

     /* let vehiculoFix = {
        fabricante: vehiculo.fabricante,
        modelo: vehiculo.modelo,
        año: vehiculo.año,
        patente: vehiculo.patente,
        km: vehiculo.km,
        valor: vehiculo.valor,
        estado: vehiculo.estado,
        color: vehiculo.color,
        puertas: vehiculo.puertas,
        traccion: vehiculo.traccion,
        motor: vehiculo.motor,
        ac: vehiculo.ac,
        dh: vehiculo.dh,
        propietario: vehiculo.propietario,

      }; */

       // Que le quite el id...
       delete vehiculo.id;
       console.log(vehiculo);

      const response = await createVehiculoRequest(vehiculo);

      //console.log(response);

      if (response.status === 201) {
        setVehiculos([
          ...vehiculos,
          response.data,
        ]); /* wtf? VER Vehiculo.CONTROLLER.JS */
        //toast.success("Cliente creado con éxito!");
        //toast.success("Vehiculo created!");
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

  const getVehiculo = async (id) => {
    try {
      const res = await getVehiculoRequest(id);
      return res.data;
    } catch (error) {
      console.error(error);
    }
  };

  const getVehiculoUpdates = async (id) => {
    try {
      //const res = await getVehiculoRequest(id);

   
      const res = await historyController.getChangesByDocument(id);

      console.log(res);
      // historyController.getChangesByDocument
      return res.data;
    } catch (error) {
      console.error(error);
    }
  };

  const updateVehiculo = async (id, vehiculo) => {
    try {
      //console.log(id);
      //console.log('1834 | updateVehiculo() > backend |' ,vehiculo);
      /*
      let vehiculoFix = {
        name: vehiculo.name,
        address: vehiculo.address,
        hourFee: vehiculo.hourFee
      };
      */
     
     // console.log("try to update");
      const response = await updateVehiculoRequest(id, vehiculo);
      console.log(response);
      if (response.status === 200) {
        setVehiculos(
          vehiculos.map((item) => (item._id === id ? response.data : item))
        );
        //toast.success("Vehiculo updated!");
        return response; 
      }
    } catch (error) {

      throw error;
    }
  };

  return (
    <VehiculoContext.Provider
      value={{
        vehiculos,
        getVehiculos,
        getDeletedVehiculos,
        deleteVehiculo,
        createVehiculo,
        getVehiculo,
        updateVehiculo,
        getVehiculoUpdates,
      }}
    >
      {children}
    </VehiculoContext.Provider>
  );
}
