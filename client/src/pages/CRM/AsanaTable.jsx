import React, { useState, useEffect } from 'react';
import { Badge, Col, Form, Row } from 'react-bootstrap';
import { useTable, useGlobalFilter, useSortBy, usePagination, useRowSelect, useRowState } from 'react-table';
import HtmlHead from './components/html-head/HtmlHead';
import BreadcrumbList from './components/breadcrumb-list/BreadcrumbList';
import ButtonsCheckAll from './components/ButtonsCheckAll';
import ButtonsAddNew from './components/ButtonsAddNew';
import ControlsPageSize from './components/ControlsPageSize';
import ControlsAdd from './components/ControlsAdd';
import ControlsEdit from './components/ControlsEdit';
import ControlsDelete from './components/ControlsDelete';
import ControlsSearch from './components/ControlsSearch';
import ModalAddEdit from './components/ModalAddEdit';
import Table from './components/Table';
import TablePagination from './components/TablePagination';

import axios from "axios";

const project = "1199334040172198";
const TOKEN = "1/1204955379511689:4ecb5e6c07c20d2cb261a1073ed0a649";

export function AsanaTable() {
  const [data, setData] = useState([]); // Initialize data state with an empty array
  const [taskDetails, setTaskDetails] = useState({}); // Estado para almacenar detalles de tareas


  async function getAsanaTasks(setData) {
    try {
      // Configure the request options, including the Bearer token
      const config = {
        headers: {
          Authorization:
          `Bearer ${TOKEN}`, // Replace with your real token
        },
      };

 

      // Make a GET request to the Asana API to fetch task details
      const response = await axios.get(
        `https://app.asana.com/api/1.0/tasks?project=${project}&limit=10`,
        config
      );

      // Check if the response was successful and get the data
      if (response.status === 200) {
        const tasks = response.data.data; // Extract the "data" property from the API response
        setData(tasks); // Update the component's state with the Asana data
      } else {
        console.error('Error fetching tasks from Asana.');
      }
    } catch (error) {
      console.error('Error making the request to Asana: ', error);
    }
  }

  async function getTaskDetails(taskId) {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${TOKEN}`, // Reemplaza con tu token real
        },
      };

      const response = await axios.get(
        `https://app.asana.com/api/1.0/tasks/${taskId}`,
        config
      );

      if (response.status === 200) {
        // Almacena los detalles de la tarea en el estado
        setTaskDetails((prevDetails) => ({
          ...prevDetails,
          [taskId]: response.data.data,
        }));
      } else {
        console.error(`Error al obtener detalles de la tarea ${taskId}`);
      }
    } catch (error) {
      console.error(`Error al realizar la solicitud para obtener detalles de la tarea ${taskId}: `, error);
    }
  }

  useEffect(() => {
    // Realiza solicitudes para obtener detalles de tareas al montar el componente
    data.forEach((task) => {
      getTaskDetails(task.gid);
    });
  }, [data]);

  useEffect(() => {
    try {
      getAsanaTasks(setData); // Call the function to fetch tasks when the component mounts
    } catch (error) {
      console.log('Failed');
      console.log(error);
    }
  }, []);



  const title = 'Asana Tasks';
  const description = 'Separate rows with edit, delete, and add.';

  const breadcrumbs = [
    { to: '', text: 'Home' },
    { to: 'interface', text: 'Interface' },
    { to: 'interface/plugins', title: 'Plugins' },
    { to: 'interface/plugins/datatables', title: 'Datatables' },
  ];

  const columns = React.useMemo(() => {
    return [
      {
        Header: 'Name',
        accessor: 'name',
        sortable: true,
        headerClassName: 'text-muted text-small text-uppercase w-30',
        Cell: ({ cell }) => {
          const taskId = cell.row.original.gid;
          const taskDetail = taskDetails[taskId] || {};
          return (
            <p>           
              {cell.value}
            </p>
          );
        },
      },
      {
        Header: '-> LINK (ASANA ID)',
        accessor: 'gid',
        sortable: true,
        headerClassName: 'text-muted text-small text-uppercase w-10',
        Cell: ({ cell }) => {
          const taskId = cell.value;
          return (
            <a
              href={`https://app.asana.com/0/1199334040172198/${taskId}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {taskId}
            </a>
          );
        },
      },
  
      // Agrega las columnas de los detalles de la tarea, por ejemplo:
      {
        Header: 'Assignee Status',
        accessor: (row) => {
          const taskDetail = taskDetails[row.gid] || {};
          return taskDetail.assignee_status;
        },
        sortable: true,
        headerClassName: 'text-muted text-small text-uppercase w-20',
      },
      // Agrega más columnas para otros detalles de la tarea
      // Personaliza la visualización de los campos personalizados
      {
        Header: 'Custom Fields',
        accessor: (row) => {
          const taskDetail = taskDetails[row.gid] || {};
          const customFields = taskDetail.custom_fields || [];
          const customFieldValues = customFields.map((field) => `${field.name}: ${field.text_value}`).join(', ');
          return customFieldValues;
        },
        sortable: true,
        headerClassName: 'text-muted text-small text-uppercase w-20',
      },
    ];
  }, [taskDetails]);

  const [isOpenAddEditModal, setIsOpenAddEditModal] = useState(false);

  const tableInstance = useTable(
    {
      columns,
      data,
      isOpenAddEditModal,
      setIsOpenAddEditModal,
      initialState: { pageIndex: 0 },
    },
    useGlobalFilter,
    useSortBy,
    usePagination,
    useRowSelect,
    useRowState
  );

  return (
    <>
      <HtmlHead title={title} description={description} />

      <Row className="tableStart">
        <Col>
          <div className="page-title-container">
            <Row>
              <Col xs="12" md="7">
                <h1 className="mb-0 pb-0 display-4">{title}</h1>
                <BreadcrumbList items={breadcrumbs} />
              </Col>
              <Col xs="12" md="5" className="d-flex align-items-start justify-content-end">
                <ButtonsAddNew tableInstance={tableInstance} /> <ButtonsCheckAll tableInstance={tableInstance} />
              </Col>
            </Row>
          </div>

          <div>
            <Row className="mb-3">
              <Col sm="12" md="5" lg="3" xxl="2">
                <div className="d-inline-block float-md-start me-1 mb-1 mb-md-0 search-input-container w-100 shadow bg-foreground">
                  <ControlsSearch tableInstance={tableInstance} />
                </div>
              </Col>
              <Col sm="12" md="7" lg="9" xxl="10" className="text-end">
                <div className="d-inline-block me-0 me-sm-3 float-start float-md-none">
                  <ControlsAdd tableInstance={tableInstance} /> <ControlsEdit tableInstance={tableInstance} /> <ControlsDelete tableInstance={tableInstance} />
                </div>
                <div className="d-inline-block">
                  <ControlsPageSize tableInstance={tableInstance} />
                </div>
              </Col>
            </Row>
            <Row>
              <Col xs="12">
                <Table className="react-table rows" tableInstance={tableInstance} />
              </Col>
              <Col xs="12">
                <TablePagination tableInstance={tableInstance} />
              </Col>
            </Row>
          </div>
          <ModalAddEdit tableInstance={tableInstance} />
        </Col>
      </Row>
    </>
  );
}
