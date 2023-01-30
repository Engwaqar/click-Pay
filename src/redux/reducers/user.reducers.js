import types from "../actions/types";

//Get site data from url reducer
const initialState = {
  status: null,
  message: null,
  error: '',
  loginScreen: {
    refreshing: false,
    data: {
      loggedInUserId: null,
      loggedInUserName: "",
      loggedInUserTypeId: "",
      message: null,
    },
  },
  profileData: {
    refreshing: false,
    data: {},
    error:''
  },
  notifactionData: {
    refreshing: false,
    data: []
  },
  favorite: {
    refreshing: false,
    data: [],
  },
  securityAlert: {
    refreshing: false,
    data: [],
  },
};

export const userReducers = (state = initialState, action) => {
  switch (action.type) {
    case types.LOGIN_USER_REQUEST:
      console.log(action, "action in reducer");
      return {
        ...state,
        loginScreen: {
          ...state.loginScreen,
          refreshing: true,
        },
      };

    case types.LOGIN_USER_SUCCESS:
      console.log(action, "action in reducer");
      return {
        ...state,
        loginScreen: {
          ...state.loginScreen,
          data: action.payload,
          refreshing: false,
        },
      };
    case types.LOGIN_USER_FAILURE:
      console.log(action, "action in reducer");
      return {
        ...state,
        loginScreen: {
          ...state.loginScreen,
          refreshing: false,
          data: action.payload,
          errorMsg: action.error,
        },
      };
//get profile
case types.GET_PROFILE_REQUEST:
  return {
    ...state,
    profileData: {
      ...state.profileData,
      refreshing: true,

    },
  };
case types.GET_PROFILE_SUCCESS:

  return {
    ...state,
    profileData: {
      ...state.profileData,
      data: action.payload,
      refreshing: false,

    },
  };
case types.GET_PROFILE_FAILURE:
  return {
    ...state,
    profileData: {
      ...state.profileData,
      // data: action.payload,
      refreshing: false,
      error: action.error,

    },
  };
 //get Notifaction
case types.GET_NOTIFACTION_REQUEST:
  return {
    ...state,
    notifactionData: {
      ...state.notifactionData,
      refreshing: true,
    },
  };
case types.GET_NOTIFACTION_SUCCESS:

  return {
    ...state,
    notifactionData: {
      ...state.notifactionData,
      data: action.payload,
      refreshing: false,
    },
  };
case types.GET_NOTIFACTION_FAILURE:
  return {
    ...state,
    notifactionData: {
      ...state.notifactionData,
      // data: action.payload,
      refreshing: false,
    },
  };
//GET FAVORITES
case types.GET_FAVORITE_REQUEST:
  return {
    ...state,
    favorite: {
      ...state.favorite,
      refreshing: true,
    },
  };
case types.GET_FAVORITE_SUCCESS:
  return {
    ...state,
    favorite: {
      ...state.favorite,
      // data: [...state.favorite.data, ...action.payload],
      data:action.payload,
      refreshing: false,
    },
  };
case types.GET_FAVORITE_FAILURE:
  return {
    ...state,
    favorite: {
      ...state.favorite,
      data:[],
      refreshing: false,
    },
  };
//get Security Alert
case types.GET_SECURITY_ALERT_REQUEST:
  return {
    ...state,
    securityAlert: {
      ...state.securityAlert,
      refreshing: true,
    },
  };
case types.GET_SECURITY_ALERT_SUCCESS:
  return {
    ...state,
    securityAlert: {
      ...state.securityAlert,
      // data: [...state.favorite.data, ...action.payload],
      data:action.payload,
      refreshing: false,
    },
  };
case types.GET_SECURITY_ALERT_FAILURE:
  return {
    ...state,
    securityAlert: {
      ...state.securityAlert,
      refreshing: false,
    },
  };

    default:
      return state;
  }
};
