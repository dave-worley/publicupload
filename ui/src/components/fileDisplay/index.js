import React from 'react';
import Button from '../button';
import './style.css';

export default ({
  file
}) => {
  return (
    <div className='document'>
      <p className='documentName'><a href={`http://localhost:8000/static/${file.id}`}>{file.name}</a></p>
      <p className='documentSize'>{Math.round(file.size / 1000)}KB</p>
      <div className="deleteContainer">
        <Button>delete</Button>
      </div>
    </div>
  );
}
