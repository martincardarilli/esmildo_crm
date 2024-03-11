import { Router } from "express";
import {
  createCustomer,
  deleteCustomer,
  getCustomer,
  getCustomers,
  getDeletedCustomers,
  updateCustomer,
} from "../controllers-database/customer.controller.js";
import { auth } from "../middlewares/auth.middleware.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { createCustomerSchema } from "../schemas/customer.schema.js";

const router = Router();

router.get("/customers", auth, getCustomers);

router.get("/customers/erased", auth, getDeletedCustomers);

router.post("/customers", auth, validateSchema(createCustomerSchema), createCustomer);

router.get("/customers/:id", auth, getCustomer);

router.put("/customers/:id", auth, validateSchema(createCustomerSchema), updateCustomer); /* (!) NO VALIDA ESQUEMA EN UPDATE ??? */

router.delete("/customers/:id", auth, deleteCustomer);

export default router;
