import React, { useState, useEffect } from 'react';
import { Badge, Col, Form, Row } from 'react-bootstrap';
import { useTable, useGlobalFilter, useSortBy, usePagination, useRowSelect, useRowState } from 'react-table';
import HtmlHead from '../components/html-head/HtmlHead';
import BreadcrumbList from '../components/breadcrumb-list/BreadcrumbList';
import ButtonsCheckAll from './CustomerButtonsCheckAll';
import ButtonsAddNew from '../components/ButtonsAddNew';
import ControlsPageSize from '../components/ControlsPageSize';
import ControlsAdd from '../components/ControlsAdd';
import ControlsEdit from '../components/ControlsEdit';
//import ControlsDelete from './CustomerDeleteControl';
import ControlsSearch from '../components/ControlsSearch';
import ModalAddEdit from './CustomerAddEditModal';
import Table from '../components/Table';
import TablePagination from '../components/TablePagination';

import CsLineIcons from "../components/cs-line-icons/CsLineIcons";

import { NavLink } from 'react-router-dom'; // Importar NavLink
import RecoverControl from '../components/controls-delete/ObjectRecoverButton';


const dummyData = [
];

import { useParams } from "react-router-dom";

import {  useCustomers } from "../../../context/customerContext";

export function CustomerTableHistory() {

  //const { getCustomer, customers } = useCustomers(); // Usa la función getCustomers de tu contexto


  const params = useParams();
  const [data, setData] = React.useState(dummyData); // Inicialmente vacío
  const { getCustomerUpdates, customers } = useCustomers(); // Usa la función getCustomers de tu contexto

  const loadCustomerUpdates = async () => {
    try {

      //const customer = await getCustomer(params.id);

      const response = await getCustomerUpdates(params.id); 

      console.log('2203 | updates recibidos?');
      console.log(response);

      //setData(response);



      const modifiedChanges = response.map(change => {
        return {
          ...change,
          changedBy: change.changedBy.username // Reemplaza 'changedBy' con solo el 'username'
        };
      });
  
      console.log(modifiedChanges);
      setData(modifiedChanges);

    
      /*console.log(response);  no hay response, revisar getCustomers, solo cambia el estado "customers */
    } catch (error) {
      console.error("Error al cargar update de  customer: ", error);
    }
  };
  
  useEffect(() => {
    console.log("useEffect[] INICIAL = loadCustomerUpdates()");
    loadCustomerUpdates(); // Llama a la función al montar el componente
  }, []); // El array vacío asegura que este efecto se ejecute solo una vez al montar





  const title = 'Historial de cambios';
  const description = 'Separate rows with edit, delete and add.';

  const breadcrumbs = [
    { to: '', text: 'Home' },
    { to: 'interface', text: 'Personas' },
    //{ to: 'interface/plugins', title: `${}` },
    { to: 'interface/plugins', title: `+info` },
    { to: 'interface/plugins', title: `Historial de cambios` },

  ];

  function formatDate(dateString) {
    const date = new Date(dateString);
    const options = {
      year: "numeric", 
      month: "long", 
      day: "numeric", 
      hour: '2-digit', 
      minute: '2-digit', 
      second: '2-digit',
      hour12: false // use true for 12-hour format
    };
    return date.toLocaleString("en-US", options);
  }
  

  const columns = React.useMemo(() => {
    return [
      
      { Header: 'FECHA', accessor: 'updatedAt', sortable: true, headerClassName: 'text-muted text-small text-uppercase w-40', 
      Cell: ({ cell }) => {
        return (
          <p
            className="list-item-heading body"
            href="#!"
            onClick={(e) => {
              e.preventDefault();
            }}
          >
            {formatDate(cell.value)}
          </p>
        );
      },
    },
      {
        Header: 'CAMBIADO POR',
        accessor: 'changedBy',
        sortable: true,
        headerClassName: 'text-muted text-small text-uppercase w-20',
        Cell: ({ cell }) => {
          return (
            <a
              className="list-item-heading body"
              href="#!"
              onClick={(e) => {
                e.preventDefault();
              }}
            >
              {cell.value}
            </a>
          );
        },
      },
       { Header: 'CAMPO', accessor: 'fieldName', sortable: true, headerClassName: 'text-muted text-small text-uppercase w-10' }, 
      { Header: 'VALOR ANTERIOR', accessor: 'oldValue', sortable: true, headerClassName: 'text-muted text-small text-uppercase w-10' },
      { Header: 'NUEVO VALOR', accessor: 'newValue', sortable: true, headerClassName: 'text-muted text-small text-uppercase w-10' },
     /* { Header: 'Customer since? Category', accessor: 'category', sortable: true, headerClassName: 'text-muted text-small text-uppercase w-20' }, 
      {
        Header: 'Tag',
        accessor: 'tag',
        sortable: true,
        headerClassName: 'text-muted text-small text-uppercase w-10',
        Cell: ({ cell }) => {
          return <Badge bg="outline-primary">{cell.value}</Badge>;
        },
      }, 
      {
        Header: '',
        id: 'action',
        headerClassName: 'empty w-10',
        Cell: ({ row }) => {
          const { checked, onChange } = row.getToggleRowSelectedProps();
          return <Form.Check className="form-check float-end mt-1" type="checkbox" checked={checked} onChange={onChange} />;
        },
      }, */
    ];
  }, []);

  //const [data, setData] = React.useState(dummyData);
  const [isOpenAddEditModal, setIsOpenAddEditModal] = useState(false);

  const [currentPage, setCurrentPage] = useState(0); // New state for current page
  const [pageSize, setPageSize] = useState(50); // Initial page size

  const tableInstance = useTable(
    { columns, data, setData, isOpenAddEditModal, setIsOpenAddEditModal, initialState: { pageIndex: currentPage, pageSize, sortBy: [
      {
        id: 'updatedAt', // El identificador del campo de fecha en tus datos
        desc: true // 'true' para ordenar de forma descendente, 'false' para ascendente
      }
    ]  } },
    useGlobalFilter,
    useSortBy,
    usePagination,
    useRowSelect,
    useRowState
  );

  console.log(tableInstance);

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
              { /*  <ButtonsAddNew tableInstance={tableInstance} /> <ButtonsCheckAll tableInstance={tableInstance} /> */ }
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
                <div className="d-inline-block me-0 me-sm-3 float-start float-md-none tablaBotones">
                  { /* <ControlsAdd tableInstance={tableInstance} /> <ControlsEdit tableInstance={tableInstance} /> <ControlsDelete tableInstance={tableInstance} />  <RecoverControl/> */ }
                </div>
                <div className="d-inline-block ControlsPageSize">
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
};

