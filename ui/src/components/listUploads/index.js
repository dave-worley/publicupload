import React from 'react';
import FileDisplay from '../fileDisplay';
import { Store } from "../../Store";
import './style.css';

export default () => {
  const { state } = React.useContext(Store);
  return (
    <div className="listUploads">
      {
        state.uploads.map((upload) => {
          return (
            <FileDisplay file={upload}/>
          );
        })
      }
    </div>
  );
}
