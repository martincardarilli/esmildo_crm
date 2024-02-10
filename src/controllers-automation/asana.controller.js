import axios from "axios";
import AsanaTask from "../models/asanatask.model.js";

/* DOCUMENTACION API OFICIAL 
https://developers.asana.com/reference/createstoryfortask



This controllers works with EXTERNAL sources


*/

import Asana from "asana";
import { write } from "fs";

import Run from "../models/run.model.js"; // Asegúrate de importar el modelo Run correctamente

let client = Asana.ApiClient.instance;
let token = client.authentications["token"];

/* CONFIGURACION */
token.accessToken = "1/1204955379511689:4ecb5e6c07c20d2cb261a1073ed0a649";


// Replace these with your actual values
const accessToken = "1/1204955379511689:4ecb5e6c07c20d2cb261a1073ed0a649"; //martincardarilli Asana

//const projectId = 'your_project_id';
//const projectId = "1205821636681805"; // test Project 1205821636681805 Asana
const projectId = "1203873314001101";// SALT SUPPORT BOARD 1203873314001101

const webhookUrl = "https://crm.rize.bm/api/asana/listener/salt";



const customFieldTaskId = "1206185119112525"; // Reemplaza con el ID real del campo para "Clockify Task ID"
const customFieldProjectId = "1206246471974620"; // Reemplaza con el ID real del campo para "Clockify Project ID"

const Asana_ID_columna_SYNC_Clockify = '1206471213350251'; //Asana
// YES VALUE IS =  "1206471213350252",

/*
"enum_options": [
{
"gid": "1206471213350252",
"color": "green",
"enabled": true,
"name": "Yes",
"resource_type": "enum_option"
},
{
"gid": "1206471213350253",
"color": "red",
"enabled": true,
"name": "No",
"resource_type": "enum_option"
}
],
*/
// para chequear con non-triggers columns y cortar la funcion del listener en Clockify<>Asana automation

import {
      getClockifyTaskDetails,
      getClockifyTimeEntriesForTask,
      deleteClockifyTimeEntry,
      createClockifyTask
} from "./clockify.controller.js";

function writeComment(body, task_gid) {
      let storiesApiInstance = new Asana.StoriesApi();
      storiesApiInstance.createStoryForTask(body, task_gid).then(
            (result) => {
                  console.log(
                        "API called successfully. Returned data: " +
                        JSON.stringify(result.data, null, 2)
                  );
            },
            (error) => {
                  console.error(error.response.body);
            }
      );
}

export const taskWasClosed = async (req, res) => {
      let taskDetails;
      try {
            // console.log(req);
            console.log(req.body);

            const taskId = req.body.id; // Obtén el ID de la tarea desde req.params

            // Configura las opciones de la solicitud, incluyendo el token Bearer
            const config = {
                  headers: {
                        Authorization:
                              "Bearer 1/1204955379511689:4ecb5e6c07c20d2cb261a1073ed0a649", // Reemplaza YOUR_BEARER_TOKEN con tu token real
                  },
            };

            // Realiza una solicitud GET a la API de Asana para obtener detalles de la tarea
            const response = await axios.get(
                  `https://app.asana.com/api/1.0/tasks/${taskId}`,
                  config
            );

            if (response.data.data && response.data.data.custom_fields) {
                  /* Si la respuesta API existe y tiene las variables que necesitamos */

                  taskDetails = response.data; // Datos de la tarea

                  let SALT = false;
                  // Verificar si el proyecto se llama "SALT Support"
                  if (
                        taskDetails.data.memberships.some(
                              (membership) => membership.project.name === "SALT Support"
                        )
                  ) {
                        // La tarea está asociada al proyecto "SALT Support"
                        // Coloca aquí la lógica que deseas ejecutar si se cumple esta condición.
                        console.log("La tarea está asociada al proyecto 'SALT Support'");
                        SALT = true;
                  } else {
                        // La tarea no está asociada al proyecto "SALT Support"
                        // Coloca aquí la lógica que deseas ejecutar si no se cumple esta condición.
                        console.log("La tarea no está asociada al proyecto 'SALT Support'");
                        SALT = false;
                  }

                  let actualTime;

                  if ("actual_time_minutes" in response.data.data) {
                        // Si existe, aunque sea null
                        actualTime = response.data.data.actual_time_minutes / 60; //minutos
                  } else {
                        // Aca entraria en el caso que no sea ni si quiera null, osea no es parte del array response porque no tiene el campo/columna linkeado a la Task en absoluto
                        console.log("No tiene Actual Time como Columna");

                        let body = {
                              data: {
                                    html_text: `<body><strong>AWS SERVER</strong> <em>Notifies</em> that the Task board doesn't seem to have <strong>"Actual time"</strong> configured.</body>`,
                              },
                        }; // Object | The story to create.

                        writeComment(body, taskId);
                  }
                  // CONFIGURACION --------------------------------------------------------- CONFIGURACION DE PARAMETRO

                  const customField = taskDetails.data.custom_fields.find(
                        (field) => field.name === "Customer" // CONFIGURACION --------------------------------------------------------- CONFIGURACION DE PARAMETRO
                  );

                  if (customField) {
                        const displayValue = customField.display_value;
                        console.log(`El valor de "Customer" es: ${displayValue}`);

                        if (displayValue == null) {
                              // El campo Customer existe, y esta vacio

                              if (!SALT) {
                                    // El campo Customer existe, y esta vacio y la tarea no pertenece a "SALT Support" dashboard
                                    console.log("Se procede a re-abrir el Task");

                                    await axios.put(
                                          `https://app.asana.com/api/1.0/tasks/${taskId}`,
                                          { data: { completed: false } },
                                          config
                                    );

                                    let body = {
                                          data: {
                                                html_text: `<body><strong>[ ! ] Attention please; AWS SERVER </strong><em>Re-opened</em> due to incomplete information. Kindly complete <strong>"Customer" and "Actual time", required</strong> fields for <strong>closed</strong> state. Thank you for a job well done! <em>(Customer = "${displayValue}"; Actual time = "${actualTime}" hours).</em></body>`,
                                          },
                                    }; // Object | The story to create.

                                    writeComment(body, taskId);
                              } else {
                                    // El campo Customer existe, y esta vacio pero la tarea pertenece a "SALT Support" dashboard

                                    let body = {
                                          data: {
                                                html_text: `<body><strong>AWS SERVER</strong> <em>Checked</em> "Customer" isn't required as Task belongs to SALT dashboard. Actual time = ${actualTime} hours. Thank you for a job well done!</body>`,
                                          },
                                    }; // Object | The story to create.

                                    try {
                                          const newTask = new AsanaTask({
                                                gid: taskDetails.data.gid,
                                                title: taskDetails.data.name,
                                                description: taskDetails.data.name,
                                                actual_time: actualTime,
                                                customer: SALT ? "SALT" : displayValue,
                                          });
                                          await newTask.save();
                                    } catch (error) {
                                          console.log(
                                                "Error trying to create the AsanaTask record in Mongo DB "
                                          );
                                    }

                                    writeComment(body, taskId);
                              }
                        } else {
                              console.log("Task queda cerrada");

                              let body = {
                                    data: {
                                          html_text: `<body><strong>AWS SERVER</strong> <em>Checked</em> "Customer" required field as "${displayValue}". Actual time = ${actualTime} hours. Thank you for a job well done!</body>`,
                                    },
                              }; // Object | The story to create.

                              try {
                                    const newTask = new AsanaTask({
                                          gid: taskDetails.data.gid,
                                          title: taskDetails.data.name,
                                          description: taskDetails.data.name,
                                          actual_time: actualTime,
                                          customer: SALT ? "SALT" : displayValue,
                                    });
                                    await newTask.save();
                              } catch (error) {
                                    console.log(
                                          "Error trying to create the AsanaTask record in Mongo DB "
                                    );
                              }

                              writeComment(body, taskId);
                        }
                  } else {
                        console.log("No se encontró un campo con nombre 'Customer'");

                        if (!SALT) {
                              let body = {
                                    data: {
                                          html_text: `<body><strong>AWS SERVER</strong> <em>Notifies</em> that the Task board doesn't seem to have <strong>"Customer"</strong> configured.</body>`,
                                    },
                              }; // Object | The story to create.

                              writeComment(body, taskId);
                        }
                  }
            } else {
                  console.log(
                        "No se encontraron datos de custom_fields en la respuesta API de Asana."
                  );
            }

            return res.status(200).json(taskDetails);
      } catch (error) {
            console.error("Error al obtener detalles de la tarea:", error);
            return res
                  .status(500)
                  .json({ message: "Error al obtener detalles de la tarea" });
      }
};

/*
import AsanaTask from "../models/asanatask.model.js";


ESTO LO VAMOS A USAR PARA REGISTRAR LA COMPLETED TASKS EN NUESTRO SISTEMA
*/
/*
export const createAsanaTask = async (req, res) => {
  try {
    const { title, description, date } = req.body;
    const newTask = new AsanaTask({
      title,
      description,
      date,
      user: req.user.id,
    });
    await newTask.save();
    res.json(newTask);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
*/


// Esto se triggea cuando se crea un timestamp en Asana
export const showListened = async (req, res) => {
      // Crear una nueva instancia de Run
      const newRun = new Run({
            timestamp: new Date(), // Fecha y hora actual
            automationName: "Clockify <> Asana ~ New timestamp added/erased/modified",
            description: "",
            //tag: "Healthy",
            tag: "",
            info: [], // Inicialmente vacío
      });

      console.log("Webhook event received:", JSON.stringify(req.body, null, 2));

      newRun.info.push(JSON.stringify(req.body));

      // Aca hace el handshake cuando CREA (post) un listener nuevo
      // Check for X-Hook-Secret header to handle the handshake
      if (req.headers["x-hook-secret"]) {
            newRun.info.push("New listener created");
            newRun.tag = "New listener";

            res.set("X-Hook-Secret", req.headers["x-hook-secret"]);
            res.status(200).send("Handshake response sent");

            try {
                  await newRun.save();
                  console.log("Run guardado con éxito");
            } catch (error) {
                  console.error("Error al guardar Run:", error);
                  // Manejar el error o enviar una respuesta de error
            }
            return;//termina la funcion, no devuelve nada pero hace el hanndhsake con asana
      }
      // Aca hace el handshake cuando CREA (post) un listener nuevo

      const events = req.body.events;

      // En caso de que sea una request random que no venga de Asana
      if (!events) {
            return;
      }

      // este es el loop de los eventos :)
      for (const event of events) {


            if (event.action === 'changed' && event.change.field === 'custom_fields') {
                  const newValue = event.change.new_value;

                  if (newValue.gid !== Asana_ID_columna_SYNC_Clockify) {
                        console.log('Ignore run, a 3rd custom field has been changed');
                        //res.status(200).send('Evento recibido');
                        //return; // Esto terminará la ejecución de la función
                        continue;
                        // Si recibe un cambio de un custom update que nada que ver, y el Yes/No o el Timestamp al mismo tiempo, osea dos eventos distintos simultaneos, no va adjear que el otro evento se ejecute
                  }
            }




            let asanaTaskId;

            if (event.parent) {
                  asanaTaskId = event.parent.gid;
            } else {
                  asanaTaskId = event.resource.gid;
            }


            if (event.resource.resource_subtype === "time_tracking_entry_added") {
                  console.log("--- TIMESTAMP ADDED --- TASK ID = ", asanaTaskId);
            }

            if (event.resource.resource_subtype === "time_tracking_entry_removed") {
                  console.log("--- TIMESTAMP ERASED --- TASK ID = ", asanaTaskId);
            }

            const taskDetails = await getTaskDetails(asanaTaskId);

            newRun.info.push(JSON.stringify(taskDetails));

            // Process the task details as needed
            console.log("-----------TASK DETAILS ASANA starts------------");
            console.log(JSON.stringify(taskDetails, null, 2));
            console.log("-----------TASK DETAILS ASANA ends------------");

            if (!taskDetails) {
                  console.log("Error al obtener task details. continue")
                  continue;
            }

            // Extrae los IDs de Clockify de los campos personalizados
            let clockifyProjectId = taskDetails.data.custom_fields.find(
                  (field) => field.name === "Clockify Project ID"
            )?.display_value;

            let clockifyTaskId = taskDetails.data.custom_fields.find(
                  (field) => field.name === "Clockify Task ID"
            )?.display_value;

            // Busca la columna en Asana que especifica si la tarea debe ser sincronizada o no con Clockify
            let syncYesNo = taskDetails.data.custom_fields.find(
                  (field) => field.name === "SYNC Clockify?"
            )?.display_value;

            console.log("/ ! / Task wants to be sychronized? ", syncYesNo);

            if (syncYesNo == "Yes") {

                  // Verifica si los IDs de Clockify están disponibles
                  if (!clockifyProjectId || !clockifyTaskId) {

                        console.log("Faltan IDs de Clockify para la tarea.");
                        newRun.description = "Clockify IDs missing & SYNC = No";
                        newRun.tag = "Warning";
                        //continue; // Salta al siguiente evento si falta algún ID




                        //aca sacamos el segundo if




                        newRun.info.push("New listener created");
                        newRun.tag = "New listener";
                        newRun.description = "New Clockify Task";

                        let clockifyTask;

                        try {
                              clockifyTask = await createClockifyTask(null, taskDetails.data.name);

                        } catch (error) {
                              console.error("Error al crear nueva Tarea en Clockify SYNC yes:", error);
                              newRun.info.push("Error new Clockify Task created"); // ESTE NO ANDA???????????????
                              newRun.tag = "Error New Clockify Task";
                              // Manejar el error o enviar una respuesta de error
                        }



                        if (clockifyTask) { // Si se creo la tarea en Clockify con exito
                              // Prepara los datos de actualización para Asana


                              newRun.info.push("New Clockify Task created");
                              newRun.tag = "New Clockify Task";
                              console.log("New Clockify Task created");


                              const clockifyTaskFieldId = taskDetails.data.custom_fields.find(
                                    (field) => field.name === "Clockify Task ID"
                              )?.gid;


                              const clockifyProjectFieldId = taskDetails.data.custom_fields.find(
                                    (field) => field.name === "Clockify Project ID"
                              )?.gid;


                              const asanaTaskUpdateData = {
                                    custom_fields: {
                                          // Asegúrate de usar los IDs de campos personalizados correctos aquí
                                          [clockifyProjectFieldId]: clockifyTask.projectId,
                                          [clockifyTaskFieldId]: clockifyTask.id
                                    }
                              };

                              // Actualiza la tarea en Asana
                              await updateAsanaTask(taskDetails.data.gid, asanaTaskUpdateData);

                              // Las almacenamos para usarlas luego, porque el Task Details de Asana no los tenia, por eso lo creamos
                              clockifyProjectId = clockifyTask.projectId;
                              clockifyTaskId = clockifyTask.id;

                        } else {
                              newRun.info.push("Error when trying to create new Clockify Task");
                              newRun.description = "Error when trying to create new Clockify Task";// ESTE NO ANDA???????????????
                              newRun.tag = "Error New Clockify Task";
                        }

                  }

            } else {
                  console.log("Jumps to next event")
                  continue; // Salta al siguiente evento si no se quiere actualizar
            }

            // AQUI OBTENEMOS LA CANTIDAD DE TIEMPO
            const taskTimeEntries = await getTimeEntriesForTask(asanaTaskId);

            newRun.info.push(JSON.stringify(taskTimeEntries));

            console.log("-----------TIMESTAMPS ASANA starts------------");
            console.log(JSON.stringify(taskTimeEntries, null, 2));
            console.log("-----------TIMESTAMPS ASANA ends------------");

            const ClockifyTaskDetails = await getClockifyTaskDetails(
                  clockifyProjectId,
                  clockifyTaskId
            );

            console.log("-----------TASK DETAILS CLOCKIFY starts------------");
            console.log(JSON.stringify(ClockifyTaskDetails, null, 2));
            console.log("-----------TASK DETAILS CLOCKIFY ends------------");


            newRun.info.push(JSON.stringify(ClockifyTaskDetails));

            const ClockifyTimeEntriesForTask = await getClockifyTimeEntriesForTask(
                  clockifyTaskId
            );

            newRun.info.push(JSON.stringify(ClockifyTimeEntriesForTask));

            console.log("-----------TIMESTAMPS CLOCKIFY starts------------");
            console.log(JSON.stringify(ClockifyTimeEntriesForTask, null, 2));
            console.log("-----------TIMESTAMPS CLOCKIFY ends------------");

            const timestampsAsana = taskTimeEntries.data;
            const timestampsClockify = ClockifyTimeEntriesForTask;

            /*const timestampsFaltantes = [];

            timestampsAsana.forEach(async (asana) => {
                  const fechaAsana = asana.entered_on;
                  const duracionAsana = asana.duration_minutes;
                  let existeEnClockify = false;

                  console.log(fechaAsana);
                  console.log(duracionAsana);

                  timestampsClockify.forEach((clockify) => {
                        const fechaClockify = new Date(clockify.timeInterval.start)
                              .toISOString()
                              .split("T")[0];

                        console.log(fechaClockify);

                        const duracionClockify = Math.round(
                              (new Date(clockify.timeInterval.end) -
                                    new Date(clockify.timeInterval.start)) /
                              60000
                        );

                        console.log(duracionClockify);

                        if (
                              fechaAsana === fechaClockify &&
                              duracionAsana === duracionClockify // AGREGAR LA 3ER CONDICION
                        ) {
                              existeEnClockify = true;
                        }
                  });

                  if (!existeEnClockify) {
                        timestampsFaltantes.push({
                              fecha: fechaAsana,
                              duracion: duracionAsana,
                        });

                        const startTime = new Date(`${fechaAsana}T12:00:00Z`).toISOString();
                        const endTime = new Date(
                              new Date(`${fechaAsana}T12:00:00Z`).getTime() + duracionAsana * 60000
                        ).toISOString();
                        const description = "";
                        const projectId = clockifyProjectId;
                        const taskId = clockifyTaskId;

                        // Constructing the URL with query parameters
                        const url = `https://crm.rize.bm/api/clockify/addTimeEntry?startTime=${startTime}&endTime=${endTime}&description=${encodeURIComponent(
                              description
                        )}&projectId=${projectId}&taskId=${taskId}`;

                        try {
                              // Making the POST request
                              const response = await axios.post(url);
                              console.log("Time entry added:", response.data);
                              // Handle the response as needed
                        } catch (error) {
                              console.error(
                                    "Error adding time entry:",
                                    error.response ? error.response.data : error.message
                              );
                              // Handle the error as needed
                        }
                  }
            });

            console.log("Timestamps missing at Clockify:", timestampsFaltantes);

            newRun.info.push(`Timestamps missing at Clockify:`);
            //newRun.info.push(timestampsFaltantes); ATTENTION

            // CALCULA LOS TIMESTAMPS SOBRANTES

            const timestampsSobrantes = [];

            // Para cada timestamp de Clockify, verifica si existe en Asana
            timestampsClockify.forEach(async (clockify) => {
                  const fechaClockify = new Date(clockify.timeInterval.start)
                        .toISOString()
                        .split("T")[0];
                  const duracionClockify = Math.round(
                        (new Date(clockify.timeInterval.end) -
                              new Date(clockify.timeInterval.start)) /
                        60000
                  );

                  console.log(fechaClockify);
                  console.log(duracionClockify);

                  const existeEnAsana = timestampsAsana.some((asana) => {
                        const fechaAsana = asana.entered_on;
                        const duracionAsana = asana.duration_minutes;

                        console.log(fechaAsana);
                        console.log(duracionAsana);

                        return (
                              fechaClockify === fechaAsana && duracionClockify === duracionAsana // agregar tercer parametro
                        );
                  });

                  if (!existeEnAsana) {
                        // Si el timestamp de Clockify no tiene correspondencia en Asana, elimínalo
                        timestampsSobrantes.push({
                              fecha: fechaClockify,
                              duracion: duracionClockify,
                        });
                        await deleteClockifyTimeEntry(clockify.id);
                  }
            });

            newRun.info.push(`Timestamps excess at Clockify:`);
            //  newRun.info.push(timestampsSobrantes); ATTENTION
            */



            // Luego, en tu función principal, llamarías a estas funciones de esta manera:
            const conteoAsana = contarTimestampsAsana(timestampsAsana);
            const conteoClockify = contarTimestampsClockify(timestampsClockify);

            console.log("------------ conteo Asana -- STARTS ---------");
            console.log(conteoAsana);
            console.log("------------ conteo Asana -- ends ---------");

            console.log("------------ conteo Clockify -- STARTS ---------");
            console.log(JSON.stringify(conteoClockify));
            /*
            {"2024-01-29:60":{"count":3,"timestamps":[{"id":"65b7f538dad9667d2a88342f"},{"id":"65b7fc73dad9667d2a883d7b"},{"id":"65b7fc917ab3aa1c51336796"}]}}
            */
            console.log("------------ conteo Clockify -- ends ---------");


            const { timestampsFaltantes, timestampsSobrantes } = await reconciliarTimestamps(conteoAsana, conteoClockify);

            // Timestamps faltantes en Clockify: [ { fecha: '2024-01-29', duracion: 60, conteoFaltante: 5 } ]
            for (const timestampsFaltante of timestampsFaltantes) {
                  for (let i = 0; i < timestampsFaltante.conteoFaltante; i++) {
                        const startTime = new Date(`${timestampsFaltante.fecha}T12:00:00Z`).toISOString();
                        const endTime = new Date(
                              new Date(`${timestampsFaltante.fecha}T12:00:00Z`).getTime() + timestampsFaltante.duracion * 60000
                        ).toISOString();
                        const description = "";
                        const projectId = clockifyProjectId;
                        const taskId = clockifyTaskId;

                        // Constructing the URL with query parameters
                        const url = `https://crm.rize.bm/api/clockify/addTimeEntry?startTime=${startTime}&endTime=${endTime}&description=${encodeURIComponent(
                              description
                        )}&projectId=${projectId}&taskId=${taskId}`;

                        try {
                              // Making the POST request
                              const response = await axios.post(url);
                              console.log("Time entry added:", response.data.id);
                              // Handle the response as needed
                        } catch (error) {
                              console.error(
                                    "Error adding time entry:",
                                    error.response ? error.response.data : error.message
                              );
                              // Handle the error as needed
                        }
                  }
            }

            // Eliminar timestamps sobrantes en Clockify
            for (const timestampSobrante of timestampsSobrantes) {
                  await deleteClockifyTimeEntry(timestampSobrante.id);
            }

            console.log("Timestamps faltantes en Clockify:", timestampsFaltantes);
            console.log("Timestamps sobrantes en Clockify:", timestampsSobrantes);

            newRun.info.push(JSON.stringify(conteoAsana));
            newRun.info.push(JSON.stringify(conteoClockify));
            newRun.info.push(JSON.stringify(timestampsFaltantes));
            newRun.info.push(JSON.stringify(timestampsSobrantes));

            // FINALIZA CHATGPT



      } // aca termina el FOR del EVENTS



      // Guardamos en nuestra base de datos (MongoDB)
      try {
            await newRun.save();
            console.log("Run guardado con éxito");
      } catch (error) {
            console.error("Error al guardar Run:", error);
            // Manejar el error o enviar una respuesta de error
      }

      res.status(200).send("Event received");
};


// INICIA CHATGPT
// Utilidad para crear una clave única basada en la fecha y duración
const crearClaveTimestamp = (fecha, duracion) => `${fecha}:${duracion}`;

// Contar la cantidad de timestamps por fecha y duración en Asana
const contarTimestampsAsana = (timestampsAsana) => {
      return timestampsAsana.reduce((contadores, timestamp) => {
            const clave = crearClaveTimestamp(timestamp.entered_on, timestamp.duration_minutes);
            contadores[clave] = (contadores[clave] || 0) + 1;
            return contadores;
      }, {});
};

// Contar la cantidad de timestamps por fecha y duración en Clockify
const contarTimestampsClockifyDEPRECATED = (timestampsClockify) => {
      return timestampsClockify.reduce((contadores, timestamp) => {
            const fecha = new Date(timestamp.timeInterval.start).toISOString().split("T")[0];
            const duracion = Math.round(
                  (new Date(timestamp.timeInterval.end) - new Date(timestamp.timeInterval.start)) / 60000
            );
            const clave = crearClaveTimestamp(fecha, duracion);
            contadores[clave] = (contadores[clave] || 0) + 1;
            return contadores;
      }, {});
};

const contarTimestampsClockify = (timestampsClockify) => {
      return timestampsClockify.reduce((contadores, timestamp) => {
            const fecha = new Date(timestamp.timeInterval.start).toISOString().split("T")[0];
            const duracion = Math.round(
                  (new Date(timestamp.timeInterval.end) - new Date(timestamp.timeInterval.start)) / 60000
            );
            const clave = crearClaveTimestamp(fecha, duracion);

            if (!contadores[clave]) {
                  contadores[clave] = { count: 0, timestamps: [] };
            }
            contadores[clave].count += 1;
            contadores[clave].timestamps.push({ id: timestamp.id });
            return contadores;
      }, {});
};


// Función para encontrar y manejar timestamps faltantes o sobrantes
const reconciliarTimestamps = async (conteoAsana, conteoClockify) => {
      const timestampsFaltantes = [];
      const timestampsSobrantes = [];

      // Encontrar timestamps faltantes en Clockify

      // CONTEO ASANA EJEMPLO = 
      // { '2024-01-29:60': 4 }

      Object.keys(conteoAsana).forEach(clave => {
            const conteoEnClockify = conteoClockify[clave] ? conteoClockify[clave].count : 0;
            const conteoEnAsana = conteoAsana[clave] || 0;
            const conteoFaltante = conteoEnAsana - conteoEnClockify;

            if (conteoFaltante > 0) {
                  const [fecha, duracion] = clave.split(':');
                  timestampsFaltantes.push({ fecha, duracion: parseInt(duracion), conteoFaltante });
                  // Aquí podrías añadir lógica para agregar los timestamps faltantes a Clockify

            }
      });


      // CONTEO CLOCKIFY
      //{"2024-01-29:60":{"count":3,"timestamps":[{"id":"65b7f538dad9667d2a88342f"},{"id":"65b7fc73dad9667d2a883d7b"},{"id":"65b7fc917ab3aa1c51336796"}]}}

      // Procesar timestamps sobrantes
      Object.keys(conteoClockify).forEach(clave => {
            const conteoEnAsana = conteoAsana[clave] || 0;
            const conteoEnClockify = conteoClockify[clave] ? conteoClockify[clave].count : 0;
            const conteoSobrante = conteoEnClockify - conteoEnAsana;

            if (conteoSobrante > 0) {
                  // Solo necesitas los timestamps sobrantes
                  const sobrantes = conteoClockify[clave].timestamps.slice(0, conteoSobrante);
                  timestampsSobrantes.push(...sobrantes);
                  // Los elimina mas abajo
            }
      });

      // Manejar timestamps faltantes y sobrantes...
      // Ejemplo: Agregar a Clockify o eliminar de Clockify según sea necesario


      // Timestamps faltantes en Clockify: [ { fecha: '2024-01-29', duracion: 60, conteoFaltante: 2 } ]
      return { timestampsFaltantes, timestampsSobrantes };
};

const getTaskDetails = async (taskId) => {
      try {
            const response = await axios.get(
                  `https://app.asana.com/api/1.0/tasks/${taskId}`,
                  {
                        headers: { Authorization: `Bearer ${accessToken}` },
                  }
            );
            return response.data;
      } catch (error) {
            console.error("Error fetching task details:", error.response.data);
            return null;
      }
};

const getTimeEntriesForTask = async (taskGid) => {
      try {
            const response = await axios.get(
                  `https://app.asana.com/api/1.0/tasks/${taskGid}/time_tracking_entries`,
                  {
                        headers: { Authorization: `Bearer ${accessToken}` },
                  }
            );
            return response.data;
      } catch (error) {
            console.error("Error fetching time entries:", error.response);
            return null;
      }
};

// CRUD WORKSPACE/WEBHOOK

// Function to register a webhook with Asana
export const registerWebhook = async (req, res) => {
      try {
            const response = await axios.post(
                  "https://app.asana.com/api/1.0/webhooks",
                  {
                        data: {
                              resource: projectId,
                              target: webhookUrl,
                              filters: [
                                    {
                                          resource_type: "story",
                                          action: "added",
                                          resource_subtype: "time_tracking_entry_added",
                                    },
                                    {
                                          resource_type: "story",
                                          action: "added",
                                          resource_subtype: "time_tracking_entry_removed",
                                    },
                                    {
                                          resource_type: "story",
                                          action: "added",
                                          resource_subtype: "time_tracking_entry_changed",
                                    },
                                    {
                                          resource_type: "task",
                                          action: "changed",
                                          fields: ["custom_fields"],
                                          resource_subtype: "default_task"
                                    },
                              ],
                        },
                  },
                  {
                        headers: { Authorization: `Bearer ${accessToken}` },
                  }
            );

            console.log("Webhook registered:", response.data);
            res.status(201).json(response.data);
      } catch (error) {
            console.error("Error registering webhook:", error.response.data);
            res.status(500).json(error.response.data);
      }
};

export const getAllWebhooks = async (req, res) => {
      const workspaceId = "1165781313435031"; // Replace with your actual workspace ID

      try {
            const response = await axios.get(
                  `https://app.asana.com/api/1.0/webhooks?workspace=${workspaceId}`,
                  {
                        headers: { Authorization: `Bearer ${token.accessToken}` },
                  }
            );

            console.log("All registered webhooks:");
            console.log(JSON.stringify(response.data, null, 2));
            res.status(200).json(response.data);
      } catch (error) {
            console.error("Error fetching webhooks:", error.response.data);
            res.status(500).json({ message: "Error fetching webhooks" });
      }
};

export const deleteWebhook = async (req, res) => {
      const webhookId = req.params.id; // Assuming the webhook ID is passed as a URL parameter

      try {
            await axios.delete(`https://app.asana.com/api/1.0/webhooks/${webhookId}`, {
                  headers: { Authorization: `Bearer ${token.accessToken}` },
            });

            console.log(`Webhook ${webhookId} deleted successfully`);
            res.status(200).send(`Webhook ${webhookId} deleted successfully`);
      } catch (error) {
            console.error(`Error deleting webhook ${webhookId}:`, error.response.data);
            res.status(500).json({ message: `Error deleting webhook ${webhookId}` });
      }
};

export const getWorkspaces = async (req, res) => {
      try {
            const response = await axios.get(
                  "https://app.asana.com/api/1.0/workspaces",
                  {
                        headers: { Authorization: `Bearer ${token.accessToken}` },
                  }
            );

            console.log("Workspaces:", response.data);
            res.status(200).json(response.data);
      } catch (error) {
            console.error("Error fetching workspaces:", error.response.data);
            res.status(500).json({ message: "Error fetching workspaces" });
      }
};

// Function to create a new Asana task
export const createAsanaTask = async (req, res) => {
      try {
            // Extract task details from the request body
            const {
                  name,
                  notes,
                  workspace,
                  assignee,
                  projects,
                  clockifyTaskId,
                  clockifyProjectId,
                  clockifySYNCYESVALUE,
            } = req.body;

           

            // Convertir clockifyTaskId a una cadena, si no es null o undefined
            //  const clockifyTaskIdStr = clockifyTaskId ? clockifyTaskId.toString() : "";

            // Define the API endpoint for creating a new task
            const url = "https://app.asana.com/api/1.0/tasks";

            // Prepare the payload for the POST request
            const data = {
                  data: {
                        name, // Name of the task
                        notes, // Notes or description of the task
                        workspace, // Workspace ID where the task will be created
                        assignee, // Assignee ID (optional)
                        projects,
                        custom_fields: {
                              [customFieldTaskId]: clockifyTaskId, // Asignar el Clockify Task ID
                              [customFieldProjectId]: clockifyProjectId, // Asignar el Clockify Project ID
                              [Asana_ID_columna_SYNC_Clockify]: clockifySYNCYESVALUE,
                        },
                  },
            };

            // Make the POST request to Asana API
            const response = await axios.post(url, data, {
                  headers: {
                        Authorization: `Bearer ${token.accessToken}`, // Use the access token from your setup
                  },
            });

            // Handle the successful creation of the task
            console.log("Task created successfully:", response.data);
            return res.status(200).json(response.data);
      } catch (error) {
            // Handle any errors that occur during the API call
            console.error(
                  "Error creating Asana task:",
                  error.response ? error.response.data : error.message
            );
            return res.status(500).json({ message: "Error creating Asana task" });
      }
};

// Función para obtener detalles de un proyecto en Asana
export const getProjectDetails = async (req, res) => {
      const projectId = req.query.projectId; // Asumiendo que el ID del proyecto se pasa como parámetro en la URL

      try {
            // Configura las opciones de la solicitud, incluyendo el token Bearer
            const config = {
                  headers: {
                        Authorization: `Bearer ${token.accessToken}`, // Usa el token de acceso configurado
                  },
            };

            // Realiza una solicitud GET a la API de Asana para obtener detalles del proyecto
            const response = await axios.get(
                  `https://app.asana.com/api/1.0/projects/${projectId}`,
                  config
            );

            // Imprime y devuelve los detalles del proyecto
            console.log("Detalles del proyecto:", response.data);
            res.status(200).json(response.data);
      } catch (error) {
            console.error("Error al obtener detalles del proyecto:", error);
            res.status(500).json({ message: "Error al obtener detalles del proyecto" });
      }
};



const updateAsanaTask = async (asanaTaskId, updateData) => {
      try {
            const headers = {
                  'Authorization': `Bearer ${accessToken}`,
                  'Content-Type': 'application/json'
            };

            const response = await axios.put(`https://app.asana.com/api/1.0/tasks/${asanaTaskId}`,
                  { data: updateData },
                  { headers: headers });

            console.log('Asana task updated:', response.data);
            return response.data;
      } catch (error) {
            console.error('Error updating Asana task:', error.response ? error.response.data : error.message);
            return null;
      }
};



// Función para obtener detalles de los campos personalizados
export const getCustomFieldsDetails = async () => {
      try {
            const response = await axios.get('https://app.asana.com/api/1.0/custom_fields', {
                  headers: {
                        'Authorization': `Bearer ${accessToken}`
                  }
            });

            // Imprime los detalles de los campos personalizados
            console.log("Campos Personalizados:", response.data.data);
      } catch (error) {
            console.error("Error al obtener campos personalizados:", error.response ? error.response.data : error.message);
      }
};