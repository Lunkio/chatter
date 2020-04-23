import { Dispatch } from "redux";
import { AppActions, MessageActionTypes } from "../store/typesStore";
import { Message } from "../types";

const initialState: Message = { 
    open: false,
    severity: undefined,
    text: '' 
};

const messageReducer = (state = initialState, action: MessageActionTypes): Message => {
    switch (action.type) {
        case 'SET_MESSAGE':
            return action.data;
        case 'CLOSE_MESSAGE':
            return action.data;
        default: return state;
    }
};

export const setMessage = (message: Message) => {
    return (dispatch: Dispatch<AppActions>) => {
        dispatch({
            type: 'SET_MESSAGE',
            data: message
        });
    }
};

export const closeMessage = () => {
    return (dispatch: Dispatch<AppActions>) => {
        const message = { open: false, severity: undefined, text: '' };
        dispatch({
            type: 'CLOSE_MESSAGE',
            data: message
        });
    }
};

export default messageReducer;