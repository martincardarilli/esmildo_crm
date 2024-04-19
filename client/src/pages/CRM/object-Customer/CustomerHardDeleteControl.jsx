import React from "react";
import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import CsLineIcons from "../components/cs-line-icons/CsLineIcons";

//TEMPORAL??
import { toast } from "react-toastify";

import { useCustomers } from "../../../context/customerContext";
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
    //await updateCustomer(selectedCustomer._id, selectedCustomer);
    setData(data.filter((x, index) => selectedRowIds[index] !== true));
    console.log(data);
  };

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

  // states
  const { createCustomer, updateCustomer, getCustomers, deleteCustomer } =
    useCustomers(); // Usando funciones del contexto

  const onClick = async () => {
    let response;

    for (let i = 0; i < selectedFlatRows.length; i++) {
      console.log(
        "Delete Cliente2 seleccionado: selectedFlatRows",
        selectedFlatRows[i].original._id
      );
      toast.success(`Erased ${selectedFlatRows[i].original.name}`);
        await deleteCustomer(selectedFlatRows[i].original._id);
       //response = await updateCustomer(selectedFlatRows[i].original._id, {isActive: false} );
        console.log("acaaaaaaa")
    }
    getCustomers();

    //await deleteCustomer(selectedCustomer._id);
    /*
    if (selectedFlatRows.length === 1) {
      await updateCustomer(selectedCustomer._id, selectedCustomer);
      const { index } = selectedFlatRows[0];
      const newData = data.map((row, rowIndex) => (rowIndex === index ? selectedCustomer : row));
      //setData(newData);
      getCustomers();
    } else {
      await createCustomer(selectedCustomer);
      const newData = [selectedCustomer, ...data];
      //setData(newData);
      getCustomers();
    }
    setIsOpenAddEditModal(false);
*/
  };

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
export default ControlsDelete;
