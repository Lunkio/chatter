"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const Topics_1 = require("../components/Topics");
const sendChatMessageToSocket = (message) => {
    Topics_1.socket.emit('chat message', message);
};
const sendTopicToSocket = (topic) => {
    Topics_1.socket.emit('topic', topic);
};
const url = '/api/topics';
let token = null;
const setToken = (newToken) => {
    token = `bearer ${newToken}`;
};
const getAllChats = () => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield axios_1.default.get(`${url}/chats`);
    return res.data;
});
const addNewChatMessage = (chatMessage) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield axios_1.default.post(`${url}/chats`, chatMessage);
    sendChatMessageToSocket(res.data);
});
const getAllTopics = () => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield axios_1.default.get(url);
    return res.data;
});
const addNewTopic = (topic) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield axios_1.default.post(url, topic);
    sendTopicToSocket(res.data);
    return res.data;
});
const removeTopicAndChats = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const config = { headers: { Authorization: token } };
    yield axios_1.default.delete(`${url}/${id}`, config);
});
exports.default = { setToken, getAllChats, addNewChatMessage, getAllTopics, addNewTopic, removeTopicAndChats };
