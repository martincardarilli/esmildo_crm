import axios from 'axios';

// Configuracion:

// 1.
// API KEY del Usuario en Workspace de Clockify
const API_KEY = 'YjNmOGU4Y2MtOGI2MC00OTcyLWEzZDgtMTQ2NWUzZjdjNTU4';

// GET https://crm.rize.bm/api/clockify/getWorkspaces
// Seleccionas ID de Workspace y completas abajo

// id de Workspace de Clockify
const WORKSPACE_ID = '65bae9dcdc7a9a37f580e310'; 

// GET https://crm.rize.bm/api/clockify/getUsers
// Seleccionas ID del Master User y completas abajo

// USER_ID (Unico-master tiene que ser Admin creo) del Workspace de Clockify
const USER_ID = "6572377fb291dc569a3ee06c";

// GET https://crm.rize.bm/api/clockify/getProjects
// Seleccionas ID del Project "from Asana" y completas abajo

// id de "from Asana" (Project de Clockify, cambia segun Workspace), para postear tareas que vienen desde Asana
const PROJECT_ID = "65c1701f77682a2076bbdaa1"; 



//const projectId = "1205821636681805"; // test Project 1205821636681805 Asana
//const projectId = "1203873314001101";// SALT SUPPORT BOARD 1203873314001101

const AsanaProjectId = '1203873314001101'; // PARA VERIFICAR QUE EXISTA LA TAREA ANTES DE CREARLA PORQUE CAPAZ QUE ES UN SYNC

// !! CONFLICTO


// API KEY del Usuario "mocoy@rize.bm" en Workspace "SALT Technology Group" (PRO);
//const API_KEY = 'NjE1MzlhZmItZmFiYy00MjhkLWJkMWQtMWVkMDE4ZTczNTgw';

// ID de Clockify Workspace "SALT Technology Group" (PRO)
//const WORKSPACE_ID = '6532c0cc205d0441c5c375da'; 

// Mary Ocoy ID in SALT workspace environment
//const USER_ID = "6566103934cfa45c731d7df7";

/*

/ ! / y mas abajo

--------------------------------------------------------algunos IDS de Asana

en las tareas after Clockify creation task 

workspace: '1165781313435031', // OK            - RIZE TECHNOLOGIES WORKSPACE
! assignee: '1204957496789271', // / ! / ATENTION - needs to change to gilbert
! projects: '1205821636681805' //  / ! / ATENTION - TEST PROJECT, this needs to be changed to SALT PROJECT

*/

const Asana_ID_columna_SYNC_Clockify = '1206471213350251'; //Asana
const ID_valor_picklist_YES = '1206471213350252';

const headers = {
	'Content-Type': 'application/json',
	'X-Api-Key': API_KEY
};

import Run from "../models/run.model.js"; // Asegúrate de importar el modelo Run correctamente


// Función para obtener todos los workspaces de Clockify
export const getWorkspaces = async (req, res) => {
	try {
	    const response = await axios.get('https://api.clockify.me/api/v1/workspaces', { headers });
	    const workspaces = response.data;
	    console.log('Workspaces retrieved:', workspaces);
	    res.status(200).json(workspaces);
	} catch (error) {
	    console.error('Error retrieving workspaces:', error.response ? error.response.data : error.message);
	    res.status(500).send('Error retrieving workspaces');
	}
      };


export const getUserIds = async (req, res) => {
	try {
		const response = await axios.get(`https://api.clockify.me/api/v1/workspaces/${WORKSPACE_ID}/users`, { headers });
		const users = response.data;
		console.log('Users retrieved:', users);
		res.status(200).json(users.map(user => ({ id: user.id, name: user.name, email: user.email })));
	} catch (error) {
		console.error('Error retrieving users:', error.response ? error.response.data : error.message);
		res.status(500).send('Error retrieving users');
	}
};



//INTERNAL SERVER REQUEST
/*export const addTimeEntryDEPRECATED = async (taskId, startTime, endTime, description, billable = true, userId) => {
  try {
    const timeEntryData = {
	"start": startTime,
	"end": endTime, 
	"billable": billable,
	"description": description,
	"taskId": taskId,
	"userId": userId
    };

    const response = await axios.post(`https://api.clockify.me/api/v1/workspaces/${WORKSPACE_ID}/time-entries`, timeEntryData, { headers });
    console.log('Time entry added:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error adding time entry:', error.response ? error.response.data : error.message);
    throw error;
  }
};*/

export const addTimeEntry = async (req, res) => {
	try {
		const { taskId, startTime, endTime, description, projectId } = req.query;

		const timeEntryData = {
			"start": startTime,
			"end": endTime,
			"billable": true,
			"description": description,
			"taskId": taskId,
			"projectId": projectId,
			"userId": USER_ID,
		};

		/*
		[
	    {
		"id": "6572377fb291dc569a3ee06c",
		"name": "Mcardarilli",
		"email": "mcardarilli@rize.bm"
	    },
	    {
		"id": "6566103934cfa45c731d7df7",
		"name": "Mary O.",
		"email": "mocoy@rize.bm"
	    }
	  ]
	  */

		const response = await axios.post(`https://api.clockify.me/api/v1/workspaces/${WORKSPACE_ID}/time-entries`, timeEntryData, { headers });
		console.log('Time entry added:', response.data);
		res.status(200).send(response.data);
	} catch (error) {
		res.status(500).send(error.response.data);
	}
};



export const getProjects = async (req, res) => {
	try {
		const response = await axios.get(`https://api.clockify.me/api/v1/workspaces/${WORKSPACE_ID}/projects`, { headers });
		const projects = response.data;
		console.log('Projects retrieved:', projects);
		res.status(200).json(projects.map(project => ({ id: project.id, name: project.name })));
	} catch (error) {
		console.error('Error retrieving projects:', error.response ? error.response.data : error.message);
		res.status(500).send('Error retrieving projects');
	}
};



export const getTasks = async (req, res) => {
	const { projectId } = req.params; // Assuming projectId is passed as a URL parameter
	try {
		const response = await axios.get(`https://api.clockify.me/api/v1/workspaces/${WORKSPACE_ID}/projects/${projectId}/tasks`, { headers });
		const tasks = response.data;
		console.log('Tasks retrieved for project:', projectId, tasks);
		res.status(200).json(tasks.map(task => ({ id: task.id, name: task.name })));
	} catch (error) {
		console.error(`Error retrieving tasks for project ${projectId}:`, error.response ? error.response.data : error.message);
		res.status(500).send('Error retrieving tasks');
	}
};





import { createAsanaTask } from "./asana.controller.js";

// Esto se triggea cuando se crea una nueva Task en Clockify
export const showListened = async (req, res) => {
	// Ocurre cuando se crea una tarea en Clockify
	const newRun = new Run({
		timestamp: new Date(), // Fecha y hora actual
		automationName: "Clockify <> Asana ~ New task created in Clockify",
		description: "",
		tag: "Healthy",
		info: [], // Inicialmente vacío
	});

	// ERROR. FIJARSE PRIMERO SI NO EXISTE UNA TAREA CON ESE NOMBRE

	// ACA QUERIA VER LO DEL ACCESS TOKEN
	//console.log(req);

	console.log("LISTENER WORKING");
	console.log(req.body); // ESTE ERA EL 2do log?

	try {
		// Obtener la lista de proyectos desde Clockify
		const projectsResponse = await axios.get(`https://api.clockify.me/api/v1/workspaces/${WORKSPACE_ID}/projects`, { headers });
		const projects = projectsResponse.data;

		// Encontrar el proyecto por su ID
		const projectId = req.body.projectId; // Asegúrate de que este es el campo correcto del req.body
		const project = projects.find(p => p.id === projectId);

		if (!project) {
			throw new Error('Proyecto no encontrado');
		}

		// Crear la tarea en Asana con el nombre del proyecto incluido
		const asanaReq = {
			body: {
				clockifyTaskId: req.body.id,
				clockifyProjectId: req.body.projectId,
				clockifySYNCYESVALUE: ID_valor_picklist_YES,
				
				name: project.name + ' - ' + req.body.name,
				notes: 'This is a task created from the Clockify listener.',
				workspace: '1165781313435031', // OK            - RIZE TECHNOLOGIES WORKSPACE

				assignee: '1204957496789271', // / ! / ATENTION - needs to change to gilbert
				// Gilbert ID MISSING

				projects: '1205821636681805', //  / ! / ATENTION - TEST PROJECT, this needs to be changed to SALT PROJECT

				//projects: '1203873314001101', //  SALT board (Asana)

				/*custom_fields: {
					// Asegúrate de usar los IDs de campos personalizados correctos aquí
					[Asana_ID_columna_SYNC_Clockify]: ID_valor_picklist_YES
				},*/
				
			}
		};

		console.log(asanaReq);

		const asanaRes = {
			status: (statusCode) => ({
				json: (data) => {
					console.log('Asana Task Creation Status:', statusCode, data);
				}
			})
		};


		// primero deb eriamos preguntarle acerca de la lista de tareas existente 


		// CUIDADO ACA '1205821636681805'AsanaProjectId


		
		//y hacer un find por ambos IDs
		const tasks = await getAsanaProjectTasks(AsanaProjectId, '1/1204955379511689:4ecb5e6c07c20d2cb261a1073ed0a649'); // ESTO ES UNA COCHINADA HAY QUE HACER LA FUNCION EN asana.controller.js
		console.log(tasks);

		if (!taskExists(tasks, req.body.name)) {
			await createAsanaTask(asanaReq, asanaRes);
			console.log('La tarea SE CREO en Asana');
			newRun.description = "La tarea se creo en Asana";
		}else{
			console.log('La tarea ya existe en el proyecto de Asana');
			newRun.description = "La tarea ya existe en el proyecto de Asana";

		}
		
		newRun.save();
		res.status(200).send('Trigger instance received from Clockify correctly');

	} catch (error) {
		console.error('Error:', error);
		res.status(500).send('Error procesando la solicitud');
	}
};




const getAsanaProjectTasks = async (projectAsanaId, accessToken) => {
	try {
	    const response = await axios.get(`https://app.asana.com/api/1.0/projects/${projectAsanaId}/tasks`, {
		  headers: { Authorization: `Bearer ${accessToken}` }
	    });
	    return response.data.data; // La lista de tareas
	} catch (error) {
	    console.error("Error al obtener tareas de Asana:", error.response ? error.response.data : error);
	    throw error;
	}
  };
  


  const taskExists = (tasks, name) => {
	return tasks.some(task => {
	    // Aquí debes definir cómo se almacenan y comparan estos IDs en Asana
	    // Por ejemplo, si están en los nombres de las tareas o en campos personalizados
	    return task.name.includes(name);
	});
  };
  






export const getClockifyTaskDetailsDEPRECATED = async (taskId) => {
	try {
		// Obtener los detalles de la tarea
		// const taskResponse = await axios.get(`https://api.clockify.me/api/v1/workspaces/${WORKSPACE_ID}/tasks/${taskId}`, { headers });
		//const taskDetails = taskResponse.data;

		// Obtener los time entries asociados con la tarea
		const timeEntriesResponse = await axios.get(`https://api.clockify.me/api/v1/workspaces/${WORKSPACE_ID}/tasks/${taskId}/time-entries`, { headers });
		const timeEntries = timeEntriesResponse.data;

		return {
			timeEntries
		};
	} catch (error) {
		console.error('Error retrieving task details or time entries:', error);
		// Retorna null o maneja el error como prefieras
		return null;
	}
};

export const getClockifyTaskDetails = async (projectId, taskId) => {
	try {
		// Obtener los detalles de la tarea
		const taskResponse = await axios.get(`https://api.clockify.me/api/v1/workspaces/${WORKSPACE_ID}/projects/${projectId}/tasks/${taskId}`, { headers });
		const taskDetails = taskResponse.data;

		return taskDetails;
	} catch (error) {
		console.error('Error retrieving task details:', error);
		return null;
	}
};



export const getClockifyTimeEntriesForTask = async (taskId) => {
	try {
		const timeEntriesResponse = await axios.get(`https://api.clockify.me/api/v1/workspaces/${WORKSPACE_ID}/user/${USER_ID}/time-entries?task=${taskId}`, { headers });
		const timeEntries = timeEntriesResponse.data;

		return timeEntries;
	} catch (error) {
		console.error('Error retrieving time entries for task:', error);
		return null;
	}
};



export const deleteClockifyTimeEntry = async (timeEntryId) => {
	try {
		const response = await axios.delete(`https://api.clockify.me/api/v1/workspaces/${WORKSPACE_ID}/time-entries/${timeEntryId}`, { headers });
		console.log('Time entry deleted ', timeEntryId);
		return response.data;
	} catch (error) {
		console.error('Error deleting time entry:', error.response ? error.response.data : error.message);
		return null;
	}
};


export const createClockifyTask = async (projectId, name, userId = USER_ID) => {
	try {
		// Datos de la tarea a crear
		const taskData = {
			name: name, // Nombre de la tarea
			projectId: PROJECT_ID, // ID del proyecto al que pertenece la tarea
			assigneeId: userId, // ID del usuario asignado a la tarea (opcional)
			// Puedes añadir más campos según lo que permita la API de Clockify
		};

		const response = await axios.post(`https://api.clockify.me/api/v1/workspaces/${WORKSPACE_ID}/projects/${PROJECT_ID}/tasks`, taskData, { headers });
		console.log('Clockify Task created:', response.data);
		return response.data;
	} catch (error) {
		console.error('Error creating Clockify task:', error.response ? error.response.data : error.message);
		return null;
	}
};






