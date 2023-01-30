import AsyncStorage from "@react-native-community/async-storage";
import { takeLatest, put, select } from "redux-saga/effects";
import { routeName } from "../../constants/routeName";
// import { parseCats } from "../../helpers/cat.helpers";
import types from "../actions/types";
import Api from "../lib/api";
import urls from "../lib/urls";
import { StackActions } from "@react-navigation/native";
//LOGIN
export function* loginUserSaga() {
  console.log("saga function Works");
  yield takeLatest(types.LOGIN_USER_REQUEST, loginUserApi);
}
function* loginUserApi(data, response) {
  console.log(data, "action in saga");
  let { params, navigation } = data.data;
  try {
    const response = yield Api.post(urls.LOGIN, params);
    console.log(response, "response");
    if (response && response.data != null) {
      yield AsyncStorage.setItem("@token", response.data.token);
      yield AsyncStorage.setItem("@loggedInUserTypeId", response.data.loggedInUserTypeId);
      yield AsyncStorage.setItem("@userId", response.data.loggedInUserId);
      // yield AsyncStorage.setItem("@companyId", response.data.companyId);
      // yield AsyncStorage.setItem("@userName", response.data.loggedInUserName);
      // yield AsyncStorage.setItem("@Manager", response.data.loggedInDepartmentId);
      // yield AsyncStorage.setItem("@Worker", response.data.loggedInUserTypeId);
      yield put({ type: types.LOGIN_USER_SUCCESS, payload: response });
      if (response.data.loggedInUserTypeId == "3") {
        navigation.dispatch(StackActions.replace(routeName.HOME_STACK));
        // navigation.replace(routeName.HOME_STACK);
      } else if (response.data.loggedInUserTypeId == "2") {
        // navigation.replace(routeName.MANAGER_ROLE);
        navigation.dispatch(StackActions.replace(routeName.MANAGER_ROLE));
      } else if (response.data.loggedInUserTypeId == "4") {
        navigation.replace(routeName.WORKER_ROLE);
      }
    } else {
      yield put({ type: types.LOGIN_USER_FAILURE, payload: response });
    }
  } catch (error) {
    console.log("error", error);
    yield put({ type: types.LOGIN_USER_FAILURE, error: error });
  }
}

//Get profile
export function* getProfileDataSaga() {
  yield takeLatest(types.GET_PROFILE_REQUEST, getProfileDataSagaApi);
}
function* getProfileDataSagaApi(data) {
  // let { params, navigation } = data.data;
  const userType =yield AsyncStorage.getItem("@loggedInUserTypeId");

  try {

    const response = yield Api.get(userType=='3'? urls.GET_USER:userType=='2'?urls.GET_MANAGER_PROFILE:userType=='4'?urls.GET_MANAGER_PROFILE:urls.GET_USER);
    console.log(response, "response");
    if (response && response.data != null) {
      yield put({ type: types.GET_PROFILE_SUCCESS, payload: response.data });
    } else {
      yield put({ type: types.GET_PROFILE_FAILURE, error: error });
    }
  } catch (error) {
    yield put({ type: types.GET_PROFILE_FAILURE, error: error });
  }
}
  //get Notifaction
export function* getNotifactionDataSaga() {
  yield takeLatest(types.GET_NOTIFACTION_REQUEST, getNotifactionDataSagaApi);
}
function* getNotifactionDataSagaApi(data) {
  // let { params, navigation } = data.data;
  const userType =yield AsyncStorage.getItem("@loggedInUserTypeId");
  try {
    const response = yield Api.get(userType=='3'? urls.GET_NOTIFICATION:userType=='2'?urls.GET_MANAGER_NOTIFACTION:userType=='4'?urls.GET_NOTIFICATION:urls.GET_NOTIFICATION);
    // const response = yield Api.get(urls.GET_NOTIFICATION);
    console.log(response, "response");
    if (response && response.data != null) {
      yield put({ type: types.GET_NOTIFACTION_SUCCESS, payload: response.data });
    } else {
      yield put({ type: types.GET_NOTIFACTION_FAILURE, error: error, payload: [] });
    }
  } catch (error) {
    yield put({ type: types.GET_NOTIFACTION_FAILURE, error: error });
  }
}
///FAVORITES
export function* getFavoritesSaga() {
  yield takeLatest(types.GET_FAVORITE_REQUEST, getFavoritesSagaApi);
}
function* getFavoritesSagaApi(data) {
  
  try {
    const response = yield Api.get(urls.GET_ALL_FAVORITE);
    console.log('fav resssss', response);

    if (response && response.data != null) {
      yield put({
        type: types.GET_FAVORITE_SUCCESS,
        payload: response.data,
      });
      // navigation.navigate(routeName.Categories,{data:response.data});
    } else {
      yield put({ type: types.GET_FAVORITE_FAILURE, payload: [] });
    }

    // dispatch a success action to the store with the new data object
  } catch (error) {
    yield put({ type: types.GET_FAVORITE_FAILURE, payload: [] });
  }
}
  //get Security Alert
export function* getSecurityAlertSaga() {
  yield takeLatest(types.GET_SECURITY_ALERT_REQUEST, getSecurityAlertSagaApi);
}
function* getSecurityAlertSagaApi(data) {
  
  try {
    const response = yield Api.get(urls.GET_SECURITY_ALERT);
    console.log('SecurityAlert', response);

    if (response && response.data != null) {
      yield put({
        type: types.GET_SECURITY_ALERT_SUCCESS,
        payload: response.data,
      });
      // navigation.navigate(routeName.Categories,{data:response.data});
    } else {
      yield put({ type: types.GET_SECURITY_ALERT_FAILURE, payload: [] });
    }

    // dispatch a success action to the store with the new data object
  } catch (error) {
    yield put({ type: types.GET_SECURITY_ALERT_FAILURE, payload: [] });
  }
}


