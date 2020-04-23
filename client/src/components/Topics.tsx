import React, { useState, useRef, useEffect } from 'react';
import { Icon, Button, TextField, IconButton, Paper, Typography, List, ListItem, ListItemText, Chip } from '@material-ui/core';
import { AddCircleRounded } from '@material-ui/icons';
import { useStyles } from '../styles/styles';
import { useDispatch, useSelector } from 'react-redux';
import { setMessage } from '../reducers/messageReducer';
import { LoggedUserData, Topic, ChatMessage, TopicWithoutId, ChatMessageWithoutId, User, Visibility } from '../types';
import { AppState } from '../store/store';
import { addTopic, removeTopic } from '../reducers/topicsReducer';
import { addChatMessage } from '../reducers/chatsReducer';
import topicsService from '../services/topicsService';
import io from 'socket.io-client';

export let socket: any;

const Topics = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const loggedInUser: LoggedUserData = useSelector((state: AppState) => state.login);
    const topics: Topic[] = useSelector((state: AppState) => state.topics);
    const chats: ChatMessage[] = useSelector((state: AppState) => state.chats);
    const users: User[] = useSelector((state: AppState) => state.users);
    const [newTopic, setNewTopic] = useState<string>('');
    const [newMessage, setNewMessage] = useState<string>('');
    const [topicHead, setTopicHead] = useState<string>('Choose a topic');
    const [chosenTopicId, setChosenTopicId] = useState<string>('');
    const [chosenTopic, setChosenTopic] = useState<Topic | undefined>(undefined);
    const toChatBoxEnd = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        if (toChatBoxEnd.current) {
            toChatBoxEnd.current.scrollIntoView({ behavior: 'smooth' });
        };
    };

    useEffect(scrollToBottom, [chats, chosenTopic]);

    if (!socket) {
        socket = io(':3001');
        socket.on('chat message', (message: ChatMessage) => {
            dispatch(addChatMessage(message));
        });
        socket.on('topic', (topic: Topic) => {
            dispatch(addTopic(topic));
        });
    };

    let removeBtnShow = { display: 'none' };
    
    let topicAdderShow: Visibility = {visibility: 'hidden'};

    if (chosenTopic) {
        removeBtnShow = { display: chosenTopic.user_id === loggedInUser.id ? '' : 'none' };
        topicAdderShow = { visibility: 'visible' };
    };

    const chooseTopic = (topic: Topic) => {
        setTopicHead(topic.name);
        setChosenTopicId(topic.id);
        setChosenTopic(topic);
    };

    const handleAddTopic = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        try {
            if (newTopic === '') {
                dispatch(setMessage({ open: true, severity: 'warning', text: 'Topic cannot be empty' }));
                return;
            };
            const topic: TopicWithoutId = {
                name: newTopic,
                user_id: loggedInUser.id
            };
            const addedTopic: Topic = await topicsService.addNewTopic(topic);
            dispatch(setMessage({ open: true, severity: 'success', text: 'New topic was added' }));
            setNewTopic('');
            chooseTopic(addedTopic);
        } catch (e) {
            dispatch(setMessage({ open: true, severity: 'error', text: 'Something went wrong, please try again' }));
        } 
    };

    const handleMessageSend = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        try {
            if (newMessage === '') {
                return;
            }
            const chatMessage: ChatMessageWithoutId = {
                message: newMessage,
                user_id: loggedInUser.id,
                topic_id: chosenTopicId
            };
            await topicsService.addNewChatMessage(chatMessage);
            setNewMessage('');
        } catch (e) {
            dispatch(setMessage({ open: true, severity: 'error', text: 'Something went wrong, please try again' }));
        }
    };

    const handleTopicRemoval = async (topics: Topic[]) => {
        try {
            const topicToRemove: Topic | undefined = topics.find(t => t.id === chosenTopicId);
            if (!topicToRemove) {
                return;
            }
            topicsService.setToken(loggedInUser.token);
            await dispatch(removeTopic(topicToRemove.id));
            dispatch(setMessage({ open: true, severity: 'success', text: 'Topic removed succesfully' }));
            setTopicHead('Choose a topic');
            setChosenTopicId('');
            setChosenTopic(undefined);
        } catch (e) {
            dispatch(setMessage({ open: true, severity: 'error', text: 'Something went wrong, please try again' }));
        }
    }

    const topicAdder = () => {
        if (chosenTopic) {
            const user: User | undefined = users.find(u => u.id === chosenTopic.user_id);
            if (user) {
                return user.username
            }
        }
    };
    
    const topicSelected = (topic: Topic): boolean => {
        if (chosenTopic) {
            return topic.id === chosenTopic.id;
        }
        return false;
    };

    const isTopicChosen = (): boolean => {
        return chosenTopicId === '';
    };

    const chatStyle = (user: User) => { 
        return user.id === loggedInUser.id ? classes.chatMessageUser : classes.chatMessage;
    };

    const chatUserStyle = (user: User) => {
        return user.id === loggedInUser.id ? 'primary' : 'secondary'
    };

    return (
        <Paper elevation={3} className={classes.topicsContainer}>
            <Typography variant='h4' align='center'>
                {topicHead}
            </Typography><hr />
            <form onSubmit={handleAddTopic} className={classes.topicManagement}>
                <div className={classes.addTopic}>
                    <TextField
                        fullWidth
                        variant='outlined'
                        placeholder='Add new topic'
                        type='text'
                        size='small'
                        value={newTopic}
                        onChange={e => setNewTopic(e.target.value)}
                    />
                    <IconButton type='submit' color='primary'>
                        <AddCircleRounded fontSize='inherit'/>
                    </IconButton>
                </div>
                <div className={classes.topicInfo}>
                    <div style={topicAdderShow}>
                        <p style={{marginLeft: '1rem', fontSize: '0.8rem'}}>added by: {topicAdder()}</p>
                    </div>
                    <div style={removeBtnShow}>
                        <Button
                            className={classes.removeBtn}
                            size='small'
                            onClick={() => handleTopicRemoval(topics)}
                        >
                            Remove Topic
                        </Button>
                    </div>
                </div>
            </form>
            <div className={classes.flex}>
                <div className={classes.topicsWindow}>
                    <List component="nav">
                        {topics.map(topic =>
                            <ListItem selected={topicSelected(topic)} button key={topic.id} onClick={() => chooseTopic(topic)}>
                                <ListItemText primary={topic.name} />
                            </ListItem>
                        )}
                    </List>
                </div>
                <div className={classes.chatWindow}>
                    {chats.filter(c => c.topic_id === chosenTopicId).map(chat => {
                        const user: User | undefined = users.find(u => u.id === chat.user_id);
                        if (user) {
                            return (
                                <div className={chatStyle(user)} key={chat.id}>
                                    <Chip
                                        color={chatUserStyle(user)}
                                        label={user.username}
                                    />
                                    <span style={{marginLeft: '0.3rem', marginRight: '0.3rem'}}>{chat.message}</span>
                                </div>
                            )
                        } else { return <div key={chat.id}>Error</div> }
                    })}
                    <div ref={toChatBoxEnd} />
                </div>
            </div>
            <form onSubmit={handleMessageSend} className={classes.chatFieldAndButton}>
                <div className={classes.textInput}>
                    <TextField
                        fullWidth
                        disabled={isTopicChosen()}
                        placeholder='Type a message'
                        type='text'
                        size='small'
                        value={newMessage}
                        onChange={e => setNewMessage(e.target.value)}
                    />
                </div>
                <div>
                    <Button
                        type='submit'
                        variant='outlined'
                        color='primary'
                        disabled={isTopicChosen()}
                        endIcon={<Icon>send</Icon>}
                    >
                        Send
                    </Button>
                </div>
            </form>
        </Paper>
    )
};

export default Topics;