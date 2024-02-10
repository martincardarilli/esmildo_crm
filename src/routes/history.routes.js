import { Router } from "express";

import * as historyController from '../controllers-database/history.controller.js';

import { auth } from "../middlewares/auth.middleware.js";

//import { validateSchema } from "../middlewares/validator.middleware.js";
//import { createCustomerSchema } from "../schemas/customer.schema.js";

const router = Router();

//router.get("/history/:id", auth, getCustomers);

router.get('/history/user/:id', auth, historyController.getChangesByUser);
router.get('/history/document/:id', auth, historyController.getChangesByDocument);

//router.post("/customers", auth, validateSchema(createCustomerSchema), createCustomer);

//router.get("/customers/:id", auth, getCustomer);

//router.put("/customers/:id", auth, validateSchema(createCustomerSchema), updateCustomer); /* (!) NO VALIDA ESQUEMA EN UPDATE ??? */

//router.delete("/customers/:id", auth, deleteCustomer);

export default router;
