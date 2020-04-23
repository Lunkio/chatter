import React from 'react';
import { Link } from 'react-router-dom';
import { useStyles } from '../styles/styles';
import { AppBar, Toolbar, Button, Grid } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../reducers/loginReducer';
import { AppState } from '../store/store';
import { LoggedUserData } from '../types';

const Navbar = () => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const loggedInUser: LoggedUserData = useSelector((state: AppState) => state.login);

    return (
        <div>
            <AppBar position='fixed' >
                <Toolbar>
                    <Grid container justify='space-between'>
                        <Grid item>
                            <Button component={Link} to='/' className={classes.menuButton}>
                                Home
                            </Button>
                            <Button component={Link} to='/topics' className={classes.menuButton}>
                                Topics
                            </Button>
                            <Button component={Link} to='/blogs' className={classes.menuButton}>
                                Blogs  
                            </Button>
                            <Button component={Link} to='/users' className={classes.menuButton}>
                                Users
                            </Button>
                        </Grid>
                        <Grid item>
                            <span className={classes.navBarText}>Logged in as {loggedInUser.username}</span>
                            <Button 
                                onClick={() => dispatch(logoutUser())}
                                className={classes.logoutButton}
                            >
                                Logout
                            </Button>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
        </div>
    )
};

export default Navbar;