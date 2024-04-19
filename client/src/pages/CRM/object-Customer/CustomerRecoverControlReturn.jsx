import React from "react";
import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import CsLineIcons from "../components/cs-line-icons/CsLineIcons";

//TEMPORAL??
import { toast } from "react-toastify";

import { useCustomers } from "../../../context/customerContext";
import { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

const RecoverControl = ({ tableInstance }) => {


  const navigate = useNavigate();

  const onClick = async () => {

    navigate("/personas");
  };



  return (
  <OverlayTrigger
      placement="top" 
      overlay={<Tooltip id="tooltip-top-delete">Volver</Tooltip>}
    >
      <Button
        onClick={onClick}
        variant="foreground-alternate"
        className="btn-icon btn-icon-only shadow delete-datatable"
      >
        <CsLineIcons icon="arrow-left" />
      </Button>
      
    </OverlayTrigger>

    
  );
};


export default RecoverControl;
