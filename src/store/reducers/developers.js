const INITIAL_STATE = {
  loading: false,
  data: [],
  error: null,
};

export default function developers(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'ADD_DEVELOPER_REQUEST':
      return { ...state, loading: true };

    case 'ADD_DEVELOPER_SUCCESS':
      return {
        ...state,
        error: null,
        loading: false,
        data: [...state.data, action.payload.data],
      };
    case 'ADD_DEVELOPER_FAILURE':
      return { ...state, loading: false, error: action.payload.error };
    case 'REMOVE_DEVELOPER':
      return { ...state, data: state.data.filter(dev => dev.id !== action.payload.id) };
    default:
      return state;
  }
}
