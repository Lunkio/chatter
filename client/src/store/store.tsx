import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk, { ThunkMiddleware } from 'redux-thunk';
import usersReducer from '../reducers/usersReducer';
import loginReducer from '../reducers/loginReducer';
import messageReducer from '../reducers/messageReducer';
import blogsReducer from '../reducers/blogsReducer';
import topicsReducer from '../reducers/topicsReducer';
import chatsReducer from '../reducers/chatsReducer';
import { AppActions } from './typesStore';

const reducers = combineReducers({
    login: loginReducer,
    users: usersReducer,
    message: messageReducer,
    topics: topicsReducer,
    blogs: blogsReducer,
    chats: chatsReducer
});

export type AppState = ReturnType<typeof reducers>;

const store = createStore(reducers, applyMiddleware(thunk as ThunkMiddleware<AppState, AppActions>));

export default store;