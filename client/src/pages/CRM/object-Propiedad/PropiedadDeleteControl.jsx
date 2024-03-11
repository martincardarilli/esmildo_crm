import React from "react";
import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import CsLineIcons from "../components/cs-line-icons/CsLineIcons";

//TEMPORAL??
import { toast } from "react-toastify";

import { usePropiedades } from "../../../context/propiedadContext";
import { useState, useEffect } from "react";

const ControlsDelete = ({ tableInstance }) => {
  // props??
  const {
    selectedFlatRows,
    data,
    setData,
    setIsOpenAddEditModal,
    isOpenAddEditModal,
    state: { selectedRowIds },
  } = tableInstance;

  const onClick2 = () => {
    console.log("test");
    //await updatePropiedad(selectedPropiedad._id, selectedPropiedad);
    setData(data.filter((x, index) => selectedRowIds[index] !== true));
    console.log(data);
  };

  const emptyPropiedad = {
    id: data.length + 1,
    name: "",
    address: "",
    hourFee: "",
  };
  const [selectedPropiedad, setSelectedPropiedad] = useState(emptyPropiedad);

  useEffect(() => {
    if (isOpenAddEditModal && selectedFlatRows.length === 1) {
      setSelectedPropiedad(selectedFlatRows[0].original);
    } else {
      setSelectedPropiedad(emptyPropiedad);
    }
    return () => {};
  }, [isOpenAddEditModal, selectedFlatRows]);

  // states
  const { createPropiedad, updatePropiedad, getPropiedades, deletePropiedad } =
    usePropiedades(); // Usando funciones del contexto

  const onClick = async () => {
    for (let i = 0; i < selectedFlatRows.length; i++) {
      console.log(
        "Delete Cliente2 seleccionado: selectedFlatRows",
        selectedFlatRows[i].original._id
      );
      toast.success(`Erased ${selectedFlatRows[i].original.name}`);
      await deletePropiedad(selectedFlatRows[i].original._id);
    }
    getPropiedades();

    //await deletePropiedad(selectedPropiedad._id);
    /*
    if (selectedFlatRows.length === 1) {
      await updatePropiedad(selectedPropiedad._id, selectedPropiedad);
      const { index } = selectedFlatRows[0];
      const newData = data.map((row, rowIndex) => (rowIndex === index ? selectedPropiedad : row));
      //setData(newData);
      getPropiedades();
    } else {
      await createPropiedad(selectedPropiedad);
      const newData = [selectedPropiedad, ...data];
      //setData(newData);
      getPropiedades();
    }
    setIsOpenAddEditModal(false);
*/
  };

  if (selectedFlatRows.length === 0) {
    return (
      <Button
        variant="foreground-alternate"
        className="btn-icon btn-icon-only shadow delete-datatable"
        disabled
      >
        <CsLineIcons icon="bin" />
      </Button>
    );
  }
  return (
    <OverlayTrigger
      placement="top"
      overlay={<Tooltip id="tooltip-top-delete">Delete</Tooltip>}
    >
      <Button
        onClick={onClick}
        variant="foreground-alternate"
        className="btn-icon btn-icon-only shadow delete-datatable"
      >
        <CsLineIcons icon="bin" />
      </Button>
    </OverlayTrigger>
  );
};
export default ControlsDelete;
