import React, { useEffect } from "react";
import {
  Button,
  Row,
  Col,
  Card,
  Dropdown,
  Nav,
  Form,
  OverlayTrigger,
  Tooltip,
  Tab,
} from "react-bootstrap";
import { NavLink, useParams } from "react-router-dom";
import { LAYOUT } from "../components/constants.jsx";
import HtmlHead from "../components/html-head/HtmlHead.jsx";
import BreadcrumbList from "../components/breadcrumb-list/BreadcrumbList.jsx";
import CsLineIcons from "../components/cs-line-icons/CsLineIcons.jsx";
//import useCustomLayout from 'hooks/useCustomLayout';
import Clamp from "../components/clamp/index.jsx";
import ProfileChart from "../components/ProfileChart.jsx";
//import ChartStreamingLine from '../../interface/plugins/chart/ChartStreamingLine';
//import './ProfileStandard.css'; // Ruta al archivo CSS

//import { API_ENDPOINTS } from '../../../config';

import { CustomerTableHistory } from "./CustomerTableHistory.jsx";

import { useRuns } from "../../../context/runContext.jsx";

export const AutomationsProfile = () => {
  const title = "Profile Standard";
  const description = "Profile Standard";

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

  const [run, setData] = React.useState();

  const { getRun } = useRuns(); // Usa la función getCustomers de tu contexto

  useEffect(() => {
    const loadRun = async () => {
      if (params.id) {
        console.log("data requested in RunProfile.jsx");
        const run = await getRun(params.id);
        console.log("data received at RunProfile.jsx");
        console.log(run);
        setData(run);
      }
    };
    loadRun();
  }, []);

  function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
  }

  const jsonToHtml = (json, depth = 0) => {
    if (typeof json === "string") {
      try {
        json = JSON.parse(json);
      } catch (e) {
        return `<span class="json-error">${json}</span>`;
      }
    }

    if (typeof json !== "object" || json === null) {
      return `<span class="json-primitive">${json}</span>`;
    }

    let html = "";
    if (Array.isArray(json)) {
      html += "[";
      json.forEach((item, index) => {
        html += `<div class="json-nesting-level-${depth}">${jsonToHtml(
          item,
          depth + 1
        )}</div>`;
        if (index < json.length - 1) {
        }
      });
      html += "]";
    } else {
      html += "{";
      const keys = Object.keys(json);
      keys.forEach((key, index) => {
        html += `<div class="json-nesting-level-${depth}"><span class="json-key">"${key}": </span>${jsonToHtml(
          json[key],
          depth + 1
        )}</div>`;
        if (index < keys.length - 1) {
        }
      });
      html += "}";
    }

    return html;
  };

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
            {/* <Button
              variant="outline-primary"
              className="btn-icon btn-icon-start btn-icon w-100 w-md-auto ms-1"
            >
              <CsLineIcons icon="edit-square" /> <span>Edit</span>
          </Button>*/}
          </Col>
          {/* Top Buttons End */}
        </Row>
      </div>
      {/* Title and Top Buttons End */}

      <Row className="g-5">
        <Tab.Container id="profileStandard" defaultActiveKey="overview">
          {/* Sidebar Start */}
          <Col xl="4" xxl="3">
            <h2 className="small-title">Automation</h2>
            <Card className="mb-5">
              <Card.Body>
                <div className="d-flex align-items-center flex-column mb-4">
                  <div className="d-flex align-items-center flex-column">
                    {/*
                    <div className="sw-13 position-relative mb-3">
                      <img src="/img/profile/profile-1.webp" className="img-fluid rounded-xl" alt="thumb" />
                    </div>
                    */}


                    <br></br>

                    {/* {run && (
                      <div className="text-muted flex profileMenuDetail">
                        Name <CsLineIcons icon="user" className="me-1" />{" "}
                        {run.automationName}
                      </div>
                    )} */}

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



                  <Nav.Link
                    className="px-0 border-bottom border-separator-light cursor-pointer itemLista"
                    eventKey="overview"
                  >
                    <CsLineIcons icon="activity" className="me-2" size="17" />
                    <span className="align-middle">Vista general</span>
                  </Nav.Link>


                  <Nav.Link
                    className="px-0 border-bottom border-separator-light cursor-pointer itemLista"
                    eventKey="overview"
                  >
                    <CsLineIcons icon="list" className="me-2" size="17" />
                    <span className="align-middle">Detalles</span>
                  </Nav.Link>


                  <Nav.Link
                    className="px-0 border-bottom border-separator-light cursor-pointer itemLista"
                    eventKey="projects"
                  >
                    <CsLineIcons
                      icon="star"
                      className="me-2"
                      size="17"
                    />
                    <span className="align-middle">Intereses</span>
                  </Nav.Link>

                  <Nav.Link
                    className="px-0 border-bottom border-separator-light cursor-pointer itemLista"
                    eventKey="projects"
                  >
                    <CsLineIcons
                      icon="diploma"
                      className="me-2"
                      size="17"
                    />
                    <span className="align-middle">Patrimonio</span>
                  </Nav.Link>






                  <Nav.Link
                    className="px-0 border-bottom border-separator-light cursor-pointer itemLista"
                    eventKey="projects"
                  >
                    <CsLineIcons
                      icon="eye"
                      className="me-2"
                      size="17"
                    />
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
                <h2 className="small-title">Overview</h2>
                <Row className="g-2 mb-5">
                  <Col sm="6" lg="3">
                    <Card className="hover-border-primary">
                      <Card.Body>
                        <div className="heading mb-0 d-flex justify-content-between lh-1-25 mb-3">
                          <span>Automation</span>
                          <CsLineIcons
                            icon="spinner"
                            className="text-primary"
                          />
                        </div>
                        <div className="text-small text-muted mb-1">NAME</div>

                        {run && (
                          <div className="cta-1 text-primary">
                            {run.automationName}
                          </div>
                        )}
                      </Card.Body>
                    </Card>
                  </Col>

                  <Col sm="6" lg="3">
                    <Card className="hover-border-primary">
                      <Card.Body>
                        <div className="heading mb-0 d-flex justify-content-between lh-1-25 mb-3">
                          <span>Timestamp</span>
                          <CsLineIcons icon="clock" className="text-primary" />
                        </div>
                        <div className="text-small text-muted mb-1">UTC</div>

                        {run && (
                          <div className="cta-1 text-primary">
                            {formatDate(run.timestamp)}
                          </div>
                        )}
                      </Card.Body>
                    </Card>
                  </Col>

                  <Col sm="6" lg="3">
                    <Card className="hover-border-primary">
                      <Card.Body>
                        <div className="heading mb-0 d-flex justify-content-between lh-1-25 mb-3">
                          <span>Description</span>
                          <CsLineIcons icon="form" className="text-primary" />
                        </div>
                        <div className="text-small text-muted mb-1">
                          OVERVIEW
                        </div>
                        <div className="cta-1 text-primary"></div>
                      </Card.Body>
                    </Card>
                  </Col>

                  <Col sm="6" lg="3">
                    <Card className="hover-border-primary">
                      <Card.Body>
                        <div className="heading mb-0 d-flex justify-content-between lh-1-25 mb-3">
                          <span>Tag</span>
                          <CsLineIcons icon="flag" className="text-primary" />
                        </div>
                        <div className="text-small text-muted mb-1">LABEL</div>
                        {run && (
                          <div className="cta-1 text-primary">
                            {run.tag}
                          </div>
                        )}
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
                {/* Stats End */}

                {/* Stats End */}
                {/*  ROUTERS/ DEVICE Start */}
                {/*  ACA HAY QUE METERLE UN FOR EACH */}
                <h2 className="small-title">Automation resume (JSON logs)</h2>

                <Row className="row-cols-1 row-cols-sm-1 g-1 ">
                  <Col>
                    <Card className="h-100">
                      <Card.Body>
                        {run && (
                          <div class="resumeBOX">
                            {run.info.map((infoItem, index) => {
                              const htmlContent = jsonToHtml(infoItem);
                              return (
                                <div
                                  key={index}
                                  className="json-log-item"
                                  dangerouslySetInnerHTML={{
                                    __html: htmlContent,
                                  }}
                                >
                                  {/* The content is rendered by dangerouslySetInnerHTML */}
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>

                {/* Overview Tab End */}
              </Tab.Pane>
            </Tab.Content>
          </Col>
          {/* Content End */}
        </Tab.Container>
      </Row>
    </>
  );
};

export default AutomationsProfile;
