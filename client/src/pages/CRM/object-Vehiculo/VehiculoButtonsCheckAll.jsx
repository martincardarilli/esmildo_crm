/* eslint-disable no-nested-ternary */
import { Button, ButtonGroup, Dropdown, Form } from 'react-bootstrap';
import React, { useEffect, useRef } from 'react';

const ButtonsCheckAll = ({ tableInstance }) => {
  const checkAllRef = useRef(null);
  const {
    getToggleAllPageRowsSelectedProps,
    setData,
    data,
    selectedFlatRows,
    state: { selectedRowIds },
  } = tableInstance;
  const { onChange, checked, indeterminate } = getToggleAllPageRowsSelectedProps();

  useEffect(() => {
    if (checkAllRef.current) {
      checkAllRef.current.indeterminate = indeterminate;
    }
    return () => {};
  }, [indeterminate]);

  const deleteSelectedItems = () => {
    setData(data.filter((x, index) => selectedRowIds[index] !== true));
  };

  const changeTagSelectedItems = (tag) => {
    const newData = data.map((x, index) => {
      if (selectedRowIds[index] === true) {

// hit database update


        return { ...x, tag };


      }
      return x;
    });
    setData(newData);
  };




  const saveVehiculo = async () => {
    console.log("Cliente seleccionado:", selectedVehiculo);
  
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
        const newData = selectedFlatRows.length === 1
          ? data.map((row, rowIndex) => (rowIndex === selectedFlatRows[0].index ? selectedVehiculo : row))
          : [selectedVehiculo, ...data];
        
          if (response.status === 200){
            toast.success("Updated Vehiculo!");
          }
          console.log("adentro¿?")
          if (response.status === 201){
            toast.success("Created Vehiculo!");
          }
        //setData(newData);
        getVehiculos();
        //console.log("setIsOpenAddEditModal(false)");
        setIsOpenAddEditModal(false);
        //toast.success("Succesfully created/updated");
      } 
    } catch (error) {
      console.error(error);
      const errorMessage = error.response && error.response.data && error.response.data.message
                           ? error.response.data.message
                           : `Error ${error.response}`;
      toast.error(`Error: ${errorMessage}`); // THIS IS NOT WORKING CHAT GPT MAKE THIS WORK SAYING UNDEFINED
    }
  };




  return (
    <div className="checkdownTable">
      <Dropdown drop="down" as={ButtonGroup} className="ms-1 check-all-container checkdownTableContainer" align="end">
        <Button variant="outline-primary" className="btn-custom-control p-0 ps-3 pe-2" onClick={onChange}>
          <Form.Check ref={checkAllRef} className="form-check float-end pt-0" type="checkbox" checked={checked} onChange={() => {}} />
        </Button>
        <Dropdown.Toggle split as={Button} variant="outline-primary" className="checkdownTableArrow" />
        <Dropdown.Menu
        className="checkdownTableMenu"
          popperConfig={{
            modifiers: [
              {
                name: 'computeStyles',
                options: {
                  gpuAcceleration: false,
                },
              },
            ],
          }}
        >
          <Dropdown drop="start" className="dropdown-submenu">
            <Dropdown.Menu className="checkdownTableMenu">
              <Dropdown.Item
                href="#/action"
                onClick={(event) => {
                  event.preventDefault();
                  changeTagSelectedItems('Done');
                }}
              >
                Done
              </Dropdown.Item>
              <Dropdown.Item
                href="#/action"
                onClick={(event) => {
                  event.preventDefault();
                  changeTagSelectedItems('New');
                }}
              >
                New
              </Dropdown.Item>
              <Dropdown.Item
                href="#/action"
                onClick={(event) => {
                  event.preventDefault();
                  changeTagSelectedItems('Sale');
                }}
              >
                Sale
              </Dropdown.Item>
            </Dropdown.Menu>
            <Dropdown.Toggle variant="link" disabled={selectedFlatRows.length === 0}>
              Tag
            </Dropdown.Toggle>
          </Dropdown>
          <Dropdown.Item href="#/action" disabled={selectedFlatRows.length === 0} onClick={deleteSelectedItems}>
            Delete
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};
export default ButtonsCheckAll;
