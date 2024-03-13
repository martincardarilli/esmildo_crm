import React from "react";
import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import CsLineIcons from "../components/cs-line-icons/CsLineIcons";

//TEMPORAL??
import { toast } from "react-toastify";

import { useVehiculos } from "../../../context/vehiculoContext";
import { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

const RecoverControl = ({ tableInstance }) => {


  const navigate = useNavigate();

  const onClick = async () => {

   // navigate("/vehiculos");
   console.log("RECUPERAR UNO POR UNO")
  };


  return (
    <OverlayTrigger
      placement="top" 
      overlay={<Tooltip id="tooltip-top-delete">Single recovery</Tooltip>}
    >
      <Button
        onClick={onClick}
        variant="foreground-alternate"
        className="btn-icon btn-icon-only shadow delete-datatable RecoverAction"
      >
        <CsLineIcons icon="recycle" />
      </Button>
    </OverlayTrigger>
  );
};
export default RecoverControl;
