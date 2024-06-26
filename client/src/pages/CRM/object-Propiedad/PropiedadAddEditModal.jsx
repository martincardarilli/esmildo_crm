import React, { useState, useEffect } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import SelectBasic from '../components/SelectBasic';
import { usePropiedades } from '../../../context/propiedadContext';

//import { usePropiedades } from "./context/propiedadContext";

import { toast } from 'react-toastify';

import CsLineIcons from '../components/cs-line-icons/CsLineIcons';
import AutocompleteFloatingLabel from '../components/AutocompleteFloatingLabel';

import BreadcrumbList from '../components/breadcrumb-list/BreadcrumbList';

import ImageUpload from './ImageUpload';

const ModalAddEditPropiedad = ({ tableInstance }) => {
  const { selectedFlatRows, data, setData, setIsOpenAddEditModal, isOpenAddEditModal } = tableInstance;
  const { createPropiedad, updatePropiedad, getPropiedades } = usePropiedades(); // Usando funciones del contexto
  const emptyPropiedad = {
    id: data.length + 1,
  };
  const [selectedPropiedad, setSelectedPropiedad] = useState(emptyPropiedad);

  useEffect(() => {
    //  console.log("PRE");
    //  console.log(selectedFlatRows);
    //  console.log("PRE");

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

    //  console.log('1833 | A quien vamos a modificar?');
    // console.log('1833x | ', selectedPropiedad);
    // console.log('1833 | encontrado');
    // console.log(tableInstance);

    return () => {};
  }, [isOpenAddEditModal, selectedFlatRows]);

  useEffect(() => {}, [selectedPropiedad]);

  const handleChange = (event) => {
    // Check if the event is coming from an input element with a value property
    if (event.target && typeof event.target.value === 'string' || typeof event.target.value === 'number') { 
      // EVENTO DE ESCRIBIR
      // EVENTO DE ESCRIBIR
      // EVENTO DE ESCRIBIR

      const value = event.target.value.trim();
      console.log(`Value: ${value}`);

      // Update the state with the new value
      setSelectedPropiedad({
        ...selectedPropiedad,
        [event.target.name]: value,
      });
    } else {
      // EVENTO DE CLICK
      // EVENTO DE CLICK
      // EVENTO DE CLICK
      console.log('Trying to handle non-input event...');
      // Try to find the input inside the `.campoRelacional` div and extract its value

      // Solucion = Preguntar si vino de suggestion click
      setSelectedPropiedad({
        ...selectedPropiedad,
        [event.accessor]: event.valor, // !!!!!!!!!!!!!!!! se pasa el ID directamente
      });
    }


    console.log(selectedPropiedad);


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
    console.log('Propiedad seleccionado:', selectedPropiedad);

    // Validar campos requeridos
    /*if (!selectedPropiedad.name || !selectedPropiedad.address || !selectedPropiedad.hourFee) {
    toast.error("All fields are required.");
    return;
  }*/

    try {
      let response;

      if (selectedFlatRows.length === 1) {
        response = await updatePropiedad(selectedPropiedad._id, selectedPropiedad);
      } else {
        response = await createPropiedad(selectedPropiedad);
      }

      if (response.status === 200 || response.status === 201) {
        /*const newData =
          selectedFlatRows.length === 1
            ? data.map((row, rowIndex) =>
                rowIndex === selectedFlatRows[0].index ? selectedPropiedad : row
              )
            : [selectedPropiedad, ...data];*/

        if (response.status === 200) {
          toast.success('Updated Propiedad!');
        }

        if (response.status === 201) {
          toast.success('Created Propiedad!');
        }
        //setData(newData);
        getPropiedades();
        //console.log("setIsOpenAddEditModal(false)");
        setIsOpenAddEditModal(false);
        //toast.success("Succesfully created/updated");
      }
    } catch (error) {
      toast.error(`Code ${error.code}; ${error.message}`);
      console.error('error');
      console.error(error);

      const errorMessages = error.response && error.response.data && error.response.data.message ? error.response.data.message : `Error ${error.response}`;

      console.error('errorMessages');
      console.error(errorMessages);

      console.error('error.response');
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
  const estadoOptions = [
    { value: 'Disponible', label: 'Disponible' },
    { value: 'No disponible', label: 'No disponible' },
    { value: 'Reservado', label: 'Reservado' },
    { value: 'Vendido', label: 'Vendido' },
  ];

  const currencyOptions = [
    { value: 'USD', label: 'USD' },
    { value: 'ARS', label: 'ARS' },
  ];
  const superficieOptions = [
    { value: 'm2', label: 'm2' },
    { value: 'h', label: 'h' },
  ];

  // Opciones para el tipo
  const tipoOptions = [
    { value: 'Alquiler', label: 'Alquiler' },
    { value: 'Venta', label: 'Venta' },
    { value: 'Permuta', label: 'Permuta' },
    { value: 'Otro', label: 'Otro' },
  ];

  return (
    <Modal className="modal-right fade" show={isOpenAddEditModal} onHide={() => setIsOpenAddEditModal(false)}>
      <Modal.Header>
        <Modal.Title>{selectedFlatRows.length === 1 ? 'Editar Propiedad' : 'Agregar Propiedad'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>

          {/* <ImageUpload/> */}

          <div className="mb-3">
            <Form.Label>
              <span class="requerido">*</span> Inmueble
            </Form.Label>
            <Form.Control type="text" name="propiedad" defaultValue={selectedPropiedad.propiedad} onInput={handleChange} />
          </div>
          <div className="ds-1">
            <Form.Label>Tipo</Form.Label>
            <SelectBasic
              name="tipo"
              defaultValue={selectedPropiedad.tipo} // Esto debe ser uno de los valores en tipoOptions
              handleChange={handleChange}
              options={tipoOptions}
            />
          </div>




          <div className="mb-3">
            <Form.Label>Superficie</Form.Label>
            <div className="mb-4">
              
              <div className="ds-3 superficieValue">
                <Form.Control type="number" name="superficieValue" defaultValue={selectedPropiedad.superficie} onInput={handleChange} />
              </div>

              <div className="ds-2 superficieType">
                <SelectBasic
                  name="superficieType"
                  defaultValue={selectedPropiedad.superficie || 'm2'} // Asegúrate de manejar el estado inicial adecuadamente
                  handleChange={handleChange}
                  options={superficieOptions}
                ></SelectBasic>
              </div>
            </div>
          </div>



          <div className="mb-3">
            <Form.Label>
              <span className="requerido">*</span> Valor
            </Form.Label>
            <div className="mb-4">
              <div className="ds-2">
                <SelectBasic
                  name="valorType"
                  defaultValue={selectedPropiedad.currency || 'ARS'} // Asegúrate de manejar el estado inicial adecuadamente
                  handleChange={handleChange}
                  options={currencyOptions}
                ></SelectBasic>
              </div>
              <div className="ds-3">
                <Form.Control type="number" name="valorValue" defaultValue={selectedPropiedad.valor} onInput={handleChange} />
              </div>
            </div>
          </div>



          
          <div className="ds-1 estadoField">
            <Form.Label>Estado</Form.Label>
            <SelectBasic
              name="estado"
              defaultValue={selectedPropiedad.estado} // Esto debe ser uno de los valores en estadoOptions
              handleChange={handleChange}
              options={estadoOptions}
            />
          </div>

      
            <Form.Label>Dueño (Persona)</Form.Label>
          <div className="campoRelacional">
            <CsLineIcons icon="user" />

            <AutocompleteFloatingLabel label="Buscar" name="propietario" handleChange={handleChange} />
          </div>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-primary" onClick={() => setIsOpenAddEditModal(false)}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={savePropiedad}>
          {selectedFlatRows.length === 1 ? 'Actualizar' : 'Agregar'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalAddEditPropiedad;
