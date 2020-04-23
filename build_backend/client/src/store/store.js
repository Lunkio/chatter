"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const redux_1 = require("redux");
const redux_thunk_1 = __importDefault(require("redux-thunk"));
const usersReducer_1 = __importDefault(require("../reducers/usersReducer"));
const loginReducer_1 = __importDefault(require("../reducers/loginReducer"));
const messageReducer_1 = __importDefault(require("../reducers/messageReducer"));
const blogsReducer_1 = __importDefault(require("../reducers/blogsReducer"));
const topicsReducer_1 = __importDefault(require("../reducers/topicsReducer"));
const chatsReducer_1 = __importDefault(require("../reducers/chatsReducer"));
const reducers = redux_1.combineReducers({
    login: loginReducer_1.default,
    users: usersReducer_1.default,
    message: messageReducer_1.default,
    topics: topicsReducer_1.default,
    blogs: blogsReducer_1.default,
    chats: chatsReducer_1.default
});
const store = redux_1.createStore(reducers, redux_1.applyMiddleware(redux_thunk_1.default));
exports.default = store;
