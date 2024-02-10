import { createContext, useContext, useState } from "react";
import {
  createCustomerRequest,
  deleteCustomerRequest,
  getCustomersRequest,
  getDeletedCustomersRequest,
  getCustomerRequest,
  updateCustomerRequest,
} from "../api/customers"; // Asegúrate de tener estas funciones implementadas

import * as historyController from '../api/history.js';

//import { toast } from "react-toastify";

const CustomerContext = createContext();

export const useCustomers = () => {
  const context = useContext(CustomerContext);
  if (!context)
    throw new Error("useCustomers must be used within a CustomerProvider");
  return context;
};

export function CustomerProvider({ children }) {
  const [customers, setCustomers] = useState([]);

  const getCustomers = async () => {
    const res = await getCustomersRequest();
    setCustomers(res.data);
  };

  const getDeletedCustomers = async () => {

    try{

    const res = await getDeletedCustomersRequest();
    //setCustomers(res.data);

    return res;

    }catch(error){

      throw error;

    }

  };

  const deleteCustomer = async (id) => {
    try {
      const res = await deleteCustomerRequest(id);
      if (res.status === 204)
        setCustomers(customers.filter((customer) => customer._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const createCustomer = async (customer) => {
    try {
      console.log(customer);
      /* {id: 5, name: '123', address: '123', hourFee: '123'} */

      /* ESTO NECESITA ACTUALIZARSE CADA VEZ QUE SE AGREGA UN CAMPO NUEVO,
      
      O SER DINAMICO */

      let customerFix = {
        name: customer.name,
        address: customer.address,
        hourFee: customer.hourFee,
      };

      const response = await createCustomerRequest(customerFix);

      //console.log(response);

      if (response.status === 201) {
        setCustomers([
          ...customers,
          response.data,
        ]); /* wtf? VER CUSTOMER.CONTROLLER.JS */
        //toast.success("Cliente creado con éxito!");
        //toast.success("Customer created!");
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

  const getCustomer = async (id) => {
    try {
      const res = await getCustomerRequest(id);
      return res.data;
    } catch (error) {
      console.error(error);
    }
  };

  const getCustomerUpdates = async (id) => {
    try {
      //const res = await getCustomerRequest(id);
      console.log('2207 B customerContext starting | ');
   
      const res = await historyController.getChangesByDocument(id);
      console.log('2204 B customerContext AFTER | ');
      console.log(res);
      // historyController.getChangesByDocument
      return res.data;
    } catch (error) {
      console.error(error);
    }
  };

  const updateCustomer = async (id, customer) => {
    try {
      //console.log(id);
      //console.log('1834 | updateCustomer() > backend |' ,customer);
      /*
      let customerFix = {
        name: customer.name,
        address: customer.address,
        hourFee: customer.hourFee
      };
      */
     
     // console.log("try to update");
      const response = await updateCustomerRequest(id, customer);
      console.log(response);
      if (response.status === 200) {
        setCustomers(
          customers.map((item) => (item._id === id ? response.data : item))
        );
        //toast.success("Customer updated!");
        return response; 
      }
    } catch (error) {

      throw error;
    }
  };

  return (
    <CustomerContext.Provider
      value={{
        customers,
        getCustomers,
        getDeletedCustomers,
        deleteCustomer,
        createCustomer,
        getCustomer,
        updateCustomer,
        getCustomerUpdates,
      }}
    >
      {children}
    </CustomerContext.Provider>
  );
}
