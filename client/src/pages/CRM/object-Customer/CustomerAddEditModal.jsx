import React, { useState, useEffect } from "react";
import { Button, Form, Modal } from "react-bootstrap";

import { useCustomers } from "../../../context/customerContext";
import InputMask from 'react-input-mask';
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



    return () => {};
  }, [isOpenAddEditModal, selectedFlatRows]);

  useEffect(() => {

  }, [selectedCustomer]);

  const handleChange = (event) => {
    console.log(`value changed ª event ${event}`);

    const value = event.target.value.trim();

    // setSelectedCustomer({ ...selectedCustomer, [event.target.name]: event.target.value.trim() });
    setSelectedCustomer({
      ...selectedCustomer,
      [event.target.name]: value ? value : "",
    });
  };

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
          {selectedFlatRows.length === 1 ? "Editar Persona" : "Agregar Persona"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <div className="mb-3">
            <Form.Label>Nombre y Apellido</Form.Label>
            <Form.Control
              type="text"
              name="nombreApellido"
              defaultValue={selectedCustomer.nombreApellido}
              onInput={handleChange}
            />
          </div>
          <div className="mb-3">
            <Form.Label>Dirección</Form.Label>
            <Form.Control
              type="text"
              name="direccion"
              defaultValue={selectedCustomer.direccion}
              onInput={handleChange}
            />
          </div>
          <div className="mb-3">
            <Form.Label>Telefono</Form.Label>
            <InputMask mask="9999 999 999" defaultValue="" onChange={handleChange}></InputMask>
            <Form.Control
              type="number"
              name="telefono"
              defaultValue={selectedCustomer.telefono}
              onInput={handleChange}
            />
            
          </div>
          <div className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
            
              type="text"
              name="email"
              defaultValue={selectedCustomer.email}
              onInput={handleChange}
            />
          </div>
          <div className="mb-3">
            <Form.Label>DNI</Form.Label>
            <Form.Control
              type="number"
              name="dni"
              defaultValue={selectedCustomer.dni}
              onInput={handleChange}
            />
          </div>
          <div className="mb-3">
            <Form.Label>CUIT / CUIL</Form.Label>
            <Form.Control
              type="number"
              name="cuitCuil"
              defaultValue={selectedCustomer.cuitCuil}
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
          Cancelar
        </Button>
        <Button variant="primary" onClick={saveCustomer}>
          {selectedFlatRows.length === 1 ? "Actualizar" : "Agregar"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalAddEditCustomer;
