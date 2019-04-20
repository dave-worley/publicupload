import React from 'react';
import './App.css';
import { Store } from './Store';
import { fetchUploadsAction } from './actions';
import ListUploads from './components/listUploads';


export default () => {
  const { state, dispatch } = React.useContext(Store);
  React.useEffect(() => {
    state.uploads.length === 0 && fetchUploadsAction(dispatch);
  });
  return (
    <div className='App'>
      <ListUploads />
    </div>
  );
}
