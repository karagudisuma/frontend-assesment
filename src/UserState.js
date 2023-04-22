import { useReducer } from "react";

const initialState = { userData: [] };

function reducer(state, action) {
  switch (action.type) {
    case "ADD_USER":
      return {
        userData: action.payload,
      };

    case "UPDATE_USER": {
      let userId = action.user.id;
      let index = state.userData.findIndex((u) => u.id === userId);
      return {
        userData: [
          ...state.userData.slice(0, index),
          action.user,
          ...state.userData.slice(index + 1),
        ],
      };
    }
    case "DELETE_USER": {
      let index = state.userData.findIndex((u) => u.id === action.id);
      return {
        userData: [
          ...state.userData.slice(0, index),
          ...state.userData.slice(index + 1),
        ],
      };
    }
    default:
      return state.userData;
  }
}

const useUserState = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return { state, dispatch };
};

export default useUserState;
