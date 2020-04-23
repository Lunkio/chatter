import { LoggedUser, User, Message, Blog, Topic, ChatMessage } from "../types";

//loginReducer
export const LOGIN_USER = 'LOGIN_USER';
export const LOGOUT_USER = 'LOGOUT_USER';
export interface LoginAction {
    type: typeof LOGIN_USER;
    data: LoggedUser;
};
export interface LogoutAction {
    type: typeof LOGOUT_USER;
};
export type LogInOutActionTypes = LoginAction | LogoutAction;

//usersReducer
export const INIT_USERS = 'INIT_USERS';
export interface InitUsersAction {
    type: typeof INIT_USERS;
    data: User[];
}
export type InitUserActionTypes = InitUsersAction;

//blogsReduer
export const INIT_BLOGS = 'INIT_BLOGS';
export const ADD_BLOG = 'ADD_BLOG';
export const EDIT_BLOG = 'EDIT_BLOG';
export const REMOVE_BLOG = 'REMOVE_BLOG';
export interface InitBlogsAction {
    type: typeof INIT_BLOGS;
    data: Blog[];
}
export interface AddBlogAction {
    type: typeof ADD_BLOG;
    data: Blog;
}
export interface EditBlogAction {
    type: typeof EDIT_BLOG;
    data: Blog;
}
export interface RemoveBlogAction {
    type: typeof REMOVE_BLOG;
    data: Blog;
}

export type BlogActionTypes = InitBlogsAction | AddBlogAction | EditBlogAction | RemoveBlogAction;

//messageReducer
export const SET_MESSAGE = 'SET_MESSAGE';
export const CLOSE_MESSAGE = 'CLOSE_MESSAGE';
export interface MessageAction {
    type: typeof SET_MESSAGE;
    data: Message;
}
export interface MessageCloseAction {
    type: typeof CLOSE_MESSAGE;
    data: Message;
}
export type MessageActionTypes = MessageAction | MessageCloseAction;

//topicsReducer
export const INIT_TOPICS = 'INIT_TOPICS';
export const NEW_TOPIC = 'NEW_TOPIC';
export const REMOVE_TOPIC = 'REMOVE_TOPIC';
export interface InitTopicsAction {
    type: typeof INIT_TOPICS;
    data: Topic[];
}
export interface NewTopicAction {
    type: typeof NEW_TOPIC;
    data: Topic
};
export interface RemoveTopicAction {
    type: typeof REMOVE_TOPIC;
    data: string;
};
export type TopicActionTypes = InitTopicsAction | NewTopicAction | RemoveTopicAction;

//chatsReducer
export const INIT_CHATS = 'INIT_CHATS';
export const ADD_CHAT = 'ADD_CHAT';
export interface InitChatsAction {
    type: typeof INIT_CHATS;
    data: ChatMessage[];
};
export interface AddChatAction {
    type: typeof ADD_CHAT;
    data: ChatMessage;
}
export type ChatActionTypes = InitChatsAction | AddChatAction;

//all
export type AppActions = 
    | LogInOutActionTypes
    | InitUserActionTypes
    | BlogActionTypes
    | MessageActionTypes
    | TopicActionTypes
    | ChatActionTypes;