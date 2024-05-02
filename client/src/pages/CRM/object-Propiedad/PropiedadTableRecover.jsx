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

import ControlsSearch from '../components/ControlsSearch';
import ModalAddEdit from './PropiedadAddEditModal';
import Table from '../components/Table';
import TablePagination from '../components/TablePagination';

import CsLineIcons from '../components/cs-line-icons/CsLineIcons';

import { NavLink } from 'react-router-dom'; // Importar NavLink
import RecoverControl from '../components/controls-delete/RecoverControlReturn';
import RecoverButton from '../components/controls-delete/ObjectRecoverButton';
import HardDeleteControl from '../components/controls-delete/HardDeleteControl';
const dummyData = [];

import { usePropiedades } from '../../../context/propiedadContext';

export function PropiedadTableRecover() {
  const [currentPage, setCurrentPage] = useState(0); // New state for current page

  const [data, setData] = React.useState(dummyData); // Inicialmente vacío
  const { getDeletedPropiedades, propiedades, getPropiedades, deletePropiedad, updatePropiedad } = usePropiedades(); // Usa la función getPropiedades de tu contexto

  const loadPropiedades = async () => {
    try {
      const response = await getDeletedPropiedades();
      /*console.log(response);  no hay response, revisar getPropiedades, solo cambia el estado "propiedades */
      console.log('DEBUG DELETED CUSTOMERS???? start');
      console.log(response);
      console.log('DEBUG DELETED CUSTOMERS???? ends');
      setData(response.data);
    } catch (error) {
      console.error('Error al cargar los clientes: ', error);
    }
  };

  useEffect(() => {
    // console.log("useEffect[] INICIAL = loadPropiedades()", propiedades);
    loadPropiedades(); // Llama a la función al montar el componente
  }, []); // El array vacío asegura que este efecto se ejecute solo una vez al montar

  // Observar cambios en el estado de 'propiedades'

  useEffect(() => {
    console.log('useEffect[propiedades] = ', propiedades);
    // console.log("Clientes record en Tabla:", propiedades);
    loadPropiedades();
  }, [propiedades]);

  const title = 'Propiedades borradas';
  const description = 'Separate rows with edit, delete and add.';

  const breadcrumbs = [
    { to: '', text: 'Home' },
    { to: 'propiedades', text: 'Propiedades' },
    { to: 'propiedades/erased', text: 'Propiedades borradas' },
  ];

  const columns = React.useMemo(() => {
    return [
      {
        Header: '',
        id: 'view',
        headerClassName: 'empty w-10',
        Cell: ({ row }) => {
          const { _id } = row.original; // Obtén el ID desde la fila de datos asegurandote que es el ID del SQL

          return (
            <NavLink
              className="btn btn-primary btn-sm tableToProfile"
              // to={/clientprofile} // Agrega el ID a la URL
              to={`/propiedad/${_id}`} // Agrega el ID a la URL
            >
              +info
            </NavLink>
          );
        },
      },
      {
        Header: 'PROPIEDAD',
        accessor: 'propiedad',
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
              <CsLineIcons icon="home-garage" className="w-4" /> {cell.value}
            </a>
          );
        },
      },
      { Header: 'TIPO', accessor: 'tipo', sortable: true, headerClassName: 'text-muted text-small text-uppercase w-20' },
      { Header: 'SUPERFICIE', accessor: 'superficie', sortable: true, headerClassName: 'text-muted text-small text-uppercase w-20' },
      { Header: 'VALOR', accessor: 'valor', sortable: true, headerClassName: 'text-muted text-small text-uppercase w-20' },
      { Header: 'Propietario', accessor: 'propietario.nombreApellido', sortable: true, headerClassName: 'text-muted text-small text-uppercase w-20' },
      { Header: 'ESTADO', accessor: 'estado', sortable: true, headerClassName: 'text-muted text-small text-uppercase w-20' },

      /* { Header: 'Propiedad since? Category', accessor: 'category', sortable: true, headerClassName: 'text-muted text-small text-uppercase w-20' }, */
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
                {/* <ButtonsAddNew tableInstance={tableInstance} /> */} <ButtonsCheckAll tableInstance={tableInstance} />
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
                  <RecoverControl tableInstance={tableInstance} destino="/propiedades" />
                  <HardDeleteControl tableInstance={tableInstance} getObjects={getPropiedades} deleteObject={deletePropiedad} />{' '}
                  <RecoverButton tableInstance={tableInstance} getObjects={getPropiedades} updateObject={updatePropiedad} />
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
}
