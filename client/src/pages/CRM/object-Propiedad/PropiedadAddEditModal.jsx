import React, { useState, useEffect } from "react";
import { Button, Form, Modal } from "react-bootstrap";

import { usePropiedades } from "../../../context/propiedadContext";

//import { usePropiedades } from "./context/propiedadContext";

import { toast } from "react-toastify";

const ModalAddEditPropiedad = ({ tableInstance }) => {
  const {
    selectedFlatRows,
    data,
    setData,
    setIsOpenAddEditModal,
    isOpenAddEditModal,
  } = tableInstance;
  const { createPropiedad, updatePropiedad, getPropiedades } = usePropiedades(); // Usando funciones del contexto
  const emptyPropiedad = {
    id: data.length + 1,
    name: "",
    address: "",
    hourFee: "",
  };
  const [selectedPropiedad, setSelectedPropiedad] = useState(emptyPropiedad);

  useEffect(() => {
    console.log("PRE");
    console.log(selectedFlatRows);
    console.log("PRE");

    if (isOpenAddEditModal && selectedFlatRows.length === 1) {
      const propiedadData = { ...selectedFlatRows[0].original };
      // Convertir todos los valores a string
      Object.keys(propiedadData).forEach((key) => {
        propiedadData[key] = String(propiedadData[key]);
      });

      setSelectedPropiedad(propiedadData);
    } else {
      setSelectedPropiedad(emptyPropiedad);
    }

     console.log('1833 | A quien vamos a modificar?');
    console.log('1833x | ', selectedPropiedad);
    console.log('1833 | encontrado');
    console.log(tableInstance);

    return () => {};
  }, [isOpenAddEditModal, selectedFlatRows]);

  useEffect(() => {
    console.log(`1833B ~ selectedPropiedad ${selectedPropiedad}`);
 //   console.log(selectedFlatRows[0].original);
    console.log(selectedFlatRows.length === 1);
    console.log(selectedPropiedad);
    console.log(tableInstance);
  }, [selectedPropiedad]);

  const handleChange = (event) => {
    console.log(`value changed ª event ${event}`);

    const value = event.target.value.trim();
    console.log(`value ª value ${value}`);
    console.log(value);
    console.log(value ? "si" : "no");
    // setSelectedPropiedad({ ...selectedPropiedad, [event.target.name]: event.target.value.trim() });
    setSelectedPropiedad({
      ...selectedPropiedad,
      [event.target.name]: value ? value : "",
    });
  };

  /* const handleChange = (event) => {
    const { name, value } = event.target;
    const updatedValue = name === 'hourFee' ? parseFloat(value) || 0 : value;
    setSelectedPropiedad({ ...selectedPropiedad, [name]: updatedValue });
  };

  const savePropiedadDEPRECATED = async () => {
    console.log("Cliente seleccionado:", selectedPropiedad);

    if (selectedFlatRows.length === 1) {
      await updatePropiedad(selectedPropiedad._id, {
        ...selectedPropiedad,
        hourFee: parseFloat(selectedPropiedad.hourFee) || 0
      });
      const { index } = selectedFlatRows[0];
      const newData = data.map((row, rowIndex) => (rowIndex === index ? selectedPropiedad : row));
      //setData(newData);
      getPropiedads();
      setIsOpenAddEditModal(false);
    } else {
      await createPropiedad({
        ...selectedPropiedad,
        hourFee: parseFloat(selectedPropiedad.hourFee) || 0
      });
      const newData = [selectedPropiedad, ...data];
      //setData(newData);
      getPropiedads();
      setIsOpenAddEditModal(false);
    }
   
  };*/

  const savePropiedad = async () => {
    console.log("Cliente seleccionado:", selectedPropiedad);

    // Validar campos requeridos
    /*if (!selectedPropiedad.name || !selectedPropiedad.address || !selectedPropiedad.hourFee) {
    toast.error("All fields are required.");
    return;
  }*/

    try {
      let response;

      console.log("selectedFlatRows");
      console.log(selectedFlatRows.length === 1);

      if (selectedFlatRows.length === 1) {
        response = await updatePropiedad(selectedPropiedad._id, selectedPropiedad);
      } else {
        response = await createPropiedad(selectedPropiedad);
      }

      //console.log(response);

      console.log(response);

      if (response.status === 200 || response.status === 201) {
        /*const newData =
          selectedFlatRows.length === 1
            ? data.map((row, rowIndex) =>
                rowIndex === selectedFlatRows[0].index ? selectedPropiedad : row
              )
            : [selectedPropiedad, ...data];*/

        if (response.status === 200) {
          toast.success("Updated Propiedad!");
        }

        if (response.status === 201) {
          toast.success("Created Propiedad!");
        }
        //setData(newData);
        getPropiedades();
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
          {selectedFlatRows.length === 1 ? "Editar Propiedad" : "Agregar Propiedad"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <div className="mb-3">
            <Form.Label>Propiedad</Form.Label>
            <Form.Control
              type="text"
              name="propiedad"
              defaultValue={selectedPropiedad.propiedad}
              onInput={handleChange}
            />
          </div>
          <div className="mb-3">
            <Form.Label>Tipo</Form.Label>
            <Form.Control
              type="text"
              name="tipo"
              defaultValue={selectedPropiedad.tipo}
              onInput={handleChange}
            />
          </div>
          <div className="mb-3">
            <Form.Label>Superficie</Form.Label>
            <Form.Control
              type="text"
              name="superficie"
              defaultValue={selectedPropiedad.superficie}
              onInput={handleChange}
            />
          </div>
          <div className="mb-3">
            <Form.Label>Valor</Form.Label>
            <Form.Control
              type="text"
              name="valor"
              defaultValue={selectedPropiedad.valor}
              onInput={handleChange}
            />
          </div>
          <div className="mb-3">
            <Form.Label>Estado</Form.Label>
            <Form.Control
              type="text"
              name="estado"
              defaultValue={selectedPropiedad.estado}
              onInput={handleChange}
            />
          </div>
          <div className="mb-3">
            <Form.Label>Dueño</Form.Label>
            <Form.Control
              type="number"
              name="dueño"
              defaultValue={selectedPropiedad.dueño}
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
        <Button variant="primary" onClick={savePropiedad}>
          {selectedFlatRows.length === 1 ? "Actualizar" : "Agregar"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalAddEditPropiedad;
