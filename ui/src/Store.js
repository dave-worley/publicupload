import React from 'react';

export const Store = React.createContext();

const initialState = {
  uploads: [],
  searchTerm: ''
};

function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_UPLOADS':
      return { ...state, uploads: action.payload };
    case 'SEARCH_UPLOADS':
      const { uploads, searchTerm } = action.payload;
      return { ...state, uploads, searchTerm};
    case 'REMOVE_UPLOAD':
      return {
        ...state,
        uploads: state.uploads.filter((u) => {
          return u.id !== action.payload.id;
        })
      };
    default:
      return state;
  }
}

export function StoreProvider(props) {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const value = { state, dispatch };
  return (<Store.Provider value={ value }>
    {props.children}
  </Store.Provider>);
}
