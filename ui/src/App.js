import React from 'react';
import './App.css';
import { Store } from './Store';
import { fetchUploadsAction } from './actions';
import ListUploads from './components/listUploads';
import SearchBar from './components/searchBar';
import UploadFile from './components/uploadFile';
import ErrorDisplay from './components/errorDisplay';


export default () => {
  const { state, dispatch } = React.useContext(Store);
  React.useEffect(() => {
    state && state.uploads.length === 0 && state.searchTerm === '' && fetchUploadsAction(dispatch);
  });
  return (<div className='App'>
    { state.error && <ErrorDisplay>{ state.error }</ErrorDisplay> }
    <UploadFile/>
    <SearchBar/>
    <ListUploads/>
  </div>);
}
