import React, { useState } from 'react';
import Select from 'react-select';

const SelectBasic = ({handleChange, name}) => {
  const [value, setValue] = useState();

  const options = [
    { value: 'Disponible', label: 'Disponible' },
    { value: 'No disponible', label: 'No disponible' },
    { value: 'otro', label: 'otro' },

  ];

  const handleChangeInternal = (event, handleChange) => {
    console.log("LOHSE");
    console.log(event);

    let eventFake = {
      accessor: "estado", // AHORA SI NAME
      valor: event.value
  }
    handleChange(eventFake);
  }

  return <Select classNamePrefix="react-select" options={options} value={value} onChange={handleChangeInternal} placeholder="" />;
};

export default SelectBasic;
