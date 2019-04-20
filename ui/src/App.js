import React from 'react';
import './App.css';
import { Store } from './Store';
import ListUploads from "./components/listUploads";


export default () => {
  const { state, dispatch } = React.useContext(Store);
  const fetchUploadsAction = async () => {
    const data = await fetch('http://localhost:8000/listuploads');
    const dataJSON = await data.json();
    return dispatch({
      type: 'FETCH_UPLOADS',
      payload: dataJSON
    });
  };
  React.useEffect(() => {
    state.uploads.length === 0 && fetchUploadsAction();
  });
  return (
    <div className="App">
      <ListUploads />
    </div>
  );
}
