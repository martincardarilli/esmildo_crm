import { Router } from "express";
import {
  createPropiedad,
  deletePropiedad,
  getPropiedad,
  getPropiedades,
  getDeletedPropiedades,
  updatePropiedad,
} from "../controllers-database/propiedad.controller.js";
import { auth } from "../middlewares/auth.middleware.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { createPropiedadSchema } from "../schemas/propiedad.schema.js";

const router = Router();

router.get("/propiedades", auth, getPropiedades);

router.get("/propiedades/erased", auth, getDeletedPropiedades);

router.post("/propiedades", auth, validateSchema(createPropiedadSchema), createPropiedad);

router.get("/propiedades/:id", auth, getPropiedad);

router.put("/propiedades/:id", auth, validateSchema(createPropiedadSchema), updatePropiedad); /* (!) NO VALIDA ESQUEMA EN UPDATE ??? */

router.delete("/propiedades/:id", auth, deletePropiedad);

export default router;
