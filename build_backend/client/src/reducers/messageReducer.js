"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const initialState = {
    open: false,
    severity: undefined,
    text: ''
};
const messageReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_MESSAGE':
            return action.data;
        case 'CLOSE_MESSAGE':
            return action.data;
        default: return state;
    }
};
exports.setMessage = (message) => {
    return (dispatch) => {
        dispatch({
            type: 'SET_MESSAGE',
            data: message
        });
    };
};
exports.closeMessage = () => {
    return (dispatch) => {
        const message = { open: false, severity: undefined, text: '' };
        dispatch({
            type: 'CLOSE_MESSAGE',
            data: message
        });
    };
};
exports.default = messageReducer;
