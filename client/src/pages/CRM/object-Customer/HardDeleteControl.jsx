import React from "react";
import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import CsLineIcons from "../components/cs-line-icons/CsLineIcons";

//TEMPORAL??
import { toast } from "react-toastify";

import { useCustomers } from "../../../context/customerContext";
import { useState, useEffect } from "react";

const HardDeleteControl = ({ tableInstance, getObjects, deleteObject }) => {


  // ---start------------------- Aca maneja el row seleccionado ---
  const {
    selectedFlatRows,
    data,
    isOpenAddEditModal,
    state: { selectedRowIds },
  } = tableInstance;



  const emptyCustomer = {
    id: data.length + 1,
    name: "",
    address: "",
    hourFee: "",
  };

  const [selectedCustomer, setSelectedCustomer] = useState(emptyCustomer);

  useEffect(() => {
    if (isOpenAddEditModal && selectedFlatRows.length === 1) {
      setSelectedCustomer(selectedFlatRows[0].original);
    } else {
      setSelectedCustomer(emptyCustomer);
    }
    return () => {};
  }, [isOpenAddEditModal, selectedFlatRows]);
 // ---end------------------- Aca maneja el row seleccionado ---







  // ---start------------------- Aca maneja el CRUD ---
    //const { getCustomers, deleteCustomer } = useCustomers(); // Usando funciones del contexto


  const onClick = async () => {
    for (let i = 0; i < selectedFlatRows.length; i++) {
      console.log(
        "Delete Cliente2 seleccionado: selectedFlatRows",
        selectedFlatRows[i].original._id
      );
      toast.success(`Erased ${selectedFlatRows[i].original.name}`);
        await deleteObject(selectedFlatRows[i].original._id);
       //response = await updateCustomer(selectedFlatRows[i].original._id, {isActive: false} );
    }
    getObjects();

  };
  // ---end------------------- Aca maneja el CRUD ---






  // ---start------------------- HTML ---
  if (selectedFlatRows.length === 0) {
    return (
      <Button
        variant="foreground-alternate"
        className="btn-icon btn-icon-only shadow delete-datatable hardDelete"
        disabled
      >
        <CsLineIcons icon="bin" />
      </Button>
    );
  }


  return (
    <OverlayTrigger
      placement="top"
      overlay={<Tooltip id="tooltip-top-delete">Eliminar definitivamente</Tooltip>}
    >
      <Button
        onClick={onClick}
        variant="foreground-alternate"
        className="btn-icon btn-icon-only shadow delete-datatable hardDelete"
      >
        <CsLineIcons icon="bin" />
      </Button>
    </OverlayTrigger>
  );
};
// ---end------------------- HTML ---

export default HardDeleteControl;
