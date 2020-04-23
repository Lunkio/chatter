import blogsService from '../services/blogsService';
import { Dispatch } from 'redux';
import { Blog } from '../types';
import { AppActions, BlogActionTypes } from '../store/typesStore';

const initialState: Blog[] = [];

const blogsReducer = (state = initialState, action: BlogActionTypes): Blog[] => {
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

export const initBlogs = () => {
    return async (dispatch: Dispatch<AppActions>) => {
        const blogs: Blog[] = await blogsService.getAllBlogs();
        dispatch({
            type: 'INIT_BLOGS',
            data: blogs
        });
    }
};

export const addBlog = (blog: Blog) => {
    return async (dispatch: Dispatch<AppActions>) => {
        const newBlog: Blog = await blogsService.addBlog(blog);
        dispatch({
            type: 'ADD_BLOG',
            data: newBlog
        });
    }
};

export const editBlog = (blog: Blog) => {
    return async (dispatch: Dispatch<AppActions>) => {
        const editedBlog: Blog = await blogsService.editBlog(blog);
        dispatch({
            type: 'EDIT_BLOG',
            data: editedBlog
        });
    }
};

export const removeBlog = (blog: Blog) => {
    return async (dispatch: Dispatch<AppActions>) => {
        await blogsService.removeBlog(blog);
        dispatch({
            type: 'REMOVE_BLOG',
            data: blog
        });
    }
};

export default blogsReducer;