export const addDeveloperRequest = user => ({
  type: 'ADD_DEVELOPER_REQUEST',
  payload: user,
});

export const addDeveloperSuccess = data => ({
  type: 'ADD_DEVELOPER_SUCCESS',
  payload: { data },
});

export const addDeveloperFailure = error => ({
  type: 'ADD_DEVELOPER_FAILURE',
  payload: { error },
});

export const removeDeveloper = id => ({
  type: 'REMOVE_DEVELOPER',
  payload: { id },
});
