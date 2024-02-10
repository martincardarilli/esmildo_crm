/* Estoy utilizando "asanatask.routes.js para las registradas dentro de la base de datos Mongo DB */
/* Estoy utilizando "asana.routes.js para la request que proviene de Asana/Postman */

import { Router } from "express";
import {
  createAsanaTask,
  deleteAsanaTask,
  getAsanaTask,
  getAsanaTasks,
  updateAsanaTask,
} from "../controllers-database/asanatask.controllers.js";
import { auth } from "../middlewares/auth.middleware.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { createAsanaTaskSchema } from "../schemas/asanatask.schema.js";

const router = Router();

router.get("/asanatasks", auth, getAsanaTasks);

router.post("/asanatasks", auth, validateSchema(createAsanaTaskSchema), createAsanaTask);

router.get("/asanatasks/:id", auth, getAsanaTask);

router.put("/asanatasks/:id", auth, updateAsanaTask); /* (!) NO VALIDA ESQUEMA EN UPDATE ??? */

router.delete("/asanatasks/:id", auth, deleteAsanaTask);

export default router;
