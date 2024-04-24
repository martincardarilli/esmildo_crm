import React from 'react';
import Select from 'react-select';

const SelectBasic = ({ handleChange, name, defaultValue, options }) => {

  const handleChangeInternal = (selectedOption) => {
    const event = {
      target: {
        name: name,
        value: selectedOption.value,
      },
    };
    handleChange(event);
  };

  const value = options.find(option => option.value === defaultValue);

  return (
    <Select
      classNamePrefix="react-select"
      options={options}
      value={value}
      onChange={handleChangeInternal}
      name={name}
      placeholder = {null}
    />
  );
};

export default SelectBasic;
