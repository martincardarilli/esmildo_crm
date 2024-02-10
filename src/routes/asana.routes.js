
/* EXTERNAL */
/* Estoy utilizando "asana.routes.js para la request que proviene de Asana/Postman */

/* DOCUMENTACION API OFICIAL 
https://developers.asana.com/reference/createstoryfortask



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

import { taskWasClosed, registerWebhook, showListened, getAllWebhooks, deleteWebhook, getWorkspaces, getProjectDetails, getCustomFieldsDetails } from "../controllers-automation/asana.controller.js";

const router = Router();

router.post("/taskWasClosed:id", taskWasClosed);
router.post("/taskWasClosed", taskWasClosed);



// reactivity
router.post("/listener/salt", showListened);

/*


ATENCION: Falta el AUTH ACA

mirar asaanatask.routes.js como utiliza el Auth del middleware

ah, eso es porque lo copie de auth.routes.js este...
*/


// CRUD - Create/Delete/Update - Listener/Webhook registration

router.get('/custom_fields', getCustomFieldsDetails);
router.get('/workspaces', getWorkspaces);

router.post("/listener", registerWebhook);
router.get('/listener', getAllWebhooks);
router.delete('/listener/:id', deleteWebhook);

router.get('/project', getProjectDetails);

export default router;
