import React, { useEffect, useState } from 'react';
import Autosuggest from 'react-autosuggest';
//import axios from 'axios';
//import { SERVICE_URL } from 'config.js';

// Dummy data declaration
const dummyData = [
          { id: 1, name: 'SALT', since: "Jan 2022", stock: 15, category: '', tag: 'New' },
          { id: 2, name: 'Grotto Bay', since: "Jan 2022", stock: 97, category: '', tag: 'Done' },
          { id: 3, name: 'Moongate', since: "Jan 2022", stock: 154, category: '', tag: '' },
          { id: 4, name: 'Health City', since: "Jan 2022", stock: 39, category: '', tag: '' },
];

import { useCustomers } from "../../../context/customerContext";

const AutocompleteFloatingLabel = ({ label, name, handleChange }) => {
          // OJO que arroja todo el frontend 
          // No "busca" despues de 1 o mas caracteres introducidos
          const { getCustomers, customers } = useCustomers(); // Usa la función getCustomers de tu contexto

          const [valueState, setValueState] = useState('');
          const [nameState, setNameState] = useState('');

          const [suggestions, setSuggestions] = useState([]);
          const [data, setData] = useState(null);

          const loadCustomers = async () => {
                    try {
                              const response = await getCustomers();
                              /*console.log(response);  no hay response, revisar getCustomers, solo cambia el estado "customers */
                    } catch (error) {
                              console.error("Error al cargar los clientes: ", error);
                    }
          };

          useEffect(() => {
                    //axios.get(`${SERVICE_URL}/products`).then((res) => {
                    //   setData(res.data);
                    //});

                    // Directly setting dummy data for development purposes
                    //setData(dummyData);

                    loadCustomers(); // Llama a la función al montar el componente
          }, []);

          useEffect(() => {
                    console.log("useEffect[customers] = ", customers);

                    // Establecer los nuevos datos en la tabla
                    setData(customers);

          }, [customers]);

          const escapeRegexCharacters = (str) => {
                    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
          };

          const getSuggestions = (value) => {
                    const escapedValue = escapeRegexCharacters(value.trim());
                    if (escapedValue === '') {
                              return [];
                    }
                    const regex = new RegExp(`^${escapedValue}`, 'i');
                    return data.filter((product) => regex.test(product.nombreApellido));
          };

        

          const onSuggestionsFetchRequested = ({ value: val }) => {
                    setSuggestions(getSuggestions(val));
          };

          const onSuggestionsClearRequested = () => {
                    setSuggestions([]);
          };

          const getSuggestionValue = (suggestion) => suggestion._id;

          const renderSuggestion = (suggestion) => <div>{suggestion.nombreApellido} ({suggestion.dni})</div>;


          const renderInputComponent = (props) => (
                    <div className="form-floating">

                              <input {...props} className="form-control" onInput={handleChange} />
                              <label>{label}</label>
                              <span>{nameState}</span>
                    </div>
          );

          // Nuevo
          const onSuggestionSelected = (event, { suggestion, suggestionValue }) => {
                    console.log("CLICKEASTE GATO " + suggestionValue);

                    setValueState(suggestion._id); // Assuming you want to show nombreApellido in the input
                    setNameState(`${suggestion.nombreApellido} (${suggestion.dni})`); // Update the name state if needed



                    // !!!!!!!!!!!!!!!! se pasa el ID directamente
                    // !!!!!!!!!!!!!!!! se pasa el ID directamente
                    // !!!!!!!!!!!!!!!! se pasa el ID directamente
                    let eventFake = {
                        accessor: "propietario", // ES LA VARIABLE DEL PROPS
                        valor: suggestion._id
                    }
                    handleChange(eventFake); // If you need to update parent state, send up the necessary event or value
                  };


        const changeInput = (event, { newValue }) => {
                        console.log("VALUE ==" + newValue);
                        console.log(event);
                        setValueState(newValue); // Esto maneja el tipeo de busqueda
                       
        };

          if (!data) {
                    return <></>;
          }

          return (
                    <Autosuggest
                              suggestions={suggestions}
                              onSuggestionsFetchRequested={onSuggestionsFetchRequested}
                              onSuggestionsClearRequested={onSuggestionsClearRequested}
                              getSuggestionValue={getSuggestionValue}
                              renderSuggestion={renderSuggestion}
                              focusInputOnSuggestionClick={false}
                              inputProps={{
                                        placeholder: label,
                                        name: name,
                                        value: valueState,
                                        onChange: changeInput,
                              }}
                              renderInputComponent={renderInputComponent}

                              onSuggestionSelected={onSuggestionSelected} // Nuevo
                    />
          );
};

export default AutocompleteFloatingLabel;
