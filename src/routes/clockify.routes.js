

/* DOCUMENTACION API OFICIAL 
https://docs.clockify.me/



This controllers works with EXTERNAL sources


*/


import { Router } from "express";
import {
  login,
  logout,
  register,
  verifyToken,
} from "../controllers/auth.controller.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { loginSchema, registerSchema } from "../schemas/auth.schema.js";

import { addTimeEntry, getUserIds, getProjects, getTasks, showListened, getClockifyTaskDetails, getWorkspaces  } from "../controllers-automation/clockify.controller.js";

const router = Router();

/* Example
    POST /addTimeEntry?taskId=12345&startTime=2023-12-07T08:00:00.000Z&endTime=2023-12-07T10:00:00.000Z&description=Work+on+project
*/

router.post("/listener/salt", showListened); // signing secret bfSFfuW72RUV9w3VJHVQwBEYUyLWgGTv

router.get("/getWorkspaces", getWorkspaces);
router.get("/getUsers", getUserIds);
router.get("/getProjects", getProjects);
router.get("/getTasks/:projectId", getTasks);

//router.post("/addTimeEntry/:taskId/:startTime/:endTime/:description", addTimeEntry);

//CHANGE TO QUERY PARAMETERS
router.post("/addTimeEntry", addTimeEntry);

//router.get('/tasks/:taskId', getClockifyTaskDetails);


export default router;
