import React from 'react';
import { setUploadFile, uploadFile, toggleUploadForm } from '../../actions';
import { Store } from '../../Store';
import './style.css';

export default () => {
  const { state, dispatch } = React.useContext(Store);
  return (
    state.uploadFormVisible &&
    <div
      className='modal'
      onKeyPress={ (evt) => {
        console.log(evt.keyCode);
        if (evt.keyCode === 27) {
          toggleUploadForm(dispatch, state.uploadFormVisible);
        }
      } }
    >
      <form className='modalContent' onSubmit={ (evt) => {
        evt.preventDefault();
        evt.target.elements['file'].value = null;
        uploadFile(dispatch, state.uploadFile);
        toggleUploadForm(dispatch, state.uploadFormVisible);
      } }
      >
        <span onClick={ () => toggleUploadForm(dispatch, state.uploadFormVisible) } className='close'>&times;</span>
        <input type='file' name='file' onChange={ (evt) => {
          setUploadFile(dispatch, evt.target.files[0])
        } }/>
        <button>Upload</button>
      </form>
    </div>
  );
}
