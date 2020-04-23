import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { TextField, Button } from '@material-ui/core';
import loginService from '../services/loginService';
import { LoggedUser } from '../types';
import { loginUser } from '../reducers/loginReducer';
import { setMessage } from '../reducers/messageReducer';
import { useStyles } from '../styles/styles';
import blogsService from '../services/blogsService';
import topicsService from '../services/topicsService';

const LoginPage = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const handleLogin = async (event: React.SyntheticEvent) => {
        event.preventDefault();
        try {
            const user: LoggedUser = await loginService.login({ username, password });
            if (user) { 
                blogsService.setToken(user.token);
                topicsService.setToken(user.token);
            };
            setUsername('');
            setPassword('');
            dispatch(setMessage({ open: true, severity: 'success', text: `Welcome ${user?.name}` }));
            dispatch(loginUser(user));
        } catch (e) {
            dispatch(setMessage({ open: true, severity: 'error', text: 'Wrong username or password' }));
            console.log('error', e);
        }
    };

    return (
        <div>
            <div>
                <h1>Log in to application</h1>
            </div>
            <form onSubmit={handleLogin}>
                <TextField
                    className={classes.textField}
                    fullWidth
                    variant='outlined'
                    type='text'
                    label='Username'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    size='small'
                />
                <TextField 
                    className={classes.textField}
                    fullWidth
                    variant='outlined'
                    type='password'
                    label='Password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    size='small'
                />
                <Button
                    type='submit'
                    variant='contained'
                    color='primary'
                >
                    Log in
                </Button>
            </form>
        </div>
    )
};

export default LoginPage;