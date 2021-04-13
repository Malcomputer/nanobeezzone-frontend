import create from "zustand";
import {devtools, redux} from "zustand/middleware";

export const ACTIONS = {
  GET_PROFILE_PICTURE: 'GET_PROFILE_PICTURE',
  GET_USER_INFO: 'GET_USER_INFO',
	CURRENTUSER: 'CURRENTUSER',
  REGISTER: 'REGISTER',
	SETUSER: 'SETUSER',
  LOGOUT: 'LOGOUT',
  LOGIN: 'LOGIN',
	TOKEN: 'TOKEN'
};

const initialState = {
	auth: localStorage.getItem(ACTIONS.TOKEN),
	currentUser: JSON.parse(localStorage.getItem(ACTIONS.CURRENTUSER)),
  messageObj: { messages: [], count: null, statusCode: null },
  userForProfile: null,
  // postedMessage: null,
};

const reducer = (state, action) => {
	switch (action.type) {
    case LOGIN:
      return { user: action.payload };
    case LOGOUT:
      return { user: {} };
    case REGISTER:
      return {};
    case GET_USER_INFO:
      return { userForProfile: action.payload };
    case GET_PROFILE_PICTURE:
      return { profilePagePicture: action.payload };
		case ACTIONS.SETUSER:
			localStorage.setItem(ACTIONS.TOKEN, action.data.accessToken);
			localStorage.setItem(ACTIONS.CURRENTUSER, JSON.stringify(action.data));
			return {currentUser: action.data};
		default:
			return state;
	}
}

export const useStore = create(devtools(redux(reducer, initialState)));