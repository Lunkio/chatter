import usersService from '../services/usersService';
import { User } from '../types';
import { InitUserActionTypes, AppActions } from '../store/typesStore';
import { Dispatch } from 'redux';

const initialState: User[] = [];

const usersReducer = (state = initialState, action: InitUserActionTypes): User[] => {
    switch (action.type) {
        case 'INIT_USERS':
            return action.data;
        default: return state;
    };
};

export const initUsers = () => {
    return async (dispatch: Dispatch<AppActions>) => {
        const users: User[] = await usersService.getAll();
        dispatch({
            type: 'INIT_USERS',
            data: users
        })
    }
};

export default usersReducer;