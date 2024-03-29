import { UserActionTypes } from "./user.types";

const INITIAL_STATE = {
  currentUser: null
}

const userReducer = (state = INITIAL_STATE, action) => {
  console.log("setCurrentUser reducer with", action)
  switch (action.type) {
    case UserActionTypes.SET_CURRENT_USER:
      console.log("INSIDE setCurrentUser reducer with", action)
      return {
        ...state,
        currentUser: action.payload
      };
    default:
      return state;
  }
};

export default userReducer;