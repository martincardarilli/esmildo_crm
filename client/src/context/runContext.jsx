import { createContext, useContext, useState } from "react";
import {
  getRunsRequest, getRunRequest
} from "../api/run";

const RunContext = createContext();

export const useRuns = () => {
  const context = useContext(RunContext);
  if (!context) throw new Error("useRuns must be used within a TaskProvider");
  return context;
};

export function RunProvider({ children }) {
  const [runs, setRuns] = useState([]);

  const getRuns = async () => {
    const res = await getRunsRequest();
    setRuns(res.data);
  };

  const getRun = async (id) => {
    try {
      const res = await getRunRequest(id);
      return res.data;
    } catch (error) {
      console.error(error);
    }
  };

  /*
  const deleteTask = async (id) => {
    try {
      const res = await deleteTaskRequest(id);
      if (res.status === 204) setTasks(tasks.filter((task) => task._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const createTask = async (task) => {
    try {
      const res = await createTaskRequest(task);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getTask = async (id) => {
    try {
      const res = await getTaskRequest(id);
      return res.data;
    } catch (error) {
      console.error(error);
    }
  };

  const updateTask = async (id, task) => {
    try {
      await updateTaskRequest(id, task);
    } catch (error) {
      console.error(error);
    }
  };
  */

  return (
    <RunContext.Provider
      value={{
        runs,
        getRuns,
        getRun,
      }}
    >
      {children}
    </RunContext.Provider>
  );
}
