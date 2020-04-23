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
const url = '/api/blogs';
let token = null;
const setToken = (newToken) => {
    token = `bearer ${newToken}`;
};
const getAllBlogs = () => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield axios_1.default.get(url);
    return res.data;
});
const addBlog = (blog) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield axios_1.default.post(url, blog);
    return res.data;
});
const editBlog = (blog) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield axios_1.default.put(`${url}/${blog.id}`, blog);
    return res.data;
});
const removeBlog = (blog) => __awaiter(void 0, void 0, void 0, function* () {
    const config = { headers: { Authorization: token } };
    const res = yield axios_1.default.delete(`${url}/${blog.id}`, config);
    return res.data;
});
exports.default = { setToken, getAllBlogs, addBlog, editBlog, removeBlog };
