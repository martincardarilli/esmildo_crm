import React, { useState } from 'react';
import Select from 'react-select';

const SelectBasic = ({ handleChange, name }) => {
  const [value, setValue] = useState();

  const options = [
    { value: 'Disponible', label: 'Disponible' },
    { value: 'No disponible', label: 'No disponible' },
    { value: 'otro', label: 'otro' },

  ];

  const handleChangeInternal = (event) => {


    let eventFake = {
      accessor: "estado", // name
      valor: event.value
  }
    handleChange(eventFake);
  }

  return <Select classNamePrefix="react-select" options={options} value={value} onChange={handleChangeInternal} placeholder="" />;
};

export default SelectBasic;
