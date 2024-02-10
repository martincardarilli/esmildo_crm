import React, { useState, useEffect } from 'react';
import { Badge, Col, Form, Row } from 'react-bootstrap';
import { useTable, useGlobalFilter, useSortBy, usePagination, useRowSelect, useRowState } from 'react-table';
import HtmlHead from '../components/html-head/HtmlHead';
import BreadcrumbList from '../components/breadcrumb-list/BreadcrumbList';
import ButtonsCheckAll from '../components/ButtonsCheckAll';
import ButtonsAddNew from '../components/ButtonsAddNew';
import ControlsPageSize from '../components/ControlsPageSize';
import ControlsAdd from '../components/ControlsAdd';
import ControlsEdit from '../components/ControlsEdit';
import ControlsDelete from './BillDeleteControl';
import ControlsSearch from '../components/ControlsSearch';
import ModalAddEdit from './BillAddEditModal';
import Table from '../components/Table';
import TablePagination from '../components/TablePagination';

import { NavLink } from 'react-router-dom'; // Importar NavLink



const dummyData = [
  { id: 1, name: 'SALT', since: "Jan 2022", stock: 15, category: '', tag: 'New' },
  { id: 2, name: 'Grotto Bay', since: "Jan 2022", stock: 97, category: '', tag: 'Done' },
  { id: 3, name: 'Moongate', since: "Jan 2022", stock: 154, category: '', tag: '' },
  { id: 4, name: 'Health City', since: "Jan 2022", stock: 39, category: '', tag: '' },
];


import {  useCustomers } from "../../../context/customerContext";

export function BillTable() {

  const [currentPage, setCurrentPage] = useState(0); // New state for current page

  const [data, setData] = React.useState(dummyData); // Inicialmente vacío
  const { getCustomers, customers } = useCustomers(); // Usa la función getCustomers de tu contexto

  const loadCustomers = async () => {
    try {
      const response = await getCustomers(); 
      /*console.log(response);  no hay response, revisar getCustomers, solo cambia el estado "customers */
    } catch (error) {
      console.error("Error al cargar los clientes: ", error);
    }
  };
  
  useEffect(() => {
    console.log("useEffect[] INICIAL = loadCustomers()", customers);
    loadCustomers(); // Llama a la función al montar el componente
  }, []); // El array vacío asegura que este efecto se ejecute solo una vez al montar


// Observar cambios en el estado de 'customers'
useEffect(() => {
  console.log("useEffect[customers] = ", customers);
 // console.log("Clientes record en Tabla:", customers);
  setData(customers);
}, [customers]);


  const title = 'Clients';
  const description = 'Separate rows with edit, delete and add.';

  const breadcrumbs = [
    { to: '', text: 'Home' },
    { to: 'interface', text: 'Interface' },
    { to: 'interface/plugins', title: 'Plugins' },
    { to: 'interface/plugins/datatables', title: 'Datatables' },
  ];

  const columns = React.useMemo(() => {
    return [
      {
        Header: '',
        id: 'view',
        headerClassName: 'empty w-10',
        Cell: ({ row }) => {
 
          const  { _id } = row.original; // Obtén el ID desde la fila de datos asegurandote que es el ID del SQL

          return (
            <NavLink
              className="btn btn-primary btn-sm tableToProfile"
             // to={`/clientprofile`} // Agrega el ID a la URL
                         to={`/customer/${_id}`} // Agrega el ID a la URL
            >
              +info
            </NavLink>
          );
        },
      },
      {
        Header: 'Name',
        accessor: 'name',
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
       { Header: 'Address', accessor: 'address', sortable: true, headerClassName: 'text-muted text-small text-uppercase w-20' }, 
      { Header: 'Hour Fee', accessor: 'hourFee', sortable: true, headerClassName: 'text-muted text-small text-uppercase w-10',
      Cell: ({ cell }) => {
        return <Badge bg="outline-primary">$ {cell.value}</Badge>;
      }, },
      { Header: 'Current Month Overview', accessor: 'asd', sortable: true, headerClassName: 'text-muted text-small text-uppercase w-10' },
     /* { Header: 'Customer since? Category', accessor: 'category', sortable: true, headerClassName: 'text-muted text-small text-uppercase w-20' }, */
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
      },
    ];
  }, []);

  //const [data, setData] = React.useState(dummyData);
  const [isOpenAddEditModal, setIsOpenAddEditModal] = useState(false);

  const tableInstance = useTable(
    { columns, data, setData, isOpenAddEditModal, setIsOpenAddEditModal, initialState: { pageIndex: currentPage } },
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
};
