import React, { useState, useEffect } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';

import { useCustomers } from "../../../context/customerContext";

//import { useCustomers } from "./context/customerContext";

import { toast } from 'react-toastify';

const ModalAddEditCustomer = ({ tableInstance }) => {
  const { selectedFlatRows, data, setData, setIsOpenAddEditModal, isOpenAddEditModal } = tableInstance;
  const { createCustomer, updateCustomer, getCustomers } = useCustomers(); // Usando funciones del contexto
  const emptyCustomer = { id: data.length + 1, name: '', address: '', hourFee: '' };
  const [selectedCustomer, setSelectedCustomer] = useState(emptyCustomer);



  useEffect(() => {
    if (isOpenAddEditModal && selectedFlatRows.length === 1) {
      setSelectedCustomer(selectedFlatRows[0].original);
    } else {
      setSelectedCustomer(emptyCustomer);
    }
    return () => {};
  }, [isOpenAddEditModal, selectedFlatRows]);

  const handleChange = (event) => {
    setSelectedCustomer({ ...selectedCustomer, [event.target.name]: event.target.value });
  };

  const saveCustomerDEPRECATED = async () => {
    console.log("Cliente seleccionado:", selectedCustomer);

    if (selectedFlatRows.length === 1) {
      await updateCustomer(selectedCustomer._id, selectedCustomer);
      const { index } = selectedFlatRows[0];
      const newData = data.map((row, rowIndex) => (rowIndex === index ? selectedCustomer : row));
      //setData(newData);
      getCustomers();
      setIsOpenAddEditModal(false);
    } else {
      await createCustomer(selectedCustomer);
      const newData = [selectedCustomer, ...data];
      //setData(newData);
      getCustomers();
      setIsOpenAddEditModal(false);
    }
   
  };

  const saveCustomer = async () => {
    console.log("Cliente seleccionado:", selectedCustomer);
  
    try {
      let response;

      console.log("selectedFlatRows");
      console.log(selectedFlatRows.length === 1);
  
      if (selectedFlatRows.length === 1) {
        response = await updateCustomer(selectedCustomer._id, selectedCustomer);
      } else {
        response = await createCustomer(selectedCustomer);
      }

      console.log(response);
  
      if (response.status === 200 || response.status === 201) {
        const newData = selectedFlatRows.length === 1
          ? data.map((row, rowIndex) => (rowIndex === selectedFlatRows[0].index ? selectedCustomer : row))
          : [selectedCustomer, ...data];
  
        //setData(newData);
        getCustomers();
        console.log("setIsOpenAddEditModal(false)");
        setIsOpenAddEditModal(false);
      }
    } catch (error) {
      console.error(error);
      const errorMessage = error.response && error.response.data && error.response.data.message
                           ? error.response.data.message
                           : 'Ocurrió un error desconocido';
      toast.error(`Error: ${errorMessage}`);
    }
  };
  

  return (
    <Modal className="modal-right fade" show={isOpenAddEditModal} onHide={() => setIsOpenAddEditModal(false)}>
      <Modal.Header>
        <Modal.Title>{selectedFlatRows.length === 1 ? 'Edit Customer' : 'Add Customer'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <div className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" name="name" defaultValue={selectedCustomer.name} onChange={handleChange} />
          </div>
          <div className="mb-3">
            <Form.Label>Address</Form.Label>
            <Form.Control type="text" name="address" defaultValue={selectedCustomer.address} onChange={handleChange} />
          </div>
          <div className="mb-3">
            <Form.Label>Hour Fee</Form.Label>
            <Form.Control type="number" name="hourFee" defaultValue={selectedCustomer.hourFee} onChange={handleChange} />
          </div>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-primary" onClick={() => setIsOpenAddEditModal(false)}>
          Cancel
        </Button>
        <Button variant="primary" onClick={saveCustomer}>
          {selectedFlatRows.length === 1 ? 'Update' : 'Add'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalAddEditCustomer;
