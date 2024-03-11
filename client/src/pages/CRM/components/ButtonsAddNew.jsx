import { Button } from 'react-bootstrap';
import React from 'react';
import CsLineIcons from './cs-line-icons/CsLineIcons';

const ButtonsAddNew = ({ tableInstance }) => {
  const { toggleAllPageRowsSelected, setIsOpenAddEditModal } = tableInstance;

  const addButtonClick = () => {
    toggleAllPageRowsSelected(false);
    setIsOpenAddEditModal(true);
  };
  return (
    <Button variant="outline-primary" className="btn-icon btn-icon-start w-100 w-md-auto add-datatable addButton" onClick={addButtonClick}>
      <CsLineIcons icon="plus" /> <span>Agregar Persona</span>
    </Button>
  );
};

export default ButtonsAddNew;
