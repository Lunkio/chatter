import { LoggedUser } from '../types';
import { AppActions, LogInOutActionTypes } from '../store/typesStore';
import { Dispatch } from 'redux';

const inititalState: LoggedUser = null;

const loginReducer = (state = inititalState, action: LogInOutActionTypes): LoggedUser=> {
    switch (action.type) {
        case 'LOGIN_USER':
            return action.data;
        case 'LOGOUT_USER':
            return null;
        default: return state;
    }
};

export const loginUser = (user: LoggedUser) => {
    return (dispatch: Dispatch<AppActions>) => {
        window.localStorage.setItem(
            'loggedUser', JSON.stringify(user)
        );
        dispatch({
            type: 'LOGIN_USER',
            data: user
        });
    }
};

export const logoutUser = () => {
    return (dispatch: Dispatch<AppActions>) => {
        window.localStorage.removeItem('loggedUser');
        dispatch({
            type: 'LOGOUT_USER'
        });
    }
};

export const initLoginUser = () => {
    return (dispatch: Dispatch<AppActions>) => {
        const loggedUser = window.localStorage.getItem('loggedUser');
        if (loggedUser) {
            const user = JSON.parse(loggedUser);
            dispatch({
                type: 'LOGIN_USER',
                data: user
            });
        };
    }
};

export default loginReducer;