import React from 'react';
import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import CsLineIcons from '../cs-line-icons/CsLineIcons';

//TEMPORAL??
import { toast } from 'react-toastify';

import { useState, useEffect } from 'react';

const ObjectRecoverButton = ({ tableInstance, getObjects, updateObject }) => {
  // ---start------------------- Aca maneja el row getObjects ---
  const {
    selectedFlatRows,
    data,
    isOpenAddEditModal,
    state: { selectedRowIds },
  } = tableInstance;

  const emptyObject = {
    id: data.length + 1,
    name: '',
    address: '',
    hourFee: '',
  };

  const [selectedObject, setSelectedObject] = useState(emptyObject);

  useEffect(() => {
    if (isOpenAddEditModal && selectedFlatRows.length === 1) {
      setSelectedObject(selectedFlatRows[0].original);
    } else {
      setSelectedObject(emptyObject);
    }
    return () => {};
  }, [isOpenAddEditModal, selectedFlatRows]);
  // ---end------------------- Aca maneja el row seleccionado ---

  // ---start------------------- Aca maneja el CRUD ---
  //const { getCustomers, deleteCustomer } = useCustomers(); // Usando funciones del contexto

  const onClick = async () => {
    for (let i = 0; i < selectedFlatRows.length; i++) {
      try {
        const response = await updateObject(selectedFlatRows[i].original._id, { isActive: true });
        if (response.status === 200) {
          toast.success(`Erased ${selectedFlatRows[i].original.name}`);
        } else {
          toast.error(`Could not erase ${selectedFlatRows[i].original.name}`);
        }
      } catch (error) {
        toast.error(`Error erasing ${selectedFlatRows[i].original.name}: ${error.message}`);
      }
    }
    getObjects();
  };
  // ------------------- Aca maneja el CRUD ---

  // ---start------------------- HTML ---
  if (selectedFlatRows.length === 0) {
    return (
      <Button variant="foreground-alternate" className="btn-icon btn-icon-only shadow delete-datatable recuperarBoton" disabled>
        <CsLineIcons icon="recycle" />
      </Button>
    );
  }

  return (
    <OverlayTrigger placement="top" overlay={<Tooltip id="tooltip-top-delete">Recuperar</Tooltip>}>
      <Button onClick={onClick} variant="foreground-alternate"  className="btn-icon btn-icon-only shadow delete-datatable recuperarBoton">
        <CsLineIcons icon="recycle" />
      </Button>
    </OverlayTrigger>
  );
};
// ---end------------------- HTML ---

export default ObjectRecoverButton;
