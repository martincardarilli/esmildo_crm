import { Router } from "express";
import {
  createVehiculo,
  deleteVehiculo,
  getVehiculo,
  getVehiculos,
  getDeletedVehiculos,
  updateVehiculo,
} from "../controllers-database/vehiculo.controller.js";
import { auth } from "../middlewares/auth.middleware.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { createVehiculoSchema } from "../schemas/vehiculo.schema.js";

const router = Router();

router.get("/vehiculos", auth, getVehiculos);

router.get("/vehiculos/erased", auth, getDeletedVehiculos);

router.post("/vehiculos", auth, validateSchema(createVehiculoSchema), createVehiculo);

router.get("/vehiculos/:id", auth, getVehiculo);

router.put("/vehiculos/:id", auth, validateSchema(createVehiculoSchema), updateVehiculo); /* (!) NO VALIDA ESQUEMA EN UPDATE ??? */

router.delete("/vehiculos/:id", auth, deleteVehiculo);

export default router;
