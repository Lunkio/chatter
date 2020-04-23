import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { Blog, User, LoggedUserData } from '../types';
import { AppState } from '../store/store';
import { Button, Paper, Grid, TextField } from '@material-ui/core';
import { removeBlog, editBlog } from '../reducers/blogsReducer';
import { setMessage } from '../reducers/messageReducer';
import { useStyles } from '../styles/styles';
import blogsService from '../services/blogsService';

const SingleBlog = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const classes = useStyles();
    const { id }  = useParams<{ id: string }>();
    const blogs: Blog[] = useSelector((state: AppState) => state.blogs);
    const users: User[] = useSelector((state: AppState) => state.users);
    const loggedInUser: LoggedUserData = useSelector((state: AppState) => state.login);
    const [comment, setComment] = useState<string>('');

    const blog: Blog | undefined = blogs.find(b => b.id === id);
    if (!blog) { 
        return <div><h2>Blog was not found</h2></div>
    };

    let username: string | undefined = undefined;
    const user: User | undefined = users.find(u => u.id === blog.user_id);
    if (user) {
        username = user.username;
    };

    const handleBlogRemove = async (blog: Blog) => {
        try {
            blogsService.setToken(loggedInUser.token);
            await dispatch(removeBlog(blog));
            dispatch(setMessage({ open: true, severity: 'info', text: 'Blog was removed' }));
            history.push('/blogs');
        } catch (e) {
            dispatch(setMessage({ open: true, severity: 'error', text: 'Something went wrong, please try again' }));
        }
    };

    const handleComment = async (event: React.SyntheticEvent) => {
        event.preventDefault();
        if (comment === '') {
            dispatch(setMessage({ open: true, severity: 'warning', text: 'Comment cannot be empty' }));
            return;
        };
        try {
            blog.comments = blog.comments.concat(comment);
            await dispatch(editBlog(blog));
            setComment('');
        } catch (e) {
            dispatch(setMessage({ open: true, severity: 'warning', text: 'Something went wrong, please try again' }));
        };
    };

    const addLike = async (blog: Blog) => {
        try {
            blog.likes = blog.likes +1;
            await dispatch(editBlog(blog));
        } catch (e) {
            dispatch(setMessage({ open: true, severity: 'warning', text: 'Something went wrong, please try again' }));
        };
    };

    const removeBtnShow = { display: loggedInUser.id === blog.user_id ? '' : 'none' };

    return (
        <React.Fragment>
            <Grid container justify='space-between'>
                <Grid item>
                    <Button 
                        color='default'
                        variant='outlined'
                        onClick={() => history.push('/')}
                    >
                        Go Back
                    </Button>
                </Grid>
                <Grid item style={removeBtnShow}>
                    <Button
                        className={classes.removeBtn}
                        variant='outlined'
                        onClick={() => handleBlogRemove(blog)}
                    >
                        Remove blog
                    </Button>
                </Grid>
            </Grid>
            <div>
                <Paper elevation={3} className={classes.singleBlog}>
                    <h2><span style={{'fontSize': '0.9rem'}}>title: </span>{blog.title}</h2>
                    <h2><span style={{'fontSize': '0.9rem'}}>author: </span>{blog.author}</h2>
                    <p><i>{blog.url}</i></p>
                    <Grid container justify='space-between'>
                        <Grid item>
                            <p>Comments: {blog.comments.length}</p>
                        </Grid>
                        <Grid item>
                            <p>Likes: <span>{blog.likes}</span></p>
                        </Grid>
                    </Grid>
                </Paper>
                <Grid container justify='space-between' style={{'marginTop': '-0.5rem'}}>
                    <Grid item style={{'marginTop': '-1.5rem'}}>
                        <h6>added by: <span>{username}</span></h6>
                    </Grid>
                    <Grid item>
                        <Button
                            variant='contained'
                            color='primary'
                            onClick={() => addLike(blog)}
                        >
                            Like
                        </Button>
                    </Grid>
                </Grid>
                <div>
                    <h4>Comments</h4>
                    <form onSubmit={handleComment}>
                        <TextField
                            className={classes.textField}
                            fullWidth
                            variant='outlined'
                            size='small'
                            label='Write a comment'
                            type='text'
                            value={comment}
                            onChange={e => setComment(e.target.value)}
                        />
                        <Button
                            type='submit'
                            variant='outlined'
                            color='primary'
                        >
                            Add Comment
                        </Button>
                    </form>
                    <ul>
                        {blog.comments.map((c,i) =>
                            <li key={i}>{c}</li>
                        )}
                    </ul>
                </div>
            </div>
            
            
        </React.Fragment>
    )
};

export default SingleBlog;