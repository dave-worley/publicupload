import React from 'react';
import { Store } from "../../Store";
import { searchUploadsAction } from "../../actions";

export default () => {
  const { dispatch } = React.useContext(Store);
  return (
    <input type='text' onChange={
      (evt) => {
        searchUploadsAction(dispatch, evt.target.value)
      }
    }/>
  );
};
