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
const blogsService_1 = __importDefault(require("../services/blogsService"));
const initialState = [];
const blogsReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'INIT_BLOGS':
            return action.data;
        case 'ADD_BLOG':
            return [...state, action.data];
        case 'EDIT_BLOG':
            const editedBlog = action.data;
            const editedBlogId = action.data.id;
            return state.map(blog => blog.id !== editedBlogId ? blog : editedBlog);
        case 'REMOVE_BLOG':
            return state.filter(b => b.id !== action.data.id);
        default: return state;
    }
};
exports.initBlogs = () => {
    return (dispatch) => __awaiter(void 0, void 0, void 0, function* () {
        const blogs = yield blogsService_1.default.getAllBlogs();
        dispatch({
            type: 'INIT_BLOGS',
            data: blogs
        });
    });
};
exports.addBlog = (blog) => {
    return (dispatch) => __awaiter(void 0, void 0, void 0, function* () {
        const newBlog = yield blogsService_1.default.addBlog(blog);
        dispatch({
            type: 'ADD_BLOG',
            data: newBlog
        });
    });
};
exports.editBlog = (blog) => {
    return (dispatch) => __awaiter(void 0, void 0, void 0, function* () {
        const editedBlog = yield blogsService_1.default.editBlog(blog);
        dispatch({
            type: 'EDIT_BLOG',
            data: editedBlog
        });
    });
};
exports.removeBlog = (blog) => {
    return (dispatch) => __awaiter(void 0, void 0, void 0, function* () {
        yield blogsService_1.default.removeBlog(blog);
        dispatch({
            type: 'REMOVE_BLOG',
            data: blog
        });
    });
};
exports.default = blogsReducer;
