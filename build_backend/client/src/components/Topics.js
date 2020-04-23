"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const core_1 = require("@material-ui/core");
const icons_1 = require("@material-ui/icons");
const styles_1 = require("../styles/styles");
const react_redux_1 = require("react-redux");
const messageReducer_1 = require("../reducers/messageReducer");
const topicsReducer_1 = require("../reducers/topicsReducer");
const chatsReducer_1 = require("../reducers/chatsReducer");
const topicsService_1 = __importDefault(require("../services/topicsService"));
const socket_io_client_1 = __importDefault(require("socket.io-client"));
const Topics = () => {
    const classes = styles_1.useStyles();
    const dispatch = react_redux_1.useDispatch();
    const loggedInUser = react_redux_1.useSelector((state) => state.login);
    const topics = react_redux_1.useSelector((state) => state.topics);
    const chats = react_redux_1.useSelector((state) => state.chats);
    const users = react_redux_1.useSelector((state) => state.users);
    const [newTopic, setNewTopic] = react_1.useState('');
    const [newMessage, setNewMessage] = react_1.useState('');
    const [topicHead, setTopicHead] = react_1.useState('Choose a topic');
    const [chosenTopicId, setChosenTopicId] = react_1.useState('');
    const [chosenTopic, setChosenTopic] = react_1.useState(undefined);
    const toChatBoxEnd = react_1.useRef(null);
    const scrollToBottom = () => {
        if (toChatBoxEnd.current) {
            toChatBoxEnd.current.scrollIntoView({ behavior: 'smooth' });
        }
        ;
    };
    react_1.useEffect(scrollToBottom, [chats, chosenTopic]);
    if (!exports.socket) {
        exports.socket = socket_io_client_1.default(':3001');
        exports.socket.on('chat message', (message) => {
            dispatch(chatsReducer_1.addChatMessage(message));
        });
        exports.socket.on('topic', (topic) => {
            dispatch(topicsReducer_1.addTopic(topic));
        });
    }
    ;
    let removeBtnShow = { display: 'none' };
    let topicAdderShow = { visibility: 'hidden' };
    if (chosenTopic) {
        removeBtnShow = { display: chosenTopic.user_id === loggedInUser.id ? '' : 'none' };
        topicAdderShow = { visibility: 'visible' };
    }
    ;
    const chooseTopic = (topic) => {
        setTopicHead(topic.name);
        setChosenTopicId(topic.id);
        setChosenTopic(topic);
    };
    const handleAddTopic = (e) => __awaiter(void 0, void 0, void 0, function* () {
        e.preventDefault();
        try {
            if (newTopic === '') {
                dispatch(messageReducer_1.setMessage({ open: true, severity: 'warning', text: 'Topic cannot be empty' }));
                return;
            }
            ;
            const topic = {
                name: newTopic,
                user_id: loggedInUser.id
            };
            const addedTopic = yield topicsService_1.default.addNewTopic(topic);
            dispatch(messageReducer_1.setMessage({ open: true, severity: 'success', text: 'New topic was added' }));
            setNewTopic('');
            chooseTopic(addedTopic);
        }
        catch (e) {
            dispatch(messageReducer_1.setMessage({ open: true, severity: 'error', text: 'Something went wrong, please try again' }));
        }
    });
    const handleMessageSend = (e) => __awaiter(void 0, void 0, void 0, function* () {
        e.preventDefault();
        try {
            if (newMessage === '') {
                return;
            }
            const chatMessage = {
                message: newMessage,
                user_id: loggedInUser.id,
                topic_id: chosenTopicId
            };
            yield topicsService_1.default.addNewChatMessage(chatMessage);
            setNewMessage('');
        }
        catch (e) {
            dispatch(messageReducer_1.setMessage({ open: true, severity: 'error', text: 'Something went wrong, please try again' }));
        }
    });
    const handleTopicRemoval = (topics) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const topicToRemove = topics.find(t => t.id === chosenTopicId);
            if (!topicToRemove) {
                return;
            }
            topicsService_1.default.setToken(loggedInUser.token);
            yield dispatch(topicsReducer_1.removeTopic(topicToRemove.id));
            dispatch(messageReducer_1.setMessage({ open: true, severity: 'success', text: 'Topic removed succesfully' }));
            setTopicHead('Choose a topic');
            setChosenTopicId('');
            setChosenTopic(undefined);
        }
        catch (e) {
            dispatch(messageReducer_1.setMessage({ open: true, severity: 'error', text: 'Something went wrong, please try again' }));
        }
    });
    const topicAdder = () => {
        if (chosenTopic) {
            const user = users.find(u => u.id === chosenTopic.user_id);
            if (user) {
                return user.username;
            }
        }
    };
    const topicSelected = (topic) => {
        if (chosenTopic) {
            return topic.id === chosenTopic.id;
        }
        return false;
    };
    const isTopicChosen = () => {
        return chosenTopicId === '';
    };
    const chatStyle = (user) => {
        return user.id === loggedInUser.id ? classes.chatMessageUser : classes.chatMessage;
    };
    const chatUserStyle = (user) => {
        return user.id === loggedInUser.id ? 'primary' : 'secondary';
    };
    return (<core_1.Paper elevation={3} className={classes.topicsContainer}>
            <core_1.Typography variant='h4' align='center'>
                {topicHead}
            </core_1.Typography><hr />
            <form onSubmit={handleAddTopic} className={classes.topicManagement}>
                <div className={classes.addTopic}>
                    <core_1.TextField fullWidth variant='outlined' placeholder='Add new topic' type='text' size='small' value={newTopic} onChange={e => setNewTopic(e.target.value)}/>
                    <core_1.IconButton type='submit' color='primary'>
                        <icons_1.AddCircleRounded fontSize='inherit'/>
                    </core_1.IconButton>
                </div>
                <div className={classes.topicInfo}>
                    <div style={topicAdderShow}>
                        <p style={{ marginLeft: '1rem', fontSize: '0.8rem' }}>added by: {topicAdder()}</p>
                    </div>
                    <div style={removeBtnShow}>
                        <core_1.Button className={classes.removeBtn} size='small' onClick={() => handleTopicRemoval(topics)}>
                            Remove Topic
                        </core_1.Button>
                    </div>
                </div>
            </form>
            <div className={classes.flex}>
                <div className={classes.topicsWindow}>
                    <core_1.List component="nav">
                        {topics.map(topic => <core_1.ListItem selected={topicSelected(topic)} button key={topic.id} onClick={() => chooseTopic(topic)}>
                                <core_1.ListItemText primary={topic.name}/>
                            </core_1.ListItem>)}
                    </core_1.List>
                </div>
                <div className={classes.chatWindow}>
                    {chats.filter(c => c.topic_id === chosenTopicId).map(chat => {
        const user = users.find(u => u.id === chat.user_id);
        if (user) {
            return (<div className={chatStyle(user)} key={chat.id}>
                                    <core_1.Chip color={chatUserStyle(user)} label={user.username}/>
                                    <span style={{ marginLeft: '0.3rem', marginRight: '0.3rem' }}>{chat.message}</span>
                                </div>);
        }
        else {
            return <div key={chat.id}>Error</div>;
        }
    })}
                    <div ref={toChatBoxEnd}/>
                </div>
            </div>
            <form onSubmit={handleMessageSend} className={classes.chatFieldAndButton}>
                <div className={classes.textInput}>
                    <core_1.TextField fullWidth disabled={isTopicChosen()} placeholder='Type a message' type='text' size='small' value={newMessage} onChange={e => setNewMessage(e.target.value)}/>
                </div>
                <div>
                    <core_1.Button type='submit' variant='outlined' color='primary' disabled={isTopicChosen()} endIcon={<core_1.Icon>send</core_1.Icon>}>
                        Send
                    </core_1.Button>
                </div>
            </form>
        </core_1.Paper>);
};
exports.default = Topics;
