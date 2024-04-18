import React, { useEffect } from 'react';
import { Button, Row, Col, Card, Dropdown, Nav, Form, OverlayTrigger, Tooltip, Tab } from 'react-bootstrap';
import { NavLink, useParams } from 'react-router-dom';
import { LAYOUT } from '../components/constants.jsx';
import HtmlHead from '../components/html-head/HtmlHead.jsx';
import BreadcrumbList from '../components/breadcrumb-list/BreadcrumbList.jsx';
import CsLineIcons from '../components/cs-line-icons/CsLineIcons.jsx';
//import useCustomLayout from 'hooks/useCustomLayout';
import Clamp from '../components/clamp/index.jsx';
import ProfileChart from '../components/ProfileChart.jsx';
//import ChartStreamingLine from '../../interface/plugins/chart/ChartStreamingLine';
//import './ProfileStandard.css'; // Ruta al archivo CSS

//import { API_ENDPOINTS } from '../../../config';

import { CustomerTableHistory } from './CustomerTableHistory.jsx';

import { useCustomers } from '../../../context/customerContext';

export const CustomerProfile = () => {
  const title = 'Profile Standard';
  const description = 'Profile Standard';

  const breadcrumbs = [];

  //useCustomLayout({ layout: LAYOUT.Boxed });

  //const [account, setData] = React.useState();

  /*useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_ENDPOINTS.ProfileStandard}${id}/`);
        const responseData = await response.json();
        console.log(responseData);
        setData(responseData);
      } catch (error) {
        console.log("Error al obtener los datos de la API:", error);
      }
    };

    fetchData();
  }, []);*/

  const params = useParams();
  console.log(params);

  const [customer, setData] = React.useState({});

  const { getCustomer, customers } = useCustomers(); // Usa la función getCustomers de tu contexto

  useEffect(() => {
    const loadCustomer = async () => {
      if (params.id) {
        console.log('data requested in ClientProfile.jsx');
        const customer = await getCustomer(params.id);
        console.log('data received at ClientProfile.jsx');
        console.log('ACA WACHIN AGUANTE EL CAFE DE LUCHO');
        console.log(customer);
        setData(customer);
        /*setValue("title", task.title);
        setValue("description", task.description);
        setValue(
          "date",
          task.date ? dayjs(task.date).utc().format("YYYY-MM-DD") : ""
        );
        setValue("completed", task.completed);*/
      }
    };
    loadCustomer();
  }, []);
  function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  }

  return (
    <>
      <HtmlHead title={title} description={description} />
      {/* Title and Top Buttons Start */}
      <div className="page-title-container">
        <Row>
          {/* Title Start */}
          <Col md="7">
            {/*{account && (
              <div>
                <h1 className="mb-0 pb-0 disp lay-4">
                  {account.account.name} {account.account.surname}
                </h1>
                <CsLineIcons icon="pin" className="me-1" />
                <span className="align-middle">
                  {account.account.address}, {account.account.location}
                </span>
              </div>
            )}*/}
            <BreadcrumbList items={breadcrumbs} />
          </Col>
          {/* Title End */}

          {/* Top Buttons Start */}
          <Col md="5" className="d-flex align-items-start justify-content-end">
            <Button variant="outline-primary" className="btn-icon btn-icon-start btn-icon w-100 w-md-auto ms-1">
              <CsLineIcons icon="edit-square" /> <span>Edit</span>
            </Button>
          </Col>
          {/* Top Buttons End */}
        </Row>
      </div>
      {/* Title and Top Buttons End */}

      <Row className="g-5">
        <Tab.Container id="profileStandard" defaultActiveKey="overview">
          {/* Sidebar Start */}
          <Col xl="4" xxl="3">
            <h2 className="small-title">Customer</h2>
            <Card className="mb-5">
              <Card.Body>
                <div className="d-flex align-items-center flex-column mb-4">
                  <div className="d-flex align-items-center flex-column">
                    {/*
                    <div className="sw-13 position-relative mb-3">
                      <img src="/img/profile/profile-1.webp" className="img-fluid rounded-xl" alt="thumb" />
                    </div>
                    */}
                    <div>
                      <CsLineIcons icon="user" className="me-1" />
                    </div>
                    <div>
                      <span>Details</span>
                    </div>

                    {/*
                    {account && (
                      <div className="text-muted">
                        Type <CsLineIcons icon="user" className="me-1" />{" "}
                        {account.account.type}
                      </div>
                    )}

                    {account && (
                      <div className="text-muted">
                        Citizen/Company ID{" "}
                        <CsLineIcons icon="user" className="me-1" />{" "}
                        {account.account.dni}
                      </div>
                    )}

                    {account && (
                      <div className="text-muted">
                        <CsLineIcons icon="phone" className="me-1" />
                        <span className="align-middle">
                          {account.account.phone_number}
                        </span>
                      </div>
                    )}

                    {account && (
                      <div className="text-muted">
                        <CsLineIcons icon="email" className="me-1" />
                        <span className="align-middle">
                          {account.account.email}
                        </span>
                      </div>
                    )}

                    <br />
                    <span>System Information</span>

                    <div className="text-muted">
                      System ID <CsLineIcons icon="user" className="me-1" />{" "}
                      {id}
                    </div>

                    {account && (
                      <div className="text-muted">
                        <CsLineIcons icon="hourglass" className="me-1" />
                        <span className="align-middle">
                          Record created:{" "}
                          {formatDate(account.account.start_date)}
                        </span>
                      </div>
                    )} */}
                  </div>
                </div>
                <Nav className="flex-column menuIzq" activeKey="overview">
                  <Nav.Link className="px-0 border-bottom border-separator-light cursor-pointer itemLista" eventKey="overview">
                    <CsLineIcons icon="activity" className="me-2" size="17" />
                    <span className="align-middle">Vista general</span>
                  </Nav.Link>
                  <Nav.Link className="px-0 border-bottom border-separator-light cursor-pointer itemLista" eventKey="projects">
                    <CsLineIcons icon="menu-dashed" className="me-2" size="17" />
                    <span className="align-middle">Vista detallada</span>
                  </Nav.Link>
                  <Nav.Link className="px-0 border-bottom border-separator-light cursor-pointer itemLista" eventKey="permissions">
                    <CsLineIcons icon="suitcase" className="me-2" size="17" />
                    <span className="align-middle">Documentacion</span>
                  </Nav.Link>

                  <Nav.Link className="px-0 cursor-pointer" eventKey="history">
                    <CsLineIcons icon="eye" className="me-2" size="17" />
                    <span className="align-middle">Historial de cambios</span>
                  </Nav.Link>
                </Nav>
              </Card.Body>
            </Card>
          </Col>
          {/* Sidebar End */}

          {/* Content Start */}
          <Col xl="8" xxl="9">
            <Tab.Content>
              <Tab.Pane eventKey="overview">
                {/* Overview Tab Start */}

                {/* Stats Start */}

                <h2 className="small-title">Datos generales</h2>
                <Row className="g-2 mb-5">
                  <Col sm="6" lg="3">
                    <Card className="hover-border-primary">
                      <Card.Body>
                        <div className="heading mb-0 d-flex justify-content-between lh-1-25 mb-3">
                          <span>Nombre y Apellido</span>
                          <CsLineIcons icon="user" className="text-primary" />
                        </div>
                        <div className="cta-1 text-primary">{customer?.nombreApellido}</div>
                      </Card.Body>
                    </Card>
                  </Col>

                  <Col sm="6" lg="3">
                    <Card className="hover-border-primary">
                      <Card.Body>
                        <div className="heading mb-0 d-flex justify-content-between lh-1-25 mb-3">
                          <span>Direccion</span>
                          <CsLineIcons icon="pin" className="text-primary" />
                        </div>

                        <div className="cta-1 text-primary">{customer?.direccion}</div>
                      </Card.Body>
                    </Card>
                  </Col>

                  <Col sm="6" lg="3">
                    <Card className="hover-border-primary">
                      <Card.Body>
                        <div className="heading mb-0 d-flex justify-content-between lh-1-25 mb-3">
                          <span>DNI</span>
                          <CsLineIcons icon="info-hexagon" className="text-primary" />
                        </div>

                        <div className="cta-1 text-primary">{customer?.dni}</div>
                      </Card.Body>
                    </Card>
                  </Col>

                  <Col sm="6" lg="3">
                    <Card className="hover-border-primary">
                      <Card.Body>
                        <div className="heading mb-0 d-flex justify-content-between lh-1-25 mb-3">
                          <span>Cuil / Cuit</span>
                          <CsLineIcons icon="file-text" className="text-primary" />
                        </div>
                        <div className="cta-1 text-primary">{customer?.cuitCuil}</div>
                      </Card.Body>
                    </Card>
                  </Col>

                  <Col sm="6" lg="3">
                    <Card className="hover-border-primary">
                      <Card.Body>
                        <div className="heading mb-0 d-flex justify-content-between lh-1-25 mb-3">
                          <span>Vehiculos</span>
                          <CsLineIcons icon="file-text" className="text-primary" />
                        </div>

                        <div className="cta-1 text-primary">3 Vehiculos</div>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col sm="6" lg="3">
                    <Card className="hover-border-primary">
                      <Card.Body>
                        <div className="heading mb-0 d-flex justify-content-between lh-1-25 mb-3">
                          <span>Propiedades</span>
                          <CsLineIcons icon="file-text" className="text-primary" />
                        </div>
                        <div className="cta-1 text-primary">{customer.vehiculos ? customer.vehiculos.length : "Loading"} propiedades</div> 
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>

                {/* Stats End */}

                {/* Stats Start */}
                <h2 className="small-title">Medios de contacto</h2>
                <Row className="g-2 mb-5">
                  <Col sm="6" lg="3">
                    <Card className="hover-border-primary">
                      <Card.Body>
                        <div className="heading mb-0 d-flex justify-content-between lh-1-25 mb-3">
                          <span>Email</span>
                          <CsLineIcons icon="email" className="text-primary" />
                        </div>
                        <div className="cta-1 text-primary">{customer?.email}</div>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col sm="6" lg="3">
                    <Card className="hover-border-primary">
                      <Card.Body>
                        <div className="heading mb-0 d-flex justify-content-between lh-1-25 mb-3">
                          <span> Telefono</span>
                          <CsLineIcons icon="phone" className="text-primary" />
                        </div>
                        <div className="cta-1 text-primary">{customer?.telefono}</div>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col sm="6" lg="3">
                    <Card className="hover-border-primary">
                      <Card.Body>
                        <div className="heading mb-0 d-flex justify-content-between lh-1-25 mb-3">
                          <span>Latency</span>
                          <CsLineIcons icon="antenna" className="text-primary" />
                        </div>
                        <div className="text-small text-muted mb-1">DELAY</div>
                        <div className="cta-1 text-primary">24 ms</div>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col sm="6" lg="3">
                    <Card className="hover-border-primary">
                      <Card.Body>
                        <div className="heading mb-0 d-flex justify-content-between lh-1-25 mb-3">
                          <span>Uptime</span>
                          <CsLineIcons icon="activity" className="text-primary" />
                        </div>
                        <div className="text-small text-muted mb-1">Time Connection</div>
                        <div className="cta-1 text-primary">524</div>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>

                {/* Stats End */}
                {/*  ROUTERS/ DEVICE Start */}
                {/*  ACA HAY QUE METERLE UN FOR EACH */}
                <h2 className="small-title">Devices</h2>

                <Row className="row-cols-1 row-cols-sm-1 g-1 ">
                  <Col>
                    <Card className="h-100">
                      <Card.Body>
                        <NavLink to="#" className="stretched-link heading sh-5 d-inline-block h5">
                          <Clamp tag="span" clamp="2">
                            Router casio
                          </Clamp>
                        </NavLink>

                        <div className="device">
                          <div className="devicecol">
                            <h2 className="small-title">Device</h2>
                            <div className="mb-2">
                              <CsLineIcons icon="diagram-2" className="text-muted me-2" size="17" />
                              <span className="align-middle text-alternate">Configuration: Router</span>
                            </div>
                            <div className="mb-2">
                              <CsLineIcons icon="trend-up" className="text-muted me-2" size="17" />
                              <span className="align-middle text-alternate">MAC Address: 38:72:df:fa:af:99</span>
                            </div>
                            <div>
                              <CsLineIcons icon="check-square" className="text-muted me-2" size="17" />
                              <span className="align-middle text-alternate">Firmware version: 2.0.1.520</span>
                            </div>
                            <div>
                              <CsLineIcons icon="check-square" className="text-muted me-2" size="17" />
                              <span className="align-middle text-alternate">Unum Agent Version: 2.0.1.520</span>
                            </div>
                          </div>

                          <div className="devicecol">
                            <h2 className="small-title">Connections</h2>
                            <div className="mb-2">
                              <CsLineIcons icon="diagram-2" className="text-muted me-2" size="17" />
                              <span className="align-middle text-alternate">Internal IPv4 address: 192.168.1.2</span>
                            </div>
                            <div className="mb-2">
                              <CsLineIcons icon="trend-up" className="text-muted me-2" size="17" />
                              <span className="align-middle text-alternate">External IPv4 address: 192.168.1.5</span>
                            </div>
                          </div>

                          <div className="devicecol">
                            <h2 className="small-title">Radios</h2>
                            <div className="mb-2">
                              <CsLineIcons icon="diagram-2" className="text-muted me-2" size="17" />
                              <span className="align-middle text-alternate">Configuration: Router</span>
                            </div>
                            <div className="mb-2">
                              <CsLineIcons icon="trend-up" className="text-muted me-2" size="17" />
                              <span className="align-middle text-alternate">MAC Address: 38:72:df:fa:af:99</span>
                            </div>
                            <div>
                              <CsLineIcons icon="check-square" className="text-muted me-2" size="17" />
                              <span className="align-middle text-alternate">Firmware version: 2.0.1.520</span>
                            </div>
                            <div>
                              <CsLineIcons icon="check-square" className="text-muted me-2" size="17" />
                              <span className="align-middle text-alternate">Unum Agent Version: 2.0.1.520</span>
                            </div>
                          </div>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>

                  <Col>
                    <Card className="h-100">
                      <Card.Body>
                        <NavLink to="#" className="stretched-link heading sh-5 d-inline-block h5">
                          <Clamp tag="span" clamp="2">
                            Router casio
                          </Clamp>
                        </NavLink>

                        <div className="device">
                          <div className="devicecol">
                            <h2 className="small-title">Device</h2>
                            <div className="mb-2">
                              <CsLineIcons icon="diagram-2" className="text-muted me-2" size="17" />
                              <span className="align-middle text-alternate">Configuration: Router</span>
                            </div>
                            <div className="mb-2">
                              <CsLineIcons icon="trend-up" className="text-muted me-2" size="17" />
                              <span className="align-middle text-alternate">MAC Address: 38:72:df:fa:af:99</span>
                            </div>
                            <div>
                              <CsLineIcons icon="check-square" className="text-muted me-2" size="17" />
                              <span className="align-middle text-alternate">Firmware version: 2.0.1.520</span>
                            </div>
                            <div>
                              <CsLineIcons icon="check-square" className="text-muted me-2" size="17" />
                              <span className="align-middle text-alternate">Unum Agent Version: 2.0.1.520</span>
                            </div>
                          </div>

                          <div className="devicecol">
                            <h2 className="small-title">Connections</h2>
                            <div className="mb-2">
                              <CsLineIcons icon="diagram-2" className="text-muted me-2" size="17" />
                              <span className="align-middle text-alternate">Internal IPv4 address: 192.168.1.2</span>
                            </div>
                            <div className="mb-2">
                              <CsLineIcons icon="trend-up" className="text-muted me-2" size="17" />
                              <span className="align-middle text-alternate">External IPv4 address: 192.168.1.5</span>
                            </div>
                          </div>

                          <div className="devicecol">
                            <h2 className="small-title">Radios</h2>
                            <div className="mb-2">
                              <CsLineIcons icon="diagram-2" className="text-muted me-2" size="17" />
                              <span className="align-middle text-alternate">Configuration: Router</span>
                            </div>
                            <div className="mb-2">
                              <CsLineIcons icon="trend-up" className="text-muted me-2" size="17" />
                              <span className="align-middle text-alternate">MAC Address: 38:72:df:fa:af:99</span>
                            </div>
                            <div>
                              <CsLineIcons icon="check-square" className="text-muted me-2" size="17" />
                              <span className="align-middle text-alternate">Firmware version: 2.0.1.520</span>
                            </div>
                            <div>
                              <CsLineIcons icon="check-square" className="text-muted me-2" size="17" />
                              <span className="align-middle text-alternate">Unum Agent Version: 2.0.1.520</span>
                            </div>
                          </div>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>

                {/* ACA VA UN ROUTER + 1 REPETIDOR (2 devices) */}

                {/* Activity Start */}
                <h2 className="small-title">Bandwidth usage</h2>
                <Card className="mb-5">
                  <Card.Body>
                    <div className="sh-35">{/* <ChartStreamingLine /> */}</div>
                  </Card.Body>
                </Card>
                {/* Activity End */}

                {/* Timeline Start */}
                <h2 className="small-title">Timeline</h2>
                <Card className="mb-5">
                  <Card.Body>
                    <Row className="g-0">
                      <Col xs="auto" className="sw-1 d-flex flex-column justify-content-center align-items-center position-relative me-4">
                        <div className="w-100 d-flex sh-1" />
                        <div className="rounded-xl shadow d-flex flex-shrink-0 justify-content-center align-items-center">
                          <div className="bg-gradient-light sw-1 sh-1 rounded-xl position-relative" />
                        </div>
                        <div className="w-100 d-flex h-100 justify-content-center position-relative">
                          <div className="line-w-1 bg-separator h-100 position-absolute" />
                        </div>
                      </Col>
                      <Col className="mb-4">
                        <div className="h-100">
                          <div className="d-flex flex-column justify-content-start">
                            <div className="d-flex flex-column">
                              <Button variant="link" className="p-0 pt-1 heading text-start btimeline">
                                <CsLineIcons icon="server" className="text-primary align-top timeline" />
                                Conexión establecida con el servidor principal.
                              </Button>
                              <div className="text-alternate">16:24, 21 Dic 2023</div>
                              <div className="text-muted mt-1">
                                Acción: El router establece una conexión segura con el servidor principal.
                                <br />
                                Resultado: El router está listo para enrutar el tráfico de red.
                              </div>
                            </div>
                          </div>
                        </div>
                      </Col>
                    </Row>
                    <Row className="g-0">
                      <Col xs="auto" className="sw-1 d-flex flex-column justify-content-center align-items-center position-relative me-4">
                        <div className="w-100 d-flex sh-1 position-relative justify-content-center">
                          <div className="line-w-1 bg-separator h-100 position-absolute" />
                        </div>
                        <div className="rounded-xl shadow d-flex flex-shrink-0 justify-content-center align-items-center">
                          <div className="bg-gradient-light sw-1 sh-1 rounded-xl position-relative" />
                        </div>
                        <div className="w-100 d-flex h-100 justify-content-center position-relative">
                          <div className="line-w-1 bg-separator h-100 position-absolute" />
                        </div>
                      </Col>
                      <Col className="mb-4">
                        <div className="h-100">
                          <div className="d-flex flex-column justify-content-start">
                            <div className="d-flex flex-column">
                              <Button variant="link" className="p-0 pt-1 heading text-start btimeline">
                                <CsLineIcons icon="router" className="text-primary align-top timeline" />
                                Actualización del firmware del router.
                              </Button>
                              <div className="text-alternate">03:20, 14 Dic 2023</div>
                              <div className="text-muted mt-1">
                                Acción: El router descarga e instala una nueva versión del firmware. <br />
                                Resultado: El router se reinicia con la nueva versión del firmware, mejorando la seguridad y el rendimiento.
                              </div>
                            </div>
                          </div>
                        </div>
                      </Col>
                    </Row>
                    <Row className="g-0">
                      <Col xs="auto" className="sw-1 d-flex flex-column justify-content-center align-items-center position-relative me-4">
                        <div className="w-100 d-flex sh-1 position-relative justify-content-center">
                          <div className="line-w-1 bg-separator h-100 position-absolute" />
                        </div>
                        <div className="rounded-xl shadow d-flex flex-shrink-0 justify-content-center align-items-center">
                          <div className="bg-gradient-light sw-1 sh-1 rounded-xl position-relative" />
                        </div>
                        <div className="w-100 d-flex h-100 justify-content-center position-relative">
                          <div className="line-w-1 bg-separator h-100 position-absolute" />
                        </div>
                      </Col>
                      <Col className="mb-4">
                        <div className="h-100">
                          <div className="d-flex flex-column justify-content-start">
                            <div className="d-flex flex-column">
                              <Button variant="link" className="p-0 pt-1 heading text-start btimeline">
                                <CsLineIcons icon="router" className="text-primary align-top timeline" />
                                Cambio en la configuración de red.
                              </Button>
                              <div className="text-alternate">20:41, 03 Dic 2023</div>
                              <div className="text-muted mt-1">
                                Acción: El administrador del sistema modifica la configuración del enrutador para agregar una nueva subred.
                                <br />
                                Resultado: El router comienza a enrutar el tráfico hacia la nueva subred según la nueva configuración.
                              </div>
                            </div>
                          </div>
                        </div>
                      </Col>
                    </Row>
                    <Row className="g-0">
                      <Col xs="auto" className="sw-1 d-flex flex-column justify-content-center align-items-center position-relative me-4">
                        <div className="w-100 d-flex sh-1 position-relative justify-content-center">
                          <div className="line-w-1 bg-separator h-100 position-absolute" />
                        </div>
                        <div className="rounded-xl shadow d-flex flex-shrink-0 justify-content-center align-items-center">
                          <div className="bg-gradient-light sw-1 sh-1 rounded-xl position-relative" />
                        </div>
                        <div className="w-100 d-flex h-100 justify-content-center position-relative">
                          <div className="line-w-1 bg-separator h-100 position-absolute" />
                        </div>
                      </Col>
                      <Col className="mb-4">
                        <div className="h-100">
                          <div className="d-flex flex-column justify-content-start">
                            <div className="d-flex flex-column">
                              <Button variant="link" className="p-0 pt-1 heading text-start btimeline">
                                <CsLineIcons icon="close-circle" className="text-primary align-top timeline" />
                                Desconexión de un dispositivo inalámbrico.
                              </Button>
                              <div className="text-alternate">22:12, 15 Nov 2023</div>
                              <div className="text-muted mt-1">
                                Acción: El router identifica la pérdida de conexión de un dispositivo previamente conectado. <br />
                                Resultado: El dispositivo ya no puede acceder a la red y se registra la desconexión en el registro del router.
                              </div>
                            </div>
                          </div>
                        </div>
                      </Col>
                    </Row>
                    <Row className="g-0">
                      <Col xs="auto" className="sw-1 d-flex flex-column justify-content-center align-items-center position-relative me-4">
                        <div className="w-100 d-flex sh-1 position-relative justify-content-center">
                          <div className="line-w-1 bg-separator h-100 position-absolute" />
                        </div>
                        <div className="rounded-xl shadow d-flex flex-shrink-0 justify-content-center align-items-center">
                          <div className="bg-gradient-light sw-1 sh-1 rounded-xl position-relative" />
                        </div>
                        <div className="w-100 d-flex h-100 justify-content-center position-relative" />
                      </Col>
                      <Col>
                        <div className="h-100">
                          <div className="d-flex flex-column justify-content-start">
                            <div className="d-flex flex-column">
                              <Button variant="link" className="p-0 pt-1 heading text-start btimeline">
                                <CsLineIcons icon="close-circle" className="text-primary align-top timeline" />
                                Intento de conexión fallido.
                              </Button>
                              <div className="text-alternate">02:58, 08 Ago 2023</div>
                              <div className="text-muted mt-1">
                                Acción: Un dispositivo intenta conectarse a la red Wi-Fi utilizando una contraseña incorrecta.
                                <br />
                                Resultado: El router rechaza la conexión y registra el intento fallido en el registro de eventos.
                              </div>
                            </div>
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
                {/* Timeline End */}

                {/* Logs Start */}
                <h2 className="small-title">Logs</h2>
                <Card>
                  <Card.Body className="mb-n2">
                    <Row className="g-0 mb-2">
                      <Col xs="auto">
                        <div className="sw-6 d-inline-block d-flex justify-content-start align-items-center h-100 me-2">
                          <div className="text-muted mt-n1 lh-1-25">18:43</div>
                        </div>
                      </Col>
                      <Col xs="auto">
                        <div className="sw-2 d-inline-block d-flex justify-content-start align-items-center h-100">
                          <div className="sh-3">
                            <CsLineIcons icon="circle" className="text-primary align-top" />
                          </div>
                        </div>
                      </Col>
                      <Col>
                        <div className="d-flex flex-column pt-0 pb-0 ps-3 pe-0 h-100 justify-content-center">
                          <div className="d-flex flex-column">
                            <div className="text-alternate mt-n1 lh-1-25">New user registiration</div>
                          </div>
                        </div>
                      </Col>
                    </Row>
                    <Row className="g-0 mb-2">
                      <Col xs="auto">
                        <div className="sw-6 d-inline-block d-flex justify-content-start align-items-center h-100 me-2">
                          <div className="text-muted mt-n1 lh-1-25">16:25</div>
                        </div>
                      </Col>
                      <Col xs="auto">
                        <div className="sw-2 d-inline-block d-flex justify-content-start align-items-center h-100">
                          <div className="sh-3">
                            <CsLineIcons icon="square" className="text-secondary align-top" />
                          </div>
                        </div>
                      </Col>
                      <Col>
                        <div className="d-flex flex-column pt-0 pb-0 ps-3 pe-0 h-100 justify-content-center">
                          <div className="d-flex flex-column">
                            <div className="text-alternate mt-n1 lh-1-25">Product out of stock: Breadstick</div>
                          </div>
                        </div>
                      </Col>
                    </Row>
                    <Row className="g-0 mb-2">
                      <Col xs="auto">
                        <div className="sw-6 d-inline-block d-flex justify-content-start align-items-center h-100 me-2">
                          <div className="text-muted mt-n1 lh-1-25">15:10</div>
                        </div>
                      </Col>
                      <Col xs="auto">
                        <div className="sw-2 d-inline-block d-flex justify-content-start align-items-center h-100">
                          <div className="sh-3">
                            <CsLineIcons icon="triangle" className="text-tertiary align-top" />
                          </div>
                        </div>
                      </Col>
                      <Col>
                        <div className="d-flex flex-column pt-0 pb-0 ps-3 pe-0 h-100 justify-content-center">
                          <div className="d-flex flex-column">
                            <div className="text-alternate mt-n1 lh-1-25">Category page returned an error</div>
                          </div>
                        </div>
                      </Col>
                    </Row>
                    <Row className="g-0 mb-2">
                      <Col xs="auto">
                        <div className="sw-6 d-inline-block d-flex justify-content-start align-items-center h-100 me-2">
                          <div className="text-muted mt-n1 lh-1-25">15:00</div>
                        </div>
                      </Col>
                      <Col xs="auto">
                        <div className="sw-2 d-inline-block d-flex justify-content-start align-items-center h-100">
                          <div className="sh-3">
                            <CsLineIcons icon="circle" className="text-primary align-top" />
                          </div>
                        </div>
                      </Col>
                      <Col>
                        <div className="d-flex flex-column pt-0 pb-0 ps-3 pe-0 h-100 justify-content-center">
                          <div className="d-flex flex-column">
                            <div className="text-alternate mt-n1 lh-1-25">14 products added</div>
                          </div>
                        </div>
                      </Col>
                    </Row>
                    <Row className="g-0 mb-2">
                      <Col xs="auto">
                        <div className="sw-6 d-inline-block d-flex justify-content-start align-items-center h-100 me-2">
                          <div className="text-muted mt-n1 lh-1-25">14:35</div>
                        </div>
                      </Col>
                      <Col xs="auto">
                        <div className="sw-2 d-inline-block d-flex justify-content-start align-items-center h-100">
                          <div className="sh-3">
                            <CsLineIcons icon="circle" className="text-primary align-top" />
                          </div>
                        </div>
                      </Col>
                      <Col>
                        <div className="d-flex flex-column pt-0 pb-0 ps-3 pe-0 h-100 justify-content-center">
                          <div className="d-flex flex-column">
                            <div className="text-alternate mt-n1 lh-1-25">New sale: Steirer Brot</div>
                          </div>
                        </div>
                      </Col>
                    </Row>
                    <Row className="g-0 mb-2">
                      <Col xs="auto">
                        <div className="sw-6 d-inline-block d-flex justify-content-start align-items-center h-100 me-2">
                          <div className="text-muted mt-n1 lh-1-25">14:15</div>
                        </div>
                      </Col>
                      <Col xs="auto">
                        <div className="sw-2 d-inline-block d-flex justify-content-start align-items-center h-100">
                          <div className="sh-3">
                            <CsLineIcons icon="hexagon" className="text-quaternary align-top" />
                          </div>
                        </div>
                      </Col>
                      <Col>
                        <div className="d-flex flex-column pt-0 pb-0 ps-3 pe-0 h-100 justify-content-center">
                          <div className="d-flex flex-column">
                            <div className="text-alternate mt-n1 lh-1-25">New sale: Steirer Brot</div>
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
                {/* Logs End */}
                {/* Overview Tab End */}
              </Tab.Pane>
              <Tab.Pane eventKey="projects">
                {/* Projects Tab Start */}
                <h2 className="small-title">Projects</h2>
                {/* Search Start */}
                <Row className="mb-3 g-2">
                  <Col className="mb-1">
                    <div className="d-inline-block float-md-start me-1 mb-1 search-input-container w-100 shadow bg-foreground">
                      <Form.Control type="text" placeholder="Search" />
                      <span className="search-magnifier-icon">
                        <CsLineIcons icon="search" />
                      </span>
                      <span className="search-delete-icon d-none">
                        <CsLineIcons icon="close" />
                      </span>
                    </div>
                  </Col>
                  <Col xs="auto" className="text-end mb-1">
                    <OverlayTrigger placement="top" delay={{ show: 1000, hide: 0 }} overlay={<Tooltip>Result Count</Tooltip>}>
                      <Dropdown align={{ xs: 'end' }} className="d-inline-block ms-1">
                        <Dropdown.Toggle variant="foreground-alternate" className="shadow sw-13">
                          All
                        </Dropdown.Toggle>
                        <Dropdown.Menu
                          className="shadow dropdown-menu-end"
                          popperConfig={{
                            modifiers: [
                              {
                                name: 'computeStyles',
                                options: {
                                  gpuAcceleration: false,
                                },
                              },
                            ],
                          }}
                        >
                          <Dropdown.Item href="#/action-1">All</Dropdown.Item>
                          <Dropdown.Item href="#/action-2">Active</Dropdown.Item>
                          <Dropdown.Item href="#/action-3">Inactive</Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </OverlayTrigger>
                  </Col>
                </Row>
                {/* Search End */}

                {/* Projects Content Start */}
                <Row className="row-cols-1 row-cols-sm-2 g-2">
                  <Col>
                    <Card className="h-100">
                      <Card.Body>
                        <NavLink to="#" className="stretched-link heading sh-5 d-inline-block h5">
                          <Clamp tag="span" clamp="2">
                            Basic Introduction to Bread Making
                          </Clamp>
                        </NavLink>
                        <div className="mb-2">
                          <CsLineIcons icon="diagram-2" className="text-muted me-2" size="17" />
                          <span className="align-middle text-alternate">Contributors: 4</span>
                        </div>
                        <div className="mb-2">
                          <CsLineIcons icon="trend-up" className="text-muted me-2" size="17" />
                          <span className="align-middle text-alternate">Active</span>
                        </div>
                        <div>
                          <CsLineIcons icon="check-square" className="text-muted me-2" size="17" />
                          <span className="align-middle text-alternate">Completed</span>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col>
                    <Card className="h-100">
                      <Card.Body>
                        <NavLink to="#" className="stretched-link heading sh-5 d-inline-block h5">
                          <Clamp tag="span" clamp="2">
                            4 Facts About Old Baking Techniques
                          </Clamp>
                        </NavLink>
                        <div className="mb-2">
                          <CsLineIcons icon="diagram-2" className="text-muted me-2" size="17" />
                          <span className="align-middle text-alternate">Contributors: 3</span>
                        </div>
                        <div className="mb-2">
                          <CsLineIcons icon="trend-up" className="text-muted me-2" size="17" />
                          <span className="align-middle text-alternate">Active</span>
                        </div>
                        <div>
                          <CsLineIcons icon="clock" className="text-muted me-2" size="17" />
                          <span className="align-middle text-alternate">Pending</span>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col>
                    <Card className="h-100">
                      <Card.Body>
                        <NavLink to="#" className="stretched-link heading sh-5 d-inline-block h5">
                          <Clamp tag="span" clamp="2">
                            Apple Cake Recipe for Starters
                          </Clamp>
                        </NavLink>
                        <div className="mb-2">
                          <CsLineIcons icon="diagram-2" className="text-muted me-2" size="17" />
                          <span className="align-middle text-alternate">Contributors: 8</span>
                        </div>
                        <div className="mb-2">
                          <CsLineIcons icon="lock-on" className="text-muted me-2" size="17" />
                          <span className="align-middle text-alternate">Locked</span>
                        </div>
                        <div>
                          <CsLineIcons icon="sync-horizontal" className="text-muted me-2" size="17" />
                          <span className="align-middle text-alternate">Continuing</span>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col>
                    <Card className="h-100">
                      <Card.Body>
                        <NavLink to="#" className="stretched-link heading sh-5 d-inline-block h5">
                          <Clamp tag="span" clamp="2">
                            A Complete Guide to Mix Dough for the Molds
                          </Clamp>
                        </NavLink>
                        <div className="mb-2">
                          <CsLineIcons icon="diagram-2" className="text-muted me-2" size="17" />
                          <span className="align-middle text-alternate">Contributors: 12</span>
                        </div>
                        <div className="mb-2">
                          <CsLineIcons icon="trend-up" className="text-muted me-2" size="17" />
                          <span className="align-middle text-alternate">Active</span>
                        </div>
                        <div>
                          <CsLineIcons icon="check-square" className="text-muted me-2" size="17" />
                          <span className="align-middle text-alternate">Completed</span>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col>
                    <Card className="h-100">
                      <Card.Body>
                        <NavLink to="#" className="stretched-link heading sh-5 d-inline-block h5">
                          <Clamp tag="span" clamp="2">
                            14 Facts About Sugar Products
                          </Clamp>
                        </NavLink>
                        <div className="mb-2">
                          <CsLineIcons icon="diagram-2" className="text-muted me-2" size="17" />
                          <span className="align-middle text-alternate">Contributors: 2</span>
                        </div>
                        <div className="mb-2">
                          <CsLineIcons icon="trend-down" className="text-muted me-2" size="17" />
                          <span className="align-middle text-alternate">Inactive</span>
                        </div>
                        <div>
                          <CsLineIcons icon="box" className="text-muted me-2" size="17" />
                          <span className="align-middle text-alternate">Archived</span>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col>
                    <Card className="h-100">
                      <Card.Body>
                        <NavLink to="#" className="stretched-link heading sh-5 d-inline-block h5">
                          <Clamp tag="span" clamp="2">
                            Easy and Efficient Tricks for Baking Crispy Breads
                          </Clamp>
                        </NavLink>
                        <div className="mb-2">
                          <CsLineIcons icon="diagram-2" className="text-muted me-2" size="17" />
                          <span className="align-middle text-alternate">Contributors: 2</span>
                        </div>
                        <div className="mb-2">
                          <CsLineIcons icon="trend-up" className="text-muted me-2" size="17" />
                          <span className="align-middle text-alternate">Active</span>
                        </div>
                        <div>
                          <CsLineIcons icon="clock" className="text-muted me-2" size="17" />
                          <span className="align-middle text-alternate">Pending</span>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col>
                    <Card className="h-100">
                      <Card.Body>
                        <NavLink to="#" className="stretched-link heading sh-5 d-inline-block h5">
                          <Clamp tag="span" clamp="2">
                            Apple Cake Recipe for Starters
                          </Clamp>
                        </NavLink>
                        <div className="mb-2">
                          <CsLineIcons icon="diagram-2" className="text-muted me-2" size="17" />
                          <span className="align-middle text-alternate">Contributors: 6</span>
                        </div>
                        <div className="mb-2">
                          <CsLineIcons icon="trend-down" className="text-muted me-2" size="17" />
                          <span className="align-middle text-alternate">Inactive</span>
                        </div>
                        <div>
                          <CsLineIcons icon="box" className="text-muted me-2" size="17" />
                          <span className="align-middle text-alternate">Archived</span>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col>
                    <Card className="h-100">
                      <Card.Body>
                        <NavLink to="#" className="stretched-link heading sh-5 d-inline-block h5">
                          <Clamp tag="span" clamp="2">
                            Simple Guide to Mix Dough
                          </Clamp>
                        </NavLink>
                        <div className="mb-2">
                          <CsLineIcons icon="diagram-2" className="text-muted me-2" size="17" />
                          <span className="align-middle text-alternate">Contributors: 22</span>
                        </div>
                        <div className="mb-2">
                          <CsLineIcons icon="lock-on" className="text-muted me-2" size="17" />
                          <span className="align-middle text-alternate">Locked</span>
                        </div>
                        <div>
                          <CsLineIcons icon="check-square" className="text-muted me-2" size="17" />
                          <span className="align-middle text-alternate">Completed</span>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col>
                    <Card className="h-100">
                      <Card.Body>
                        <NavLink to="#" className="stretched-link heading sh-5 d-inline-block h5">
                          <Clamp tag="span" clamp="2">
                            10 Secrets Every Southern Baker Knows
                          </Clamp>
                        </NavLink>
                        <div className="mb-2">
                          <CsLineIcons icon="diagram-2" className="text-muted me-2" size="17" />
                          <span className="align-middle text-alternate">Contributors: 3</span>
                        </div>
                        <div className="mb-2">
                          <CsLineIcons icon="trend-up" className="text-muted me-2" size="17" />
                          <span className="align-middle text-alternate">Active</span>
                        </div>
                        <div>
                          <CsLineIcons icon="sync-horizontal" className="text-muted me-2" size="17" />
                          <span className="align-middle text-alternate">Continuing</span>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col>
                    <Card className="h-100">
                      <Card.Body>
                        <NavLink to="#" className="stretched-link heading sh-5 d-inline-block h5">
                          <Clamp tag="span" clamp="2">
                            Recipes for Sweet and Healty Treats
                          </Clamp>
                        </NavLink>
                        <div className="mb-2">
                          <CsLineIcons icon="diagram-2" className="text-muted me-2" size="17" />
                          <span className="align-middle text-alternate">Contributors: 1</span>
                        </div>
                        <div className="mb-2">
                          <CsLineIcons icon="trend-down" className="text-muted me-2" size="17" />
                          <span className="align-middle text-alternate">Inactive</span>
                        </div>
                        <div>
                          <CsLineIcons icon="clock" className="text-muted me-2" size="17" />
                          <span className="align-middle text-alternate">Pending</span>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col>
                    <Card className="h-100">
                      <Card.Body>
                        <NavLink to="#" className="stretched-link heading sh-5 d-inline-block h5">
                          <Clamp tag="span" clamp="2">
                            Better Ways to Mix Dough for the Molds
                          </Clamp>
                        </NavLink>
                        <div className="mb-2">
                          <CsLineIcons icon="diagram-2" className="text-muted me-2" size="17" />
                          <span className="align-middle text-alternate">Contributors: 20</span>
                        </div>
                        <div className="mb-2">
                          <CsLineIcons icon="trend-up" className="text-muted me-2" size="17" />
                          <span className="align-middle text-alternate">Active</span>
                        </div>
                        <div>
                          <CsLineIcons icon="clock" className="text-muted me-2" size="17" />
                          <span className="align-middle text-alternate">Pending</span>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col>
                    <Card className="h-100">
                      <Card.Body>
                        <NavLink to="#" className="stretched-link heading sh-5 d-inline-block h5">
                          <Clamp tag="span" clamp="2">
                            Introduction to Baking Cakes
                          </Clamp>
                        </NavLink>
                        <div className="mb-2">
                          <CsLineIcons icon="diagram-2" className="text-muted me-2" size="17" />
                          <span className="align-middle text-alternate">Contributors: 13</span>
                        </div>
                        <div className="mb-2">
                          <CsLineIcons icon="trend-up" className="text-muted me-2" size="17" />
                          <span className="align-middle text-alternate">Active</span>
                        </div>
                        <div>
                          <CsLineIcons icon="check-square" className="text-muted me-2" size="17" />
                          <span className="align-middle text-alternate">Completed</span>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
                {/* Projects Content End */}
                {/* Projects Tab End */}
              </Tab.Pane>
              <Tab.Pane eventKey="permissions">
                {/* Permissions Tab Start */}
                <h2 className="small-title">Permissions</h2>
                <div className="mb-n2">
                  <Card className="mb-2">
                    <Card.Body className="py-4">
                      <label className="form-check custom-icon mb-0 checked-opacity-75">
                        <input type="checkbox" className="form-check-input" defaultChecked />
                        <span className="form-check-label">
                          <span className="content">
                            <span className="heading mb-1 lh-1-25">Create</span>
                            <span className="d-block text-small text-muted">
                              Chocolate cake biscuit donut cotton candy soufflé cake macaroon. Halvah chocolate cotton candy sweet roll jelly-o candy danish
                              dragée.
                            </span>
                          </span>
                        </span>
                      </label>
                    </Card.Body>
                  </Card>
                  <Card className="mb-2">
                    <Card.Body className="py-4">
                      <label className="form-check custom-icon mb-0 checked-opacity-75">
                        <input type="checkbox" className="form-check-input" />
                        <span className="form-check-label">
                          <span className="content">
                            <span className="heading mb-1 lh-1-25">Publish</span>
                            <span className="d-block text-small text-muted">Jelly beans wafer candy caramels fruitcake macaroon sweet roll.</span>
                          </span>
                        </span>
                      </label>
                    </Card.Body>
                  </Card>
                  <Card className="mb-2">
                    <Card.Body className="py-4">
                      <label className="form-check custom-icon mb-0 checked-opacity-75">
                        <input type="checkbox" className="form-check-input" />
                        <span className="form-check-label">
                          <span className="content">
                            <span className="heading mb-1 lh-1-25">Edit</span>
                            <span className="d-block text-small text-muted">Jelly cake jelly sesame snaps jelly beans jelly beans.</span>
                          </span>
                        </span>
                      </label>
                    </Card.Body>
                  </Card>
                  <Card className="mb-2">
                    <Card.Body className="py-4">
                      <label className="form-check custom-icon mb-0 checked-opacity-75">
                        <input type="checkbox" className="form-check-input" defaultChecked />
                        <span className="form-check-label">
                          <span className="content">
                            <span className="heading mb-1 lh-1-25">Delete</span>
                            <span className="d-block text-small text-muted">Danish oat cake pudding.</span>
                          </span>
                        </span>
                      </label>
                    </Card.Body>
                  </Card>
                  <Card className="mb-2">
                    <Card.Body className="py-4">
                      <label className="form-check custom-icon mb-0 checked-opacity-75">
                        <input type="checkbox" className="form-check-input" defaultChecked />
                        <span className="form-check-label">
                          <span className="content">
                            <span className="heading mb-1 lh-1-25">Add User</span>
                            <span className="d-block text-small text-muted">Soufflé chocolate cake chupa chups danish brownie pudding fruitcake.</span>
                          </span>
                        </span>
                      </label>
                    </Card.Body>
                  </Card>
                  <Card className="mb-2">
                    <Card.Body className="py-4">
                      <label className="form-check custom-icon mb-0 checked-opacity-75">
                        <input type="checkbox" className="form-check-input" />
                        <span className="form-check-label">
                          <span className="content">
                            <span className="heading mb-1 lh-1-25">Edit User</span>
                            <span className="d-block text-small text-muted">Biscuit powder brownie powder sesame snaps jelly-o dragée cake.</span>
                          </span>
                        </span>
                      </label>
                    </Card.Body>
                  </Card>
                  <Card className="mb-2">
                    <Card.Body className="py-4">
                      <label className="form-check custom-icon mb-0 checked-opacity-75">
                        <input type="checkbox" className="form-check-input" />
                        <span className="form-check-label">
                          <span className="content">
                            <span className="heading mb-1 lh-1-25">Delete User</span>
                            <span className="d-block text-small text-muted">
                              Liquorice jelly powder fruitcake oat cake. Gummies tiramisu cake jelly-o bonbon. Marshmallow liquorice croissant.
                            </span>
                          </span>
                        </span>
                      </label>
                    </Card.Body>
                  </Card>
                </div>
                {/* Permissions Tab End */}
              </Tab.Pane>
              <Tab.Pane eventKey="friends">
                {/* Friends Start */}
                <h2 className="small-title">Friends</h2>
                <Row className="row-cols-1 row-cols-md-2 row-cols-xxl-3 g-3">
                  <Col>
                    <Card>
                      <Card.Body>
                        <Row className="g-0 sh-6">
                          <Col xs="auto">
                            <img src="/img/profile/profile-1.webp" className="card-img rounded-xl sh-6 sw-6" alt="thumb" />
                          </Col>
                          <Col>
                            <div className="d-flex flex-row ps-4 h-100 align-items-center justify-content-between">
                              <div className="d-flex flex-column">
                                <div>Blaine Cottrell</div>
                                <div className="text-small text-muted">Project Manager</div>
                              </div>
                              <div className="d-flex">
                                <Button variant="outline-primary" size="sm" className="ms-1">
                                  Follow
                                </Button>
                              </div>
                            </div>
                          </Col>
                        </Row>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col>
                    <Card>
                      <Card.Body>
                        <Row className="g-0 sh-6">
                          <Col xs="auto">
                            <img src="/img/profile/profile-2.webp" className="card-img rounded-xl sh-6 sw-6" alt="thumb" />
                          </Col>
                          <Col>
                            <div className="d-flex flex-row ps-4 h-100 align-items-center justify-content-between">
                              <div className="d-flex flex-column">
                                <div>Cherish Kerr</div>
                                <div className="text-small text-muted">Development Lead</div>
                              </div>
                              <div className="d-flex">
                                <Button variant="outline-primary" size="sm" className="ms-1">
                                  Follow
                                </Button>
                              </div>
                            </div>
                          </Col>
                        </Row>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col>
                    <Card>
                      <Card.Body>
                        <Row className="g-0 sh-6">
                          <Col xs="auto">
                            <img src="/img/profile/profile-3.webp" className="card-img rounded-xl sh-6 sw-6" alt="thumb" />
                          </Col>
                          <Col>
                            <div className="d-flex flex-row ps-4 h-100 align-items-center justify-content-between">
                              <div className="d-flex flex-column">
                                <div>Kirby Peters</div>
                                <div className="text-small text-muted">Accounting</div>
                              </div>
                              <div className="d-flex">
                                <Button variant="outline-primary" size="sm" className="ms-1">
                                  Follow
                                </Button>
                              </div>
                            </div>
                          </Col>
                        </Row>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col>
                    <Card>
                      <Card.Body>
                        <Row className="g-0 sh-6">
                          <Col xs="auto">
                            <img src="/img/profile/profile-4.webp" className="card-img rounded-xl sh-6 sw-6" alt="thumb" />
                          </Col>
                          <Col>
                            <div className="d-flex flex-row ps-4 h-100 align-items-center justify-content-between">
                              <div className="d-flex flex-column">
                                <div>Olli Hawkins</div>
                                <div className="text-small text-muted">Client Relations Lead</div>
                              </div>
                              <div className="d-flex">
                                <Button variant="outline-primary" size="sm" className="ms-1">
                                  Follow
                                </Button>
                              </div>
                            </div>
                          </Col>
                        </Row>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col>
                    <Card>
                      <Card.Body>
                        <Row className="g-0 sh-6">
                          <Col xs="auto">
                            <img src="/img/profile/profile-5.webp" className="card-img rounded-xl sh-6 sw-6" alt="thumb" />
                          </Col>
                          <Col>
                            <div className="d-flex flex-row ps-4 h-100 align-items-center justify-content-between">
                              <div className="d-flex flex-column">
                                <div>Luna Wigglebutt</div>
                                <div className="text-small text-muted">Customer Engagement</div>
                              </div>
                              <div className="d-flex">
                                <Button variant="outline-primary" size="sm" className="ms-1">
                                  Follow
                                </Button>
                              </div>
                            </div>
                          </Col>
                        </Row>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col>
                    <Card>
                      <Card.Body>
                        <Row className="g-0 sh-6">
                          <Col xs="auto">
                            <img src="/img/profile/profile-6.webp" className="card-img rounded-xl sh-6 sw-6" alt="thumb" />
                          </Col>
                          <Col>
                            <div className="d-flex flex-row ps-4 h-100 align-items-center justify-content-between">
                              <div className="d-flex flex-column">
                                <div>Kerr Jackson</div>
                                <div className="text-small text-muted">Frontend Developer</div>
                              </div>
                              <div className="d-flex">
                                <Button variant="outline-primary" size="sm" className="ms-1">
                                  Follow
                                </Button>
                              </div>
                            </div>
                          </Col>
                        </Row>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col>
                    <Card>
                      <Card.Body>
                        <Row className="g-0 sh-6">
                          <Col xs="auto">
                            <img src="/img/profile/profile-7.webp" className="card-img rounded-xl sh-6 sw-6" alt="thumb" />
                          </Col>
                          <Col>
                            <div className="d-flex flex-row ps-4 h-100 align-items-center justify-content-between">
                              <div className="d-flex flex-column">
                                <div>Kathryn Mengel</div>
                                <div className="text-small text-muted">Team Leader</div>
                              </div>
                              <div className="d-flex">
                                <Button variant="outline-primary" size="sm" className="ms-1">
                                  Follow
                                </Button>
                              </div>
                            </div>
                          </Col>
                        </Row>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col>
                    <Card>
                      <Card.Body>
                        <Row className="g-0 sh-6">
                          <Col xs="auto">
                            <img src="/img/profile/profile-8.webp" className="card-img rounded-xl sh-6 sw-6" alt="thumb" />
                          </Col>
                          <Col>
                            <div className="d-flex flex-row ps-4 h-100 align-items-center justify-content-between">
                              <div className="d-flex flex-column">
                                <div>Joisse Kaycee</div>
                                <div className="text-small text-muted">Copywriter</div>
                              </div>
                              <div className="d-flex">
                                <Button variant="outline-primary" size="sm" className="ms-1">
                                  Follow
                                </Button>
                              </div>
                            </div>
                          </Col>
                        </Row>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col>
                    <Card>
                      <Card.Body>
                        <Row className="g-0 sh-6">
                          <Col xs="auto">
                            <img src="/img/profile/profile-9.webp" className="card-img rounded-xl sh-6 sw-6" alt="thumb" />
                          </Col>
                          <Col>
                            <div className="d-flex flex-row ps-4 h-100 align-items-center justify-content-between">
                              <div className="d-flex flex-column">
                                <div>Zayn Hartley</div>
                                <div className="text-small text-muted">Visual Effect Designer</div>
                              </div>
                              <div className="d-flex">
                                <Button variant="outline-primary" size="sm" className="ms-1">
                                  Follow
                                </Button>
                              </div>
                            </div>
                          </Col>
                        </Row>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
                {/* Friends End */}
              </Tab.Pane>

              <Tab.Pane eventKey="history">
                <CustomerTableHistory />
              </Tab.Pane>

              <Tab.Pane eventKey="about">
                {/* About Start */}
                <h2 className="small-title">About</h2>
                <Card>
                  <Card.Body>
                    <div className="mb-5">
                      <p className="text-small text-muted mb-2">ME</p>
                      <p>
                        Jujubes brownie marshmallow apple pie donut ice cream jelly-o jelly-o gummi bears. Tootsie roll chocolate bar dragée bonbon cheesecake
                        icing. Danish wafer donut cookie caramels gummies topping.
                      </p>
                    </div>
                    <div className="mb-5">
                      <p className="text-small text-muted mb-2">INTERESTS</p>
                      <p>
                        Chocolate cake biscuit donut cotton candy soufflé cake macaroon. Halvah chocolate cotton candy sweet roll jelly-o candy danish dragée.
                        Apple pie cotton candy tiramisu biscuit cake muffin tootsie roll bear claw cake. Cupcake cake fruitcake.
                      </p>
                    </div>
                    <div className="mb-5">
                      <p className="text-small text-muted mb-2">CONTACT</p>
                      <NavLink to="#" className="d-block body-link mb-1">
                        <CsLineIcons icon="screen" className="me-2" size="17" />
                        <span className="align-middle">blainecottrell.com</span>
                      </NavLink>
                      <NavLink to="#" className="d-block body-link mb-1">
                        <CsLineIcons icon="email" className="me-2" size="17" />
                        <span className="align-middle">contact@blainecottrell.com</span>
                      </NavLink>
                    </div>
                  </Card.Body>
                </Card>
                {/* About End */}
              </Tab.Pane>
            </Tab.Content>
          </Col>
          {/* Content End */}
        </Tab.Container>
      </Row>
    </>
  );
};

export default CustomerProfile;
