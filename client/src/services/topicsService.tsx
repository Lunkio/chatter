import axios from 'axios';
import { Token, ChatMessageWithoutId, TopicWithoutId, ChatMessage, Topic } from '../types';
import { socket } from '../components/Topics';

const sendChatMessageToSocket = (message: ChatMessage) => {
    socket.emit('chat message', message);
};

const sendTopicToSocket = (topic: Topic) => {
    socket.emit('topic', topic);
};

const url = '/api/topics';

let token: Token = null;

const setToken = (newToken: Token) => {
    token = `bearer ${newToken}`
};

const getAllChats = async () => {
    const res = await axios.get(`${url}/chats`);
    return res.data;
};

const addNewChatMessage = async (chatMessage: ChatMessageWithoutId) => {
    const res = await axios.post(`${url}/chats`, chatMessage);
    sendChatMessageToSocket(res.data);
};

const getAllTopics = async () => {
    const res = await axios.get(url);
    return res.data;
};

const addNewTopic = async (topic: TopicWithoutId) => {
    const res = await axios.post(url, topic);
    sendTopicToSocket(res.data);
    return res.data;
};

const removeTopicAndChats = async (id: string) => {
    const config = { headers: { Authorization: token } };
    await axios.delete(`${url}/${id}`, config);
};

export default { setToken, getAllChats, addNewChatMessage, getAllTopics, addNewTopic, removeTopicAndChats };