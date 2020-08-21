import { UserActionTypes } from "./user.types";

export const setCurrentUser = user => {
  //console.log("setCurrentUser action with", user)
  return({
  type: UserActionTypes.SET_CURRENT_USER,
  payload: user
})};