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
const topicsService_1 = __importDefault(require("../services/topicsService"));
const initialState = [];
const topicsReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'INIT_TOPICS':
            return action.data;
        case 'NEW_TOPIC':
            return [...state, action.data];
        case 'REMOVE_TOPIC':
            return state.filter(t => t.id !== action.data);
        default: return state;
    }
    ;
};
exports.initTopics = () => {
    return (dispatch) => __awaiter(void 0, void 0, void 0, function* () {
        const topics = yield topicsService_1.default.getAllTopics();
        dispatch({
            type: 'INIT_TOPICS',
            data: topics
        });
    });
};
exports.addTopic = (topic) => {
    return (dispatch) => __awaiter(void 0, void 0, void 0, function* () {
        //const newTopic: Topic = await topicsService.addNewTopic(topic);
        dispatch({
            type: 'NEW_TOPIC',
            data: topic
        });
    });
};
exports.removeTopic = (id) => {
    return (dispatch) => __awaiter(void 0, void 0, void 0, function* () {
        yield topicsService_1.default.removeTopicAndChats(id);
        dispatch({
            type: 'REMOVE_TOPIC',
            data: id
        });
    });
};
exports.default = topicsReducer;
