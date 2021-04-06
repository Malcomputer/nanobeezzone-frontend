import create from "zustand";
import {devtools, redux} from "zustand/middleware";

export const ACTIONS = {

};

const initialState = {

};

const reducer = (state, action) => {

}

export const useStore = create(devtools(redux(reducer, initialState)));