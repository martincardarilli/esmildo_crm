import React from "react";
import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import CsLineIcons from "../components/cs-line-icons/CsLineIcons";

//TEMPORAL??
import { toast } from "react-toastify";

import { usePropiedades } from "../../../context/propiedadContext";
import { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

const RecoverControl = ({ tableInstance }) => {


  const navigate = useNavigate();

  const onClick = async () => {

   // navigate("/propiedades");
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