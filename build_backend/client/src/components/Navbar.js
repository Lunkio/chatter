"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_router_dom_1 = require("react-router-dom");
const styles_1 = require("../styles/styles");
const core_1 = require("@material-ui/core");
const react_redux_1 = require("react-redux");
const loginReducer_1 = require("../reducers/loginReducer");
const Navbar = () => {
    const dispatch = react_redux_1.useDispatch();
    const classes = styles_1.useStyles();
    const loggedInUser = react_redux_1.useSelector((state) => state.login);
    return (<div>
            <core_1.AppBar position='fixed'>
                <core_1.Toolbar>
                    <core_1.Grid container justify='space-between'>
                        <core_1.Grid item>
                            <core_1.Button component={react_router_dom_1.Link} to='/' className={classes.menuButton}>
                                Home
                            </core_1.Button>
                            <core_1.Button component={react_router_dom_1.Link} to='/topics' className={classes.menuButton}>
                                Topics
                            </core_1.Button>
                            <core_1.Button component={react_router_dom_1.Link} to='/blogs' className={classes.menuButton}>
                                Blogs  
                            </core_1.Button>
                            <core_1.Button component={react_router_dom_1.Link} to='/users' className={classes.menuButton}>
                                Users
                            </core_1.Button>
                        </core_1.Grid>
                        <core_1.Grid item>
                            <span className={classes.navBarText}>Logged in as {loggedInUser.username}</span>
                            <core_1.Button onClick={() => dispatch(loginReducer_1.logoutUser())} className={classes.logoutButton}>
                                Logout
                            </core_1.Button>
                        </core_1.Grid>
                    </core_1.Grid>
                </core_1.Toolbar>
            </core_1.AppBar>
        </div>);
};
exports.default = Navbar;
