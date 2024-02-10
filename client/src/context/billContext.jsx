import { createContext, useContext, useState } from "react";
import {
  createBillRequest,
  deleteBillRequest,
  getBillsRequest,
  getBillRequest,
  updateBillRequest,
} from "../api/bills"; // Make sure to implement these functions

import { toast } from 'react-toastify';

const BillContext = createContext();

export const useBills = () => {
  const context = useContext(BillContext);
  if (!context) throw new Error("useBills must be used within a BillProvider");
  return context;
};

export function BillProvider({ children }) {
  const [bills, setBills] = useState([]);

  const getBills = async () => {
    const res = await getBillsRequest();
    setBills(res.data);
  };

  const deleteBill = async (id) => {
    try {
      const res = await deleteBillRequest(id);
      if (res.status === 204) setBills(bills.filter((bill) => bill._id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const createBill = async (bill) => {
    try {
      console.log(bill);
      // Ensure to update this with the new bill fields
      let billData = {
        // Fill in the bill fields
      };

      const response = await createBillRequest(billData);
      
      if (response.status === 201) {
        setBills([...bills, response.data]);
        toast.success("Bill created!");
      }

      return response;
    } catch (error) {
      console.error(error);
      const errorMessage = error.response && error.response.data && error.response.data.message
                           ? error.response.data.message
                           : 'An unknown error occurred';
  
      toast.error(`Error: ${errorMessage}`);

      throw error;
    }
  };

  const getBill = async (id) => {
    try {
      const res = await getBillRequest(id);
      return res.data;
    } catch (error) {
      console.error(error);
    }
  };

  const updateBill = async (id, bill) => {
    try {
      console.log('Trying to update');
      const response = await updateBillRequest(id, bill);
      console.log(response);
      if (response.status === 200) {
        setBills(bills.map((item) => (item._id === id ? response.data : item)));
        return response;
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <BillContext.Provider
      value={{
        bills,
        getBills,
        deleteBill,
        createBill,
        getBill,
        updateBill,
      }}
    >
      {children}
    </BillContext.Provider>
  );
}
