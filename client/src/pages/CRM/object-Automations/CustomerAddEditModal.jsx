import React, { useState, useEffect } from "react";
import { Button, Form, Modal } from "react-bootstrap";

import { useCustomers } from "../../../context/customerContext";

//import { useCustomers } from "./context/customerContext";

import { toast } from "react-toastify";

const ModalAddEditCustomer = ({ tableInstance }) => {
  const {
    selectedFlatRows,
    data,
    setData,
    setIsOpenAddEditModal,
    isOpenAddEditModal,
  } = tableInstance;
  const { createCustomer, updateCustomer, getCustomers } = useCustomers(); // Usando funciones del contexto
  const emptyCustomer = {
    id: data.length + 1,
    name: "",
    address: "",
    hourFee: "",
  };
  const [selectedCustomer, setSelectedCustomer] = useState(emptyCustomer);

  useEffect(() => {
    console.log("PRE");
    console.log(selectedFlatRows);
    console.log("PRE");

    if (isOpenAddEditModal && selectedFlatRows.length === 1) {
      const customerData = { ...selectedFlatRows[0].original };
      // Convertir todos los valores a string
      Object.keys(customerData).forEach((key) => {
        customerData[key] = String(customerData[key]);
      });

      setSelectedCustomer(customerData);
    } else {
      setSelectedCustomer(emptyCustomer);
    }

     console.log('1833 | A quien vamos a modificar?');
    console.log('1833x | ', selectedCustomer);
    console.log('1833 | encontrado');
    console.log(tableInstance);

    return () => {};
  }, [isOpenAddEditModal, selectedFlatRows]);

  useEffect(() => {
    console.log(`1833B ~ selectedCustomer ${selectedCustomer}`);
 //   console.log(selectedFlatRows[0].original);
    console.log(selectedFlatRows.length === 1);
    console.log(selectedCustomer);
    console.log(tableInstance);
  }, [selectedCustomer]);

  const handleChange = (event) => {
    console.log(`value changed ª event ${event}`);

    const value = event.target.value.trim();
    console.log(`value ª value ${value}`);
    console.log(value);
    console.log(value ? "si" : "no");
    // setSelectedCustomer({ ...selectedCustomer, [event.target.name]: event.target.value.trim() });
    setSelectedCustomer({
      ...selectedCustomer,
      [event.target.name]: value ? value : "",
    });
  };

  /* const handleChange = (event) => {
    const { name, value } = event.target;
    const updatedValue = name === 'hourFee' ? parseFloat(value) || 0 : value;
    setSelectedCustomer({ ...selectedCustomer, [name]: updatedValue });
  };

  const saveCustomerDEPRECATED = async () => {
    console.log("Cliente seleccionado:", selectedCustomer);

    if (selectedFlatRows.length === 1) {
      await updateCustomer(selectedCustomer._id, {
        ...selectedCustomer,
        hourFee: parseFloat(selectedCustomer.hourFee) || 0
      });
      const { index } = selectedFlatRows[0];
      const newData = data.map((row, rowIndex) => (rowIndex === index ? selectedCustomer : row));
      //setData(newData);
      getCustomers();
      setIsOpenAddEditModal(false);
    } else {
      await createCustomer({
        ...selectedCustomer,
        hourFee: parseFloat(selectedCustomer.hourFee) || 0
      });
      const newData = [selectedCustomer, ...data];
      //setData(newData);
      getCustomers();
      setIsOpenAddEditModal(false);
    }
   
  };*/

  const saveCustomer = async () => {
    console.log("Cliente seleccionado:", selectedCustomer);

    // Validar campos requeridos
    /*if (!selectedCustomer.name || !selectedCustomer.address || !selectedCustomer.hourFee) {
    toast.error("All fields are required.");
    return;
  }*/

    try {
      let response;

      console.log("selectedFlatRows");
      console.log(selectedFlatRows.length === 1);

      if (selectedFlatRows.length === 1) {
        response = await updateCustomer(selectedCustomer._id, selectedCustomer);
      } else {
        response = await createCustomer(selectedCustomer);
      }

      //console.log(response);

      console.log(response);

      if (response.status === 200 || response.status === 201) {
        /*const newData =
          selectedFlatRows.length === 1
            ? data.map((row, rowIndex) =>
                rowIndex === selectedFlatRows[0].index ? selectedCustomer : row
              )
            : [selectedCustomer, ...data];*/

        if (response.status === 200) {
          toast.success("Updated Customer!");
        }

        if (response.status === 201) {
          toast.success("Created Customer!");
        }
        //setData(newData);
        getCustomers();
        //console.log("setIsOpenAddEditModal(false)");
        setIsOpenAddEditModal(false);
        //toast.success("Succesfully created/updated");
      }
    } catch (error) {
      toast.error(`Code ${error.code}; ${error.message}`);
      console.error("error");
      console.error(error);
    
      
      const errorMessages =
        error.response && error.response.data && error.response.data.message
          ? error.response.data.message
          : `Error ${error.response}`;
         

          console.error("errorMessages");
      console.error(errorMessages);

      console.error("error.response");
      console.error(error.response);
      // toast.error(`Error: ${errorMessages}`);

      let formattedErrorMessage;

      if (errorMessages.length > 1) {
        errorMessages.forEach((message) => {
          toast.warning(message);
        });
      } else if (errorMessages.length === 1) {
        // Si solo hay un mensaje, úsalo directamente
        formattedErrorMessage = `${errorMessages[0]}.`;
        toast.warning(`${formattedErrorMessage}`);
      } else {
        // Si no hay mensajes, puedes definir un mensaje predeterminado
        //formattedErrorMessage = "Ocurrió un error desconocido.";

        toast.error(`Error: ${errorMessages}`);
      }

      // Mostrar el mensaje formateado
      //toast.error(`Error: ${formattedErrorMessage}`);
      
    }
  };

  return (
    <Modal
      className="modal-right fade"
      show={isOpenAddEditModal}
      onHide={() => setIsOpenAddEditModal(false)}
    >
      <Modal.Header>
        <Modal.Title>
          {selectedFlatRows.length === 1 ? "Edit Customer" : "Add Customer"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <div className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              defaultValue={selectedCustomer.name}
              onInput={handleChange}
            />
          </div>
          <div className="mb-3">
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              name="address"
              defaultValue={selectedCustomer.address}
              onInput={handleChange}
            />
          </div>
          <div className="mb-3">
            <Form.Label>Hour Fee</Form.Label>
            <Form.Control
              type="number"
              name="hourFee"
              defaultValue={selectedCustomer.hourFee}
              onInput={handleChange}
            />
          </div>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="outline-primary"
          onClick={() => setIsOpenAddEditModal(false)}
        >
          Cancel
        </Button>
        <Button variant="primary" onClick={saveCustomer}>
          {selectedFlatRows.length === 1 ? "Update" : "Add"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalAddEditCustomer;