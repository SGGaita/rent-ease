import React, { createContext, useReducer } from 'react';

export const PropertyContext = createContext();

const initialPropertyState = {
  property: localStorage.getItem("property") ? JSON.parse(localStorage.getItem("property")) : null
};

const propertyReducer = (state, action) => {
  switch (action.type) {
    case 'SET_PROPERTY':
        localStorage.setItem("property", JSON.stringify(action.payload));
      return { ...state, 
        property:{propertyId: action.payload.propertyId, propertyName: action.payload.propertyName} };
    default:
      return state;
  }
};

export const PropertyProvider = ({ children }) => {
  const [state, dispatch] = useReducer(propertyReducer, initialPropertyState);

  return (
    <PropertyContext.Provider value={{ state, dispatch }}>
      {children}
    </PropertyContext.Provider>
  );
};
