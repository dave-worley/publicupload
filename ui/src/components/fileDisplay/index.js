import React from 'react';
import Button from '../button';
import { deleteUploadAction } from '../../actions';
import { Store } from "../../Store";
import './style.css';

export default ({
  file
}) => {
  const { dispatch } = React.useContext(Store);
  return (
    <div className='document'>
      <p className='documentName'><a href={`http://localhost:8000/static/${file.id}`}>{file.name}</a></p>
      <p className='documentSize'>{Math.round(file.size / 1000)}KB</p>
      <div className="deleteContainer">
        <Button action={() => {
          deleteUploadAction(dispatch, file.id);
        }}>delete</Button>
      </div>
    </div>
  );
}
