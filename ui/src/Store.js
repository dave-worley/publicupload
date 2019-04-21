import React from 'react';

export const Store = React.createContext({});

const initialState = {
  uploads: [],
  searchTerm: '',
  uploadFile: null,
  uploadFormVisible: false
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
    case 'UPLOAD_FILE':
      const newUploads = state.uploads.slice(0);
      newUploads.push(action.payload);
      return {
        ...state,
        uploads: newUploads,
        uploadFile: null
      };
    case 'SET_UPLOAD_FILE':
      return {
        ...state,
        uploadFile: action.payload
      };
    case 'TOGGLE_UPLOAD_FORM':
      return {
        ...state,
        uploadFormVisible: action.payload
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
