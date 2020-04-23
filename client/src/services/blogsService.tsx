import axios from 'axios';
import { Blog, Token } from '../types';

const url = '/api/blogs';

let token: Token = null;

const setToken = (newToken: Token) => {
    token = `bearer ${newToken}`
};

const getAllBlogs = async () => {
    const res = await axios.get(url);
    return res.data;
};

const addBlog = async (blog: Blog) => {
    const res = await axios.post(url, blog);
    return res.data;
}

const editBlog = async (blog: Blog) => {
    const res = await axios.put(`${url}/${blog.id}`, blog);
    return res.data;
}

const removeBlog = async (blog: Blog) => {
    const config = { headers: { Authorization: token } };
    const res = await axios.delete(`${url}/${blog.id}`, config);
    return res.data;
}

export default { setToken, getAllBlogs, addBlog, editBlog, removeBlog };