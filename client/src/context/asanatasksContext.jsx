import { createContext, useContext, useState } from "react";
import {
  createAsanaTaskRequest,
  deleteAsanaTaskRequest,
  getAsanaTasksRequest,
  getAsanaTaskRequest,
  updateAsanaTaskRequest,
} from "../api/asanatasks";

const AsanaTaskContext = createContext();

export const useAsanaTasks = () => {
  const context = useContext(AsanaTaskContext);
  if (!context) throw new Error("useAsanaTasks must be used within a TaskProvider");
  return context;
};

export function AsanaTaskProvider({ children }) {
  const [Asanatasks, setAsanaTasks] = useState([]);

  const getAsanaTasks = async () => {
    const res = await getAsanaTasksRequest();
    setAsanaTasks(res.data);
  };

  const deleteAsanaTask = async (id) => {
    try {
      const res = await deleteAsanaTaskRequest(id);
      if (res.status === 204) setAsanaTasks(tasks.filter((task) => task._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const createAsanaTask = async (task) => {
    try {
      const res = await createAsanaTaskRequest(task);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getAsanaTask = async (id) => {
    try {
      const res = await getAsanaTaskRequest(id);
      return res.data;
    } catch (error) {
      console.error(error);
    }
  };

  const updateAsanaTask = async (id, task) => {
    try {
      await updateAsanaTaskRequest(id, task);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AsanaTaskContext.Provider
      value={{
        Asanatasks,
        getAsanaTasks,
        deleteAsanaTask,
        createAsanaTask,
        getAsanaTask,
        updateAsanaTask,
      }}
    >
      {children}
    </AsanaTaskContext.Provider>
  );
}
