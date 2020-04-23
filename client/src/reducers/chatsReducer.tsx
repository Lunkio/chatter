import { Dispatch } from 'redux';
import { AppActions, ChatActionTypes } from '../store/typesStore';
import { ChatMessage } from '../types';
import topicsService from '../services/topicsService';

const initialState: ChatMessage[] = [];

const chatsReducer = (state = initialState, action: ChatActionTypes): ChatMessage[] => {
    switch (action.type) {
        case 'INIT_CHATS':
            return action.data;
        case 'ADD_CHAT':
            return [...state, action.data];
        default: return state;
    }
};

export const initChats = () => {
    return async (dispatch: Dispatch<AppActions>) => {
        const chats: ChatMessage[] = await topicsService.getAllChats();
        dispatch({
            type: 'INIT_CHATS',
            data: chats
        });
    }
};

export const addChatMessage = (chatMessage: ChatMessage) => {
    return async (dispatch: Dispatch<AppActions>) => {
        //const newChatMessage: ChatMessage = await topicsService.addNewChatMessage(chat);
        dispatch({
            type: 'ADD_CHAT',
            data: chatMessage
        });
    }
};

export default chatsReducer;