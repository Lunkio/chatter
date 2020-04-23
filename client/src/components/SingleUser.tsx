import React from 'react';
import { useParams, useHistory, Link } from 'react-router-dom';
import { User, Blog } from '../types';
import { useSelector } from 'react-redux';
import { AppState } from '../store/store';
import { Button } from '@material-ui/core';
import { useStyles } from '../styles/styles';

const SingleUser = () => {
    const { id } = useParams<{ id: string }>();
    const history = useHistory();
    const classes = useStyles();
    const users: User[] = useSelector((state: AppState) => state.users);
    const blogs: Blog[] = useSelector((state: AppState) => state.blogs);

    const user: User | undefined = users.find(u => u.id === id);
    if (!user) { 
        return <div><h2>User was not found</h2></div>
    };
    const userBlogs: Blog[] = blogs.filter(b => b.user_id === user.id);

    return (
        <div>
            <div>
                <Button
                    color='default'
                    variant='outlined'
                    onClick={() => history.push('/users')}
                >
                    Go Back
                </Button>
            </div>
            <div>
                <h1>{user.username}</h1>
                <h4>Added blogs:</h4>
                {userBlogs.length === 0 &&
                    <p><i>No added blogs...</i></p>
                }
                {userBlogs.length > 0 &&
                    <ul>
                        {userBlogs.map(blog =>
                            <li key={blog.id}>
                                <Link className={classes.tableLink} to={`/blogs/${blog.id}`}>
                                    {blog.title}
                                </Link>
                            </li>    
                        )}
                    </ul>
                }
            </div>
        </div>
    )
};

export default SingleUser;