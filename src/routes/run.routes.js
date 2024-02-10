import { Router } from "express";

import * as runController from '../controllers-database/run.controller.js';

import { auth } from "../middlewares/auth.middleware.js";

//import { validateSchema } from "../middlewares/validator.middleware.js";
//import { createCustomerSchema } from "../schemas/customer.schema.js";

const router = Router();

//router.get("/history/:id", auth, getCustomers);

router.get('/run', auth, runController.getRuns);

router.get('/run/:id', auth, runController.getRun);

//router.get('/run/user/:id', auth, historyController.getChangesByUser);
//router.get('/run/document/:id', auth, historyController.getChangesByDocument);

//router.post("/customers", auth, validateSchema(createCustomerSchema), createCustomer);

//router.get("/customers/:id", auth, getCustomer);

//router.put("/customers/:id", auth, validateSchema(createCustomerSchema), updateCustomer); /* (!) NO VALIDA ESQUEMA EN UPDATE ??? */

//router.delete("/customers/:id", auth, deleteCustomer);

export default router;
