import React, { useEffect } from 'react';
import { Button, Row, Col, Card, Dropdown, Nav, Form, OverlayTrigger, Tooltip, Tab } from 'react-bootstrap';
import { NavLink, useParams } from 'react-router-dom';
import { LAYOUT } from '../components/constants.jsx';
import HtmlHead from '../components/html-head/HtmlHead.jsx';
import BreadcrumbList from '../components/breadcrumb-list/BreadcrumbList.jsx';
import CsLineIcons from '../components/cs-line-icons/CsLineIcons.jsx';
//import useCustomLayout from './components/hooks/useCustomLayout';
//import Clamp from 'components/clamp';

//import ProfileChart from 'views/pages/profile/components/ProfileChart';
//import ChartStreamingLine from 'views/interface/plugins/chart/ChartStreamingLine';
//import 'views/pages/profile/ProfileStandard.css'; // Ruta al archivo CSS

/*
import DeviceModelRows from 'views/interface/plugins/datatables/EditableRows/DeviceModelRows';
import DeviceTypeRows from 'views/interface/plugins/datatables/EditableRows/DeviceTypeRows';
import DeviceRoleRows from 'views/interface/plugins/datatables/EditableRows/DeviceRoleRows';
import DeviceStateRows from 'views/interface/plugins/datatables/EditableRows/DeviceStateRows';
import ServiceRows from 'views/interface/plugins/datatables/EditableRows/ServiceRows';
import ServicePlanRows from 'views/interface/plugins/datatables/EditableRows/ServicePlanRows';
import ServiceTypeRows from 'views/interface/plugins/datatables/EditableRows/ServiceTypeRows';
*/

export const Admin = () => {
  const title = 'Admin';
  const description = 'Profile Standard';

  const breadcrumbs = [


  ];

  //useCustomLayout({ layout: LAYOUT.Boxed });



  
  return (
    <>
      <HtmlHead title={title} description={description} />
      {/* Title and Top Buttons Start */}
      <div className="page-title-container">
        <Row>
          {/* Title Start */}
          <Col md="7">

            <BreadcrumbList items={breadcrumbs} />
          </Col>
          {/* Title End */}

          {/* Top Buttons Start */}
          <Col md="5" className="d-flex align-items-start justify-content-end">
            {/* <Button variant="outline-primary" className="btn-icon btn-icon-start btn-icon w-100 w-md-auto ms-1">
              <CsLineIcons icon="edit-square" /> <span>Edit</span>
  </Button> */}
          </Col>
          {/* Top Buttons End */}
        </Row>
      </div>
      {/* Title and Top Buttons End */}

      <Row className="g-5">
        <Tab.Container id="profileStandard" defaultActiveKey="overview">
          {/* Sidebar Start */}
          <Col xl="3" xxl="3">
            <h2 className="small-title">Menu</h2>
            <Card className="mb-5">
              <Card.Body>
                
                <Nav className="flex-column menuIzq" activeKey="overview">
                  <Nav.Link className="px-0 border-bottom border-separator-light cursor-pointer itemLista" eventKey="overview">
                    <CsLineIcons icon="activity" className="me-2" size="17" />
                    <span className="align-middle">Overview</span>
                  </Nav.Link>

           


       

                  <span className='menuTitle'>Configuración de equipo</span>

                  <Nav.Link className="px-0 border-bottom border-separator-light cursor-pointer itemLista" eventKey="users">
                    <CsLineIcons icon="user" className="me-2" size="17" />
                    <span className="align-middle">Usuarios</span>
                  </Nav.Link>

                  <Nav.Link className="px-0 border-bottom border-separator-light cursor-pointer itemLista" eventKey="users">
                    <CsLineIcons icon="lock-off" className="me-2" size="17" />
                    <span className="align-middle">Permisos</span>
                  </Nav.Link>
                  
                </Nav>
              </Card.Body>
            </Card>
          </Col>
          {/* Sidebar End */}

          {/* Content Start */}
          <Col xl="9" xxl="9">
            <Tab.Content>

            

              <Tab.Pane eventKey="overview">
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




              <Tab.Pane eventKey="models">
        
              </Tab.Pane>
              
              <Tab.Pane eventKey="roles">
       
              </Tab.Pane>

              <Tab.Pane eventKey="types">
             
              </Tab.Pane>
              
              <Tab.Pane eventKey="states">
       
              </Tab.Pane>

           
              <Tab.Pane eventKey="serviceplans">
             
              </Tab.Pane>

              <Tab.Pane eventKey="servicetypes">
          
              </Tab.Pane>
              
            






              <Tab.Pane eventKey="users">



                
                {/* Friends Start */}
                <h2 className="small-title">Usuarios</h2>
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
            </Tab.Content>
          </Col>
          {/* Content End */}
        </Tab.Container>
      </Row>
    </>
  );
};

export default Admin;
