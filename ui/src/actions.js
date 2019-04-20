const BASEURL = 'http://localhost:8000/';

export const fetchUploadsAction = async (dispatch) => {
  const data = await fetch(BASEURL + 'listuploads');
  const dataJSON = await data.json();
  return dispatch({
    type: 'FETCH_UPLOADS',
    payload: dataJSON
  });
};

export const deleteUploadAction = async (dispatch, id) => {
  const data = await fetch(`${BASEURL}removeupload/${id}`, {
    method: 'DELETE'
  });
  const dataJSON = await data.json();
  return dispatch({
    type: 'REMOVE_UPLOAD',
    payload: dataJSON
  });
};
