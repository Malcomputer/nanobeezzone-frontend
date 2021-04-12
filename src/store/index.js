import create from "zustand";
import {devtools, redux} from "zustand/middleware";

const initialState = {
    user: { token: "" },
    messageObj: { messages: [], count: null, statusCode: null },
    userForProfile: null,
    profilePagePicture: {},
    postedMessage: null,
  };

export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";
export const REGISTER = "REGISTER";
export const GET_USER_INFO = "GET_USER_INFO";
export const GET_PROFILE_PICTURE = "GET_PROFILE_PICTURE";

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
        default:
            return state;
    }
};

export const useStore = create(devtools(redux(reducer, initialState)));