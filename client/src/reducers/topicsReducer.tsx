import { Dispatch } from 'redux';
import { AppActions, TopicActionTypes } from '../store/typesStore';
import { Topic } from '../types';
import topicsService from '../services/topicsService';

const initialState: Topic[] = [];

const topicsReducer = (state = initialState, action: TopicActionTypes): Topic[] => {
    switch (action.type) {
        case 'INIT_TOPICS':
            return action.data;
        case 'NEW_TOPIC':
            return [...state, action.data];
        case 'REMOVE_TOPIC':
            return state.filter(t => t.id !== action.data);
        default: return state;
    };
};

export const initTopics = () => {
    return async (dispatch: Dispatch<AppActions>) => {
        const topics: Topic[] = await topicsService.getAllTopics();
        dispatch({
            type: 'INIT_TOPICS',
            data: topics
        });
    }
};

export const addTopic = (topic: Topic) => {
    return async (dispatch: Dispatch<AppActions>) => {
        //const newTopic: Topic = await topicsService.addNewTopic(topic);
        dispatch({
            type: 'NEW_TOPIC',
            data: topic
        });
    }
};

export const removeTopic = (id: string) => {
    return async (dispatch: Dispatch<AppActions>) => {
        await topicsService.removeTopicAndChats(id);
        dispatch({
            type: 'REMOVE_TOPIC',
            data: id
        });
    }
};

export default topicsReducer;