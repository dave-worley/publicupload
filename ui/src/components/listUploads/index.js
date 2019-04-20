import React from 'react';
import FileDisplay from '../fileDisplay';
import { Store } from "../../Store";
import './style.css';

export default () => {
  const { state } = React.useContext(Store);
  return (
    <div className="listUploads">
      {
        state.uploads.length > 0 && state.uploads.map((upload) => {
          return (
            <FileDisplay key={ upload.id } file={ upload }/>
          );
        })
      }
      {
        state.uploads.length === 0 && (<p>No files found.</p>)
      }
    </div>
  );
}
