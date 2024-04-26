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
import SoftDeleteControl from '../components/controls-delete/SoftDeleteControl';
import ControlsSearch from '../components/ControlsSearch';
import ModalAddEdit from './CustomerAddEditModal';
import Table from '../components/Table';
import TablePagination from '../components/TablePagination';

import CsLineIcons from '../components/cs-line-icons/CsLineIcons';

import { NavLink } from 'react-router-dom'; // Importar NavLink
import RecoverControl from '../components/controls-delete/RecoverControl';

/*
const dummyData = [
  { id: 1, name: 'SALT', since: "Jan 2022", stock: 15, category: '', tag: 'New' },
  { id: 2, name: 'Grotto Bay', since: "Jan 2022", stock: 97, category: '', tag: 'Done' },
  { id: 3, name: 'Moongate', since: "Jan 2022", stock: 154, category: '', tag: '' },
  { id: 4, name: 'Health City', since: "Jan 2022", stock: 39, category: '', tag: '' },
];
*/

const dummyData = [];

import { useCustomers } from '../../../context/customerContext';

export function CustomerTable() {
  const [data, setData] = React.useState(dummyData); // Inicialmente vacío
  const { getCustomers, customers, updateCustomer } = useCustomers(); // Usa la función getCustomers de tu contexto

  //const [data, setData] = React.useState(dummyData);
  const [isOpenAddEditModal, setIsOpenAddEditModal] = useState(false);

  const [currentPage, setCurrentPage] = useState(0); // New state for current page
  const [pageSize, setPageSize] = useState(10); // Initial page size

  const [savedPageIndex, setSavedPageIndex] = useState(0);

  //console.log(tableInstance);

  const title = 'Personas';
  const description = 'Separate rows with edit, delete and add.';

  const breadcrumbs = [
    { to: '', text: 'Home' },
    { to: 'customers', text: 'Personas' },
  ];

  const loadCustomers = async () => {
    try {
      const response = await getCustomers();
      /*console.log(response);  no hay response, revisar getCustomers, solo cambia el estado "customers */
    } catch (error) {
      console.error('Error al cargar los clientes: ', error);
    }
  };

  useEffect(() => {
    loadCustomers(); // Llama a la función al montar el componente
  }, []); // El array vacío asegura que este efecto se ejecute solo una vez al montar

  useEffect(() => {
    // Guardar el índice de página actual antes de actualizar los datos
    setSavedPageIndex(tableInstance.state.pageIndex);

    // Establecer los nuevos datos en la tabla
    setData(customers);
  }, [customers]);

  const columns = React.useMemo(() => {
    return [
      {
        Header: 'single view',
        id: 'view',
        headerClassName: 'text-muted text-small text-uppercase w-5',
        Cell: ({ row }) => {
          const { _id } = row.original; // Obtén el ID desde la fila de datos asegurandote que es el ID del SQL

          return (
            <NavLink
              className="btn btn-primary btn-sm tableToProfile"
              // to={`/clientprofile`} // Agrega el ID a la URL
              to={`/persona/${_id}`} // Agrega el ID a la URL
            >
              +info
            </NavLink>
          );
        },
      },
      {
        Header: 'edit',
        accessor: 'edit',
        sortable: true,
        headerClassName: 'text-muted text-small text-uppercase w-5',
        Cell: ({ cell }) => {
          return (
            <a
              className="flex gap-2 editContainer"
              href="#!"
              onClick={(e) => {
                e.preventDefault();
              }}
            >
              <CsLineIcons icon="pen" className="w-4" />
            </a>
          );
        },
      },
      {
        Header: 'NOMBRE Y APELLIDO',
        accessor: 'nombreApellido',
        sortable: true,
        headerClassName: 'text-muted text-small text-uppercase w-20',
        Cell: ({ cell }) => {
          return (
            <a
              className="flex gap-2"
              href="#!"
              onClick={(e) => {
                e.preventDefault();
              }}
            >
              <CsLineIcons icon="user" className="w-4" /> {cell.value}
            </a>
          );
        },
      },
      { Header: 'DIRECCIÓN', accessor: 'direccion', sortable: true, headerClassName: 'text-muted text-small text-uppercase w-20' },
      { Header: 'TELEFONO', accessor: 'telefono', sortable: true, headerClassName: 'text-muted text-small text-uppercase w-20' },
      { Header: 'EMAIL', accessor: 'email', sortable: true, headerClassName: 'text-muted text-small text-uppercase w-20' },
      { Header: 'DNI', accessor: 'dni', sortable: true, headerClassName: 'text-muted text-small text-uppercase w-20' },
      { Header: 'CUIT/CUIL', accessor: 'cuitCuil', sortable: true, headerClassName: 'text-muted text-small text-uppercase w-20' },

      /* { Header: 'Customer since? Category', accessor: 'category', sortable: true, headerClassName: 'text-muted text-small text-uppercase w-20' }, */
      {
        Header: 'Tag',
        accessor: 'tag',
        sortable: true,
        headerClassName: 'text-muted text-small text-uppercase w-20',
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

  const tableInstance = useTable(
    { columns, data, setData, isOpenAddEditModal, setIsOpenAddEditModal, initialState: { pageIndex: savedPageIndex, pageSize } },
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
                <div className="d-inline-block me-0 me-sm-3 float-start float-md-none tablaBotones">
                  <ControlsAdd tableInstance={tableInstance} /> <ControlsEdit tableInstance={tableInstance} />{' '}
                  <SoftDeleteControl tableInstance={tableInstance} getObjects={getCustomers} updateObject={updateCustomer} />{' '}
                  <RecoverControl tableInstance={tableInstance} destino="/personas/erased"  />
                </div>
                <div className="d-inline-block ControlsPageSize">
                  <ControlsPageSize tableInstance={tableInstance} />
                </div>
              </Col>
            </Row>
            <Row>
              <Col xs="12" className="tableStyle">
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
