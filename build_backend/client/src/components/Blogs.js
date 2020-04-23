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
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const react_router_dom_1 = require("react-router-dom");
const react_redux_1 = require("react-redux");
const core_1 = require("@material-ui/core");
const styles_1 = require("../styles/styles");
const blogsReducer_1 = require("../reducers/blogsReducer");
const messageReducer_1 = require("../reducers/messageReducer");
const Blogs = () => {
    const dispatch = react_redux_1.useDispatch();
    const classes = styles_1.useStyles();
    const blogs = react_redux_1.useSelector((state) => state.blogs);
    const users = react_redux_1.useSelector((state) => state.users);
    const user = react_redux_1.useSelector((state) => state.login);
    const [title, setTitle] = react_1.useState('');
    const [author, setAuthor] = react_1.useState('');
    const [url, setUrl] = react_1.useState('');
    const [showAddBtn, setshowAddBtn] = react_1.useState(true);
    const [showCreate, setShowCreate] = react_1.useState(false);
    const findBlogUser = (id) => {
        const userBlog = users.find(u => u.id === id);
        return userBlog === null || userBlog === void 0 ? void 0 : userBlog.username;
    };
    const handleAddBlog = (event) => __awaiter(void 0, void 0, void 0, function* () {
        event.preventDefault();
        try {
            if (title === '' || author === '') {
                dispatch(messageReducer_1.setMessage({ open: true, severity: 'warning', text: 'Blog needs both author and title details' }));
                return;
            }
            ;
            const blog = {
                title,
                author,
                url,
                likes: 0,
                comments: [],
                user_id: user.id
            };
            yield dispatch(blogsReducer_1.addBlog(blog));
            dispatch(messageReducer_1.setMessage({ open: true, severity: 'success', text: 'Blog added succesfully!' }));
            setTitle('');
            setAuthor('');
            setUrl('');
        }
        catch (e) {
            console.log('error', e);
            dispatch(messageReducer_1.setMessage({ open: true, severity: 'error', text: 'Something went wrong, please try again' }));
        }
    });
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
    return (<div>
            <core_1.Container maxWidth='md' style={createShow}>
                <div>
                    <h2>Create a new blog</h2>
                </div>
                <form onSubmit={handleAddBlog}>
                    <core_1.TextField className={classes.textField} fullWidth variant='outlined' type='text' label='Title' value={title} onChange={e => setTitle(e.target.value)} size='small'/>
                    <core_1.TextField className={classes.textField} fullWidth variant='outlined' type='text' label='Author' value={author} onChange={e => setAuthor(e.target.value)} size='small'/>
                    <core_1.TextField className={classes.textField} fullWidth variant='outlined' type='text' label='Url' value={url} onChange={e => setUrl(e.target.value)} size='small'/>
                    <core_1.Grid container justify='space-between'>
                        <core_1.Grid item>
                            <core_1.Button type='submit' variant='contained' color='primary'>
                                Add new blog
                            </core_1.Button>
                        </core_1.Grid>
                        <core_1.Grid item>
                            <core_1.Button variant='outlined' className={classes.removeBtn} onClick={close}>
                                Close
                            </core_1.Button>
                        </core_1.Grid>
                    </core_1.Grid>
                </form>
            </core_1.Container>
            {blogs.length === 0 &&
        <h2>There are currently no blogs added...</h2>}
            {blogs.length > 0 &&
        <core_1.TableContainer component={core_1.Paper} className={classes.table} style={{ 'marginTop': '2rem' }}>
                    <core_1.Table>
                        <core_1.TableHead className={classes.tableHead}>
                            <core_1.TableRow>
                                <core_1.TableCell>Title</core_1.TableCell>
                                <core_1.TableCell>Author</core_1.TableCell>
                                <core_1.TableCell>Added by</core_1.TableCell>
                            </core_1.TableRow>
                        </core_1.TableHead>
                        <core_1.TableBody>
                            {blogs.map(blog => <core_1.TableRow key={blog.id}>
                                    <core_1.TableCell>
                                        <react_router_dom_1.Link className={classes.tableLink} to={`/blogs/${blog.id}`}>{blog.title}</react_router_dom_1.Link>
                                    </core_1.TableCell>
                                    <core_1.TableCell>{blog.author}</core_1.TableCell>
                                    <core_1.TableCell>{findBlogUser(blog.user_id)}</core_1.TableCell>
                                </core_1.TableRow>)}
                        </core_1.TableBody>
                    </core_1.Table>
                </core_1.TableContainer>}
            <div style={buttonShow}>
                <core_1.Button variant='contained' color='primary' onClick={open}>
                    Create new blog
                </core_1.Button>
            </div>
        </div>);
};
exports.default = Blogs;
