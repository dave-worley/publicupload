const BASEURL = 'http://localhost:8000/';

export const fetchUploadsAction = async (dispatch) => {
  const data = await fetch(`${BASEURL}listuploads`);
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

export const searchUploadsAction = async (dispatch, search) => {
  const data = await fetch(`${BASEURL}listuploads/${search}`);
  const dataJSON = await data.json();
  return dispatch({
    type: 'SEARCH_UPLOADS',
    payload: {
      uploads: dataJSON,
      searchTerm: search
    }
  });
};

export const setUploadFile = (dispatch, file) => {
  return dispatch({
    type: 'SET_UPLOAD_FILE',
    payload: file
  });
};

export const uploadFile = async (dispatch, file) => {
  const formData = new FormData();
  formData.append('data', file);
  const data = await fetch(`${BASEURL}upload`, {
    method: 'POST',
    body: formData
  });
  const dataJSON = await data.json();
  return dispatch({
    type: 'UPLOAD_FILE',
    payload: dataJSON
  });
};

export const toggleUploadForm = (dispatch, currentState) => {
  return dispatch({
    type: 'TOGGLE_UPLOAD_FORM',
    payload: !currentState
  });
};
