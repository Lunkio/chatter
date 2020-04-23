import React, { useEffect } from 'react';
import { Container } from '@material-ui/core';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { initUsers } from './reducers/usersReducer';
import { initLoginUser } from './reducers/loginReducer';
import { initBlogs } from './reducers/blogsReducer';
import { initTopics } from './reducers/topicsReducer';
import { initChats } from './reducers/chatsReducer';
import LoginPage from './components/LoginPage';
import Users from './components/Users';
import Message from './components/Message';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Blogs from './components/Blogs';
import SingleBlog from './components/SingleBlog';
import SingleUser from './components/SingleUser';
import Topics from './components/Topics';
import { LoggedUser } from './types';
import { AppState } from './store/store';

const App = () => {
    const user: LoggedUser = useSelector((state: AppState) => state.login);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetch = async () => {
            await dispatch(initUsers());
            await dispatch(initBlogs());
            await dispatch(initTopics());
            await dispatch(initChats());
            dispatch(initLoginUser());
        };
        fetch();
    }, [dispatch]);

    return (
        <React.Fragment>
            {!user &&
                <Container maxWidth='md'>
                    <LoginPage />
                </Container>
            }
            {user &&
                <Container maxWidth='lg' style={{marginTop: '7rem'}}>
                    <Router>
                        <Navbar />
                        <div style={{marginTop: '5rem'}}>
                            <Route exact path='/' render={() => <Home />} />
                            <Route exact path='/topics' render={() => <Topics/> } />
                            <Route exact path='/blogs' render={() => <Blogs /> } />
                            <Route path='/blogs/:id' render={() => <SingleBlog /> } />
                            <Route exact path='/users' render={() => <Users /> } />
                            <Route path='/users/:id' render={() => <SingleUser/> } />
                        </div>
                    </Router>
                </Container>
            }
            <Message />
        </React.Fragment>
    )
};

export default App;