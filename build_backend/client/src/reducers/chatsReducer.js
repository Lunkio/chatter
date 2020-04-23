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
const chatsReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'INIT_CHATS':
            return action.data;
        case 'ADD_CHAT':
            return [...state, action.data];
        default: return state;
    }
};
exports.initChats = () => {
    return (dispatch) => __awaiter(void 0, void 0, void 0, function* () {
        const chats = yield topicsService_1.default.getAllChats();
        dispatch({
            type: 'INIT_CHATS',
            data: chats
        });
    });
};
exports.addChatMessage = (chatMessage) => {
    return (dispatch) => __awaiter(void 0, void 0, void 0, function* () {
        //const newChatMessage: ChatMessage = await topicsService.addNewChatMessage(chat);
        dispatch({
            type: 'ADD_CHAT',
            data: chatMessage
        });
    });
};
exports.default = chatsReducer;
