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
const react_redux_1 = require("react-redux");
const react_router_dom_1 = require("react-router-dom");
const core_1 = require("@material-ui/core");
const blogsReducer_1 = require("../reducers/blogsReducer");
const messageReducer_1 = require("../reducers/messageReducer");
const styles_1 = require("../styles/styles");
const blogsService_1 = __importDefault(require("../services/blogsService"));
const SingleBlog = () => {
    const dispatch = react_redux_1.useDispatch();
    const history = react_router_dom_1.useHistory();
    const classes = styles_1.useStyles();
    const { id } = react_router_dom_1.useParams();
    const blogs = react_redux_1.useSelector((state) => state.blogs);
    const users = react_redux_1.useSelector((state) => state.users);
    const loggedInUser = react_redux_1.useSelector((state) => state.login);
    const [comment, setComment] = react_1.useState('');
    const blog = blogs.find(b => b.id === id);
    if (!blog) {
        return <div><h2>Blog was not found</h2></div>;
    }
    ;
    let username = undefined;
    const user = users.find(u => u.id === blog.user_id);
    if (user) {
        username = user.username;
    }
    ;
    const handleBlogRemove = (blog) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            blogsService_1.default.setToken(loggedInUser.token);
            yield dispatch(blogsReducer_1.removeBlog(blog));
            dispatch(messageReducer_1.setMessage({ open: true, severity: 'info', text: 'Blog was removed' }));
            history.push('/blogs');
        }
        catch (e) {
            dispatch(messageReducer_1.setMessage({ open: true, severity: 'error', text: 'Something went wrong, please try again' }));
        }
    });
    const handleComment = (event) => __awaiter(void 0, void 0, void 0, function* () {
        event.preventDefault();
        if (comment === '') {
            dispatch(messageReducer_1.setMessage({ open: true, severity: 'warning', text: 'Comment cannot be empty' }));
            return;
        }
        ;
        try {
            blog.comments = blog.comments.concat(comment);
            yield dispatch(blogsReducer_1.editBlog(blog));
            setComment('');
        }
        catch (e) {
            dispatch(messageReducer_1.setMessage({ open: true, severity: 'warning', text: 'Something went wrong, please try again' }));
        }
        ;
    });
    const addLike = (blog) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            blog.likes = blog.likes + 1;
            yield dispatch(blogsReducer_1.editBlog(blog));
        }
        catch (e) {
            dispatch(messageReducer_1.setMessage({ open: true, severity: 'warning', text: 'Something went wrong, please try again' }));
        }
        ;
    });
    const removeBtnShow = { display: loggedInUser.id === blog.user_id ? '' : 'none' };
    return (<react_1.default.Fragment>
            <core_1.Grid container justify='space-between'>
                <core_1.Grid item>
                    <core_1.Button color='default' variant='outlined' onClick={() => history.push('/')}>
                        Go Back
                    </core_1.Button>
                </core_1.Grid>
                <core_1.Grid item style={removeBtnShow}>
                    <core_1.Button className={classes.removeBtn} variant='outlined' onClick={() => handleBlogRemove(blog)}>
                        Remove blog
                    </core_1.Button>
                </core_1.Grid>
            </core_1.Grid>
            <div>
                <core_1.Paper elevation={3} className={classes.singleBlog}>
                    <h2><span style={{ 'fontSize': '0.9rem' }}>title: </span>{blog.title}</h2>
                    <h2><span style={{ 'fontSize': '0.9rem' }}>author: </span>{blog.author}</h2>
                    <p><i>{blog.url}</i></p>
                    <core_1.Grid container justify='space-between'>
                        <core_1.Grid item>
                            <p>Comments: {blog.comments.length}</p>
                        </core_1.Grid>
                        <core_1.Grid item>
                            <p>Likes: <span>{blog.likes}</span></p>
                        </core_1.Grid>
                    </core_1.Grid>
                </core_1.Paper>
                <core_1.Grid container justify='space-between' style={{ 'marginTop': '-0.5rem' }}>
                    <core_1.Grid item style={{ 'marginTop': '-1.5rem' }}>
                        <h6>added by: <span>{username}</span></h6>
                    </core_1.Grid>
                    <core_1.Grid item>
                        <core_1.Button variant='contained' color='primary' onClick={() => addLike(blog)}>
                            Like
                        </core_1.Button>
                    </core_1.Grid>
                </core_1.Grid>
                <div>
                    <h4>Comments</h4>
                    <form onSubmit={handleComment}>
                        <core_1.TextField className={classes.textField} fullWidth variant='outlined' size='small' label='Write a comment' type='text' value={comment} onChange={e => setComment(e.target.value)}/>
                        <core_1.Button type='submit' variant='outlined' color='primary'>
                            Add Comment
                        </core_1.Button>
                    </form>
                    <ul>
                        {blog.comments.map((c, i) => <li key={i}>{c}</li>)}
                    </ul>
                </div>
            </div>
            
            
        </react_1.default.Fragment>);
};
exports.default = SingleBlog;
