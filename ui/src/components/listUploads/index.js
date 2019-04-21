import React from 'react';
import FileDisplay from '../fileDisplay';
import { Store } from "../../Store";
import './style.css';

export default () => {
  const { state } = React.useContext(Store);
  let totalKB = 0;
  if (state.uploads.length) {
    totalKB = Math.round(state.uploads.reduce((a, n) => {
      return a += n.size
    }, 0) / 1000);
  }
  return (
    <div className="listUploads">
      <h2>{ state.uploads.length } Documents <span>{ totalKB }KB</span></h2>
      <br/>
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
