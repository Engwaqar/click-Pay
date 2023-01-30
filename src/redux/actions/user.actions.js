import types from "./types";
//LOGIN
export const loginUser = (data) => {
  return {
    type: types.LOGIN_USER_REQUEST,
    data: data,
  };
};
//Get profile
export const getProfile = () => {
  return {
    type: types.GET_PROFILE_REQUEST,
  };}
  //get Notifaction
export const GetNotification = () => {
  return {
    type: types.GET_NOTIFACTION_REQUEST,
  };}
//Favrite Actions
export const getFavorite = (index, limit) => {
  // console.log('okokokokoko',data)
  return {
    type: types.GET_FAVORITE_REQUEST,
    
  };
};
//Favrite Actions
export const getSecurityAlert = (index, limit) => {
  // console.log('okokokokoko',data)
  return {
    type: types.GET_SECURITY_ALERT_REQUEST,
    
  };
};
