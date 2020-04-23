"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_router_dom_1 = require("react-router-dom");
const react_redux_1 = require("react-redux");
const core_1 = require("@material-ui/core");
const styles_1 = require("../styles/styles");
const SingleUser = () => {
    const { id } = react_router_dom_1.useParams();
    const history = react_router_dom_1.useHistory();
    const classes = styles_1.useStyles();
    const users = react_redux_1.useSelector((state) => state.users);
    const blogs = react_redux_1.useSelector((state) => state.blogs);
    const user = users.find(u => u.id === id);
    if (!user) {
        return <div><h2>User was not found</h2></div>;
    }
    ;
    const userBlogs = blogs.filter(b => b.user_id === user.id);
    return (<div>
            <div>
                <core_1.Button color='default' variant='outlined' onClick={() => history.push('/users')}>
                    Go Back
                </core_1.Button>
            </div>
            <div>
                <h1>{user.username}</h1>
                <h4>Added blogs:</h4>
                {userBlogs.length === 0 &&
        <p><i>No added blogs...</i></p>}
                {userBlogs.length > 0 &&
        <ul>
                        {userBlogs.map(blog => <li key={blog.id}>
                                <react_router_dom_1.Link className={classes.tableLink} to={`/blogs/${blog.id}`}>
                                    {blog.title}
                                </react_router_dom_1.Link>
                            </li>)}
                    </ul>}
            </div>
        </div>);
};
exports.default = SingleUser;
