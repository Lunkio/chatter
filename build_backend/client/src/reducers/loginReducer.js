"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const inititalState = null;
const loginReducer = (state = inititalState, action) => {
    switch (action.type) {
        case 'LOGIN_USER':
            return action.data;
        case 'LOGOUT_USER':
            return null;
        default: return state;
    }
};
exports.loginUser = (user) => {
    return (dispatch) => {
        window.localStorage.setItem('loggedUser', JSON.stringify(user));
        dispatch({
            type: 'LOGIN_USER',
            data: user
        });
    };
};
exports.logoutUser = () => {
    return (dispatch) => {
        window.localStorage.removeItem('loggedUser');
        dispatch({
            type: 'LOGOUT_USER'
        });
    };
};
exports.initLoginUser = () => {
    return (dispatch) => {
        const loggedUser = window.localStorage.getItem('loggedUser');
        if (loggedUser) {
            const user = JSON.parse(loggedUser);
            dispatch({
                type: 'LOGIN_USER',
                data: user
            });
        }
        ;
    };
};
exports.default = loginReducer;
