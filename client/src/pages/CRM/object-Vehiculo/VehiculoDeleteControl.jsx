import React from "react";
import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import CsLineIcons from "../components/cs-line-icons/CsLineIcons";

//TEMPORAL??
import { toast } from "react-toastify";

import { useVehiculos } from "../../../context/vehiculoContext";
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
    //await updateVehiculo(selectedVehiculo._id, selectedVehiculo);
    setData(data.filter((x, index) => selectedRowIds[index] !== true));
    console.log(data);
  };

  const emptyVehiculo = {
    id: data.length + 1,
    name: "",
    address: "",
    hourFee: "",
  };
  const [selectedVehiculo, setSelectedVehiculo] = useState(emptyVehiculo);

  useEffect(() => {
    if (isOpenAddEditModal && selectedFlatRows.length === 1) {
      setSelectedVehiculo(selectedFlatRows[0].original);
    } else {
      setSelectedVehiculo(emptyVehiculo);
    }
    return () => {};
  }, [isOpenAddEditModal, selectedFlatRows]);

  // states
  const { createVehiculo, updateVehiculo, getVehiculos, deleteVehiculo } =
    useVehiculos(); // Usando funciones del contexto

  const onClick = async () => {
    for (let i = 0; i < selectedFlatRows.length; i++) {
      console.log(
        "Delete Cliente2 seleccionado: selectedFlatRows",
        selectedFlatRows[i].original._id
      );
      toast.success(`Erased ${selectedFlatRows[i].original.name}`);
      await deleteVehiculo(selectedFlatRows[i].original._id);
    }
    getVehiculos();

    //await deleteVehiculo(selectedVehiculo._id);
    /*
    if (selectedFlatRows.length === 1) {
      await updateVehiculo(selectedVehiculo._id, selectedVehiculo);
      const { index } = selectedFlatRows[0];
      const newData = data.map((row, rowIndex) => (rowIndex === index ? selectedVehiculo : row));
      //setData(newData);
      getVehiculos();
    } else {
      await createVehiculo(selectedVehiculo);
      const newData = [selectedVehiculo, ...data];
      //setData(newData);
      getVehiculos();
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
