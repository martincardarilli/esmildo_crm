import React, { useState, useEffect } from "react";
import { Button, Form, Modal } from "react-bootstrap";

import { useVehiculos } from "../../../context/vehiculoContext";

//import { useVehiculos } from "./context/vehiculoContext";

import { toast } from "react-toastify";

const ModalAddEditVehiculo = ({ tableInstance }) => {
  const {
    selectedFlatRows,
    data,
    setData,
    setIsOpenAddEditModal,
    isOpenAddEditModal,
  } = tableInstance;
  const { createVehiculo, updateVehiculo, getVehiculos } = useVehiculos(); // Usando funciones del contexto
  const emptyVehiculo = {
    id: data.length + 1,
    name: "",
    address: "",
    hourFee: "",
  };
  const [selectedVehiculo, setSelectedVehiculo] = useState(emptyVehiculo);

  useEffect(() => {
    console.log("PRE");
    console.log(selectedFlatRows);
    console.log("PRE");

    if (isOpenAddEditModal && selectedFlatRows.length === 1) {
      const vehiculoData = { ...selectedFlatRows[0].original };
      // Convertir todos los valores a string
      Object.keys(vehiculoData).forEach((key) => {
        vehiculoData[key] = String(vehiculoData[key]);
      });

      setSelectedVehiculo(vehiculoData);
    } else {
      setSelectedVehiculo(emptyVehiculo);
    }

     console.log('1833 | A quien vamos a modificar?');
    console.log('1833x | ', selectedVehiculo);
    console.log('1833 | encontrado');
    console.log(tableInstance);

    return () => {};
  }, [isOpenAddEditModal, selectedFlatRows]);

  useEffect(() => {
    console.log(`1833B ~ selectedVehiculo ${selectedVehiculo}`);
 //   console.log(selectedFlatRows[0].original);
    console.log(selectedFlatRows.length === 1);
    console.log(selectedVehiculo);
    console.log(tableInstance);
  }, [selectedVehiculo]);

  const handleChange = (event) => {
    console.log(`value changed ª event ${event}`);

    const value = event.target.value.trim();
    console.log(`value ª value ${value}`);
    console.log(value);
    console.log(value ? "si" : "no");
    // setSelectedVehiculo({ ...selectedVehiculo, [event.target.name]: event.target.value.trim() });
    setSelectedVehiculo({
      ...selectedVehiculo,
      [event.target.name]: value ? value : "",
    });
  };

  /* const handleChange = (event) => {
    const { name, value } = event.target;
    const updatedValue = name === 'hourFee' ? parseFloat(value) || 0 : value;
    setSelectedVehiculo({ ...selectedVehiculo, [name]: updatedValue });
  };

  const saveVehiculoDEPRECATED = async () => {
    console.log("Cliente seleccionado:", selectedVehiculo);

    if (selectedFlatRows.length === 1) {
      await updateVehiculo(selectedVehiculo._id, {
        ...selectedVehiculo,
        hourFee: parseFloat(selectedVehiculo.hourFee) || 0
      });
      const { index } = selectedFlatRows[0];
      const newData = data.map((row, rowIndex) => (rowIndex === index ? selectedVehiculo : row));
      //setData(newData);
      getVehiculos();
      setIsOpenAddEditModal(false);
    } else {
      await createVehiculo({
        ...selectedVehiculo,
        hourFee: parseFloat(selectedVehiculo.hourFee) || 0
      });
      const newData = [selectedVehiculo, ...data];
      //setData(newData);
      getVehiculos();
      setIsOpenAddEditModal(false);
    }
   
  };*/

  const saveVehiculo = async () => {
    console.log("Cliente seleccionado:", selectedVehiculo);

    // Validar campos requeridos
    /*if (!selectedVehiculo.name || !selectedVehiculo.address || !selectedVehiculo.hourFee) {
    toast.error("All fields are required.");
    return;
  }*/

    try {
      let response;

      console.log("selectedFlatRows");
      console.log(selectedFlatRows.length === 1);

      if (selectedFlatRows.length === 1) {
        response = await updateVehiculo(selectedVehiculo._id, selectedVehiculo);
      } else {
        response = await createVehiculo(selectedVehiculo);
      }

      //console.log(response);

      console.log(response);

      if (response.status === 200 || response.status === 201) {
        /*const newData =
          selectedFlatRows.length === 1
            ? data.map((row, rowIndex) =>
                rowIndex === selectedFlatRows[0].index ? selectedVehiculo : row
              )
            : [selectedVehiculo, ...data];*/

        if (response.status === 200) {
          toast.success("Updated Vehiculo!");
        }

        if (response.status === 201) {
          toast.success("Created Vehiculo!");
        }
        //setData(newData);
        getVehiculos();
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
          {selectedFlatRows.length === 1 ? "Editar Vehiculo" : "Agregar Vehiculo"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <div className="mb-3">
            <Form.Label>Fabricante</Form.Label>
            <Form.Control
              type="text"
              name="fabricante"
              defaultValue={selectedVehiculo.fabricante}
              onInput={handleChange}
            />
          </div>
          <div className="mb-3">
            <Form.Label>Modelo</Form.Label>
            <Form.Control
              type="text"
              name="modelo"
              defaultValue={selectedVehiculo.modelo}
              onInput={handleChange}
            />
          </div>
          <div className="mb-3">
            <Form.Label>Año</Form.Label>
            <Form.Control
              type="number"
              name="año"
              defaultValue={selectedVehiculo.año}
              onInput={handleChange}
            />
          </div>
          <div className="mb-3">
            <Form.Label>Patente</Form.Label>
            <Form.Control
              type="text"
              name="patente"
              defaultValue={selectedVehiculo.patente}
              onInput={handleChange}
            />
          </div>
          <div className="mb-3">
            <Form.Label>Kilometros</Form.Label>
            <Form.Control
              type="text"
              name="km"
              defaultValue={selectedVehiculo.km}
              onInput={handleChange}
            />
          </div>
          <div className="mb-3">
            <Form.Label>Valor</Form.Label>
            <Form.Control
              type="number"
              name="valor"
              defaultValue={selectedVehiculo.valor}
              onInput={handleChange}
            />
          </div>
          <div className="mb-3">
            <Form.Label>Estado</Form.Label>
            <Form.Control
              type="text"
              name="estado"
              defaultValue={selectedVehiculo.estado}
              onInput={handleChange}
            />
          </div>
          <div className="mb-3">
            <Form.Label>Color</Form.Label>
            <Form.Control
              type="text"
              name="color"
              defaultValue={selectedVehiculo.color}
              onInput={handleChange}
            />
          </div>
          <div className="mb-3">
            <Form.Label>Puertas</Form.Label>
            <Form.Control
              type="text"
              name="puertas"
              defaultValue={selectedVehiculo.puertas}
              onInput={handleChange}
            />
          </div>
          <div className="mb-3">
            <Form.Label>Traccion</Form.Label>
            <Form.Control
              type="text"
              name="traccion"
              defaultValue={selectedVehiculo.traccion}
              onInput={handleChange}
            />
          </div>

          <div className="mb-3">
            <Form.Label>Motor</Form.Label>
            <Form.Control
              type="text"
              name="motor"
              defaultValue={selectedVehiculo.motor}
              onInput={handleChange}
            />
          </div>
          <div className="mb-3">
            <Form.Label>AC</Form.Label>
            <Form.Control
              type="text"
              name="ac"
              defaultValue={selectedVehiculo.ac}
              onInput={handleChange}
            />
          </div>
          <div className="mb-3">
            <Form.Label>DH</Form.Label>
            <Form.Control
              type="text"
              name="dh"
              defaultValue={selectedVehiculo.dh}
              onInput={handleChange}
            />
          </div>
          
          <div className="mb-3">
            <Form.Label>Propietario</Form.Label>
            <Form.Control
              type="text"
              name="propietario"
              defaultValue={selectedVehiculo.propietario}
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
        <Button variant="primary" onClick={saveVehiculo}>
          {selectedFlatRows.length === 1 ? "Actualizar" : "Agregar"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalAddEditVehiculo;
