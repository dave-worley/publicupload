import React from 'react';
import { setUploadFile, uploadFile } from '../../actions';
import { Store } from "../../Store";

export default () => {
  const { state, dispatch } = React.useContext(Store);
  return (
    <form onSubmit={(evt) => {
        evt.preventDefault();
        evt.target.elements['file'].value = null;
        uploadFile(dispatch, state.uploadFile);
      }}
    >
      <input type="file" name="file" onChange={(evt) => {
        setUploadFile(dispatch, evt.target.files[0])
      }} />
      <button>Upload</button>
    </form>
  );
}
