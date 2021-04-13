import create from "zustand";
import {devtools, redux} from "zustand/middleware";

export const ACTIONS = {
	CURRENTUSER: 'CURRENTUSER',
	SETUSER: 'SETUSER',
	TOKEN: 'TOKEN'
};

const initialState = {
	auth: localStorage.getItem(ACTIONS.TOKEN),
	currentUser: JSON.parse(localStorage.getItem(ACTIONS.CURRENTUSER))
};

const reducer = (state, action) => {
	switch (action.type) {
		case ACTIONS.SETUSER:
			localStorage.setItem(ACTIONS.TOKEN, action.data.accessToken);
			localStorage.setItem(ACTIONS.CURRENTUSER, JSON.stringify(action.data));
			return {currentUser: action.data};
		default:
			return state;
	}
}

export const useStore = create(devtools(redux(reducer, initialState)));