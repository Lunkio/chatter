import React from 'react';
import { Link } from 'react-router-dom';
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { User, Blog } from '../types';
import { AppState } from '../store/store';
import { useStyles } from '../styles/styles';

const Users = () => {
    const classes = useStyles();
    const users: User[] = useSelector((state: AppState) => state.users);
    const blogs: Blog[] = useSelector((state: AppState) => state.blogs);

    const amountOfBlogs = (user: User): number => {
        const userBlogs: Blog[] = blogs.filter(b => b.user_id === user.id);
        return userBlogs.length;
    };

    return (
        <div style={{'marginTop': '2rem'}}>
            <TableContainer component={Paper} className={classes.table}>
                <Table>
                    <TableHead className={classes.tableHead}>
                        <TableRow>
                            <TableCell>Users</TableCell>
                            <TableCell>Topics created</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map(user =>
                            <TableRow key={user.id}>
                                <TableCell>
                                    <Link className={classes.tableLink} to={`/users/${user.id}`}>{user.username}</Link>
                                </TableCell>
                                <TableCell>{amountOfBlogs(user)}</TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
};

export default Users;