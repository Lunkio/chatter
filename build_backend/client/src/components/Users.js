"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_router_dom_1 = require("react-router-dom");
const core_1 = require("@material-ui/core");
const react_redux_1 = require("react-redux");
const styles_1 = require("../styles/styles");
const Users = () => {
    const classes = styles_1.useStyles();
    const users = react_redux_1.useSelector((state) => state.users);
    const blogs = react_redux_1.useSelector((state) => state.blogs);
    const amountOfBlogs = (user) => {
        const userBlogs = blogs.filter(b => b.user_id === user.id);
        return userBlogs.length;
    };
    return (<div style={{ 'marginTop': '2rem' }}>
            <core_1.TableContainer component={core_1.Paper} className={classes.table}>
                <core_1.Table>
                    <core_1.TableHead className={classes.tableHead}>
                        <core_1.TableRow>
                            <core_1.TableCell>Users</core_1.TableCell>
                            <core_1.TableCell>Topics created</core_1.TableCell>
                        </core_1.TableRow>
                    </core_1.TableHead>
                    <core_1.TableBody>
                        {users.map(user => <core_1.TableRow key={user.id}>
                                <core_1.TableCell>
                                    <react_router_dom_1.Link className={classes.tableLink} to={`/users/${user.id}`}>{user.username}</react_router_dom_1.Link>
                                </core_1.TableCell>
                                <core_1.TableCell>{amountOfBlogs(user)}</core_1.TableCell>
                            </core_1.TableRow>)}
                    </core_1.TableBody>
                </core_1.Table>
            </core_1.TableContainer>
        </div>);
};
exports.default = Users;
