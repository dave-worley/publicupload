import React from 'react';
import { Store } from "../../Store";
import { searchUploadsAction, toggleUploadForm } from "../../actions";
import Button from '../button';
import './style.css';

export default () => {
  const { dispatch, state } = React.useContext(Store);
  return (
    <div className='searchBar'>
      <input className='searchInput' type='text' onChange={
        (evt) => {
          searchUploadsAction(dispatch, evt.target.value)
        }
      }/>
      <Button className='btn' action={() => {
        toggleUploadForm(dispatch, state.uploadFormVisible);
      }}>Upload</Button>
    </div>
  );
};
