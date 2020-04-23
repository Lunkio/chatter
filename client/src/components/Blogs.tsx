import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Blog, User, LoggedUserData } from '../types';
import { AppState } from '../store/store';
import { Container, TextField, Grid, Button, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper } from '@material-ui/core';
import { useStyles } from '../styles/styles';
import { addBlog } from '../reducers/blogsReducer';
import { setMessage } from '../reducers/messageReducer';

const Blogs = () =>{
    const dispatch = useDispatch();
    const classes = useStyles();
    const blogs: Blog[] = useSelector((state: AppState) => state.blogs);
    const users: User[] = useSelector((state: AppState) => state.users);
    const user: LoggedUserData = useSelector((state: AppState) => state.login);
    const [title, setTitle] = useState<string>('');
    const [author, setAuthor] = useState<string>('');
    const [url, setUrl] = useState<string>('');
    const [showAddBtn, setshowAddBtn] = useState<boolean>(true);
    const [showCreate, setShowCreate] = useState<boolean>(false);

    const findBlogUser = (id: string | undefined): string | undefined => {
        const userBlog: User | undefined = users.find(u => u.id === id);
        return userBlog?.username;
    }

    const handleAddBlog = async (event: React.SyntheticEvent) => {
        event.preventDefault();
        try {
            if (title === '' || author === '') {
                dispatch(setMessage({ open: true, severity: 'warning', text: 'Blog needs both author and title details' }));
                return;
            };
            const blog: Blog = {
                title,
                author,
                url,
                likes: 0,
                comments: [],
                user_id: user.id
            };
            await dispatch(addBlog(blog));
            dispatch(setMessage({ open: true, severity: 'success', text: 'Blog added succesfully!' }));
            setTitle('');
            setAuthor('');
            setUrl('');
        } catch (e) {
            console.log('error', e);
            dispatch(setMessage({ open: true, severity: 'error', text: 'Something went wrong, please try again' }));
        }
    };

    const buttonShow = { display: showAddBtn ? '' : 'none', 'marginTop': '2rem' };
    const createShow = { display: showCreate ? '' : 'none', 'marginTop': '6rem' };

    const open = () => {
        setshowAddBtn(false);
        setShowCreate(true);
    };

    const close = () => {
        setshowAddBtn(true);
        setShowCreate(false);
    };

    return (
        <div>
            <Container maxWidth='md' style={createShow}>
                <div>
                    <h2>Create a new blog</h2>
                </div>
                <form onSubmit={handleAddBlog}>
                    <TextField
                        className={classes.textField}
                        fullWidth
                        variant='outlined'
                        type='text'
                        label='Title'
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        size='small'
                    />
                    <TextField
                        className={classes.textField}
                        fullWidth
                        variant='outlined'
                        type='text'
                        label='Author'
                        value={author}
                        onChange={e => setAuthor(e.target.value)}
                        size='small'
                    />
                    <TextField
                        className={classes.textField}
                        fullWidth
                        variant='outlined'
                        type='text'
                        label='Url'
                        value={url}
                        onChange={e => setUrl(e.target.value)}
                        size='small'
                    />
                    <Grid container justify='space-between'>
                        <Grid item>
                            <Button type='submit' variant='contained' color='primary'>
                                Add new blog
                            </Button>
                        </Grid>
                        <Grid item >
                            <Button variant='outlined' className={classes.removeBtn} onClick={close}>
                                Close
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Container>
            {blogs.length === 0 &&
                <h2>There are currently no blogs added...</h2>
            }
            {blogs.length > 0 &&
                <TableContainer component={Paper} className={classes.table} style={{'marginTop': '2rem'}}>
                    <Table>
                        <TableHead className={classes.tableHead}>
                            <TableRow>
                                <TableCell>Title</TableCell>
                                <TableCell>Author</TableCell>
                                <TableCell>Added by</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {blogs.map(blog =>
                                <TableRow key={blog.id}>
                                    <TableCell>
                                        <Link className={classes.tableLink} to={`/blogs/${blog.id}`}>{blog.title}</Link>
                                    </TableCell>
                                    <TableCell>{blog.author}</TableCell>
                                    <TableCell>{findBlogUser(blog.user_id)}</TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            }
            <div style={buttonShow}>
                <Button variant='contained' color='primary' onClick={open}>
                    Create new blog
                </Button>
            </div>
        </div>
    )
};

export default Blogs;