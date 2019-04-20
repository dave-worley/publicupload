import React from 'react';
import './App.css';
import { Store } from './Store';
import { fetchUploadsAction } from './actions';
import ListUploads from './components/listUploads';
import SearchBar from './components/searchBar';


export default () => {
  const { state, dispatch } = React.useContext(Store);
  React.useEffect(() => {
    state.uploads.length === 0 && state.searchTerm === '' && fetchUploadsAction(dispatch);
  });
  return (
    <div className='App'>
      <SearchBar/>
      <ListUploads />
    </div>
  );
}
