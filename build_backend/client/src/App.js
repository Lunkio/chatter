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
const react_router_dom_1 = require("react-router-dom");
const react_redux_1 = require("react-redux");
const usersReducer_1 = require("./reducers/usersReducer");
const loginReducer_1 = require("./reducers/loginReducer");
const blogsReducer_1 = require("./reducers/blogsReducer");
const topicsReducer_1 = require("./reducers/topicsReducer");
const chatsReducer_1 = require("./reducers/chatsReducer");
const LoginPage_1 = __importDefault(require("./components/LoginPage"));
const Users_1 = __importDefault(require("./components/Users"));
const Message_1 = __importDefault(require("./components/Message"));
const Navbar_1 = __importDefault(require("./components/Navbar"));
const Home_1 = __importDefault(require("./components/Home"));
const Blogs_1 = __importDefault(require("./components/Blogs"));
const SingleBlog_1 = __importDefault(require("./components/SingleBlog"));
const SingleUser_1 = __importDefault(require("./components/SingleUser"));
const Topics_1 = __importDefault(require("./components/Topics"));
const App = () => {
    const user = react_redux_1.useSelector((state) => state.login);
    const dispatch = react_redux_1.useDispatch();
    react_1.useEffect(() => {
        const fetch = () => __awaiter(void 0, void 0, void 0, function* () {
            yield dispatch(usersReducer_1.initUsers());
            yield dispatch(blogsReducer_1.initBlogs());
            yield dispatch(topicsReducer_1.initTopics());
            yield dispatch(chatsReducer_1.initChats());
            dispatch(loginReducer_1.initLoginUser());
        });
        fetch();
    }, [dispatch]);
    return (<react_1.default.Fragment>
            {!user &&
        <core_1.Container maxWidth='md'>
                    <LoginPage_1.default />
                </core_1.Container>}
            {user &&
        <core_1.Container maxWidth='lg' style={{ marginTop: '7rem' }}>
                    <react_router_dom_1.BrowserRouter>
                        <Navbar_1.default />
                        <div style={{ marginTop: '5rem' }}>
                            <react_router_dom_1.Route exact path='/' render={() => <Home_1.default />}/>
                            <react_router_dom_1.Route exact path='/topics' render={() => <Topics_1.default />}/>
                            <react_router_dom_1.Route exact path='/blogs' render={() => <Blogs_1.default />}/>
                            <react_router_dom_1.Route path='/blogs/:id' render={() => <SingleBlog_1.default />}/>
                            <react_router_dom_1.Route exact path='/users' render={() => <Users_1.default />}/>
                            <react_router_dom_1.Route path='/users/:id' render={() => <SingleUser_1.default />}/>
                        </div>
                    </react_router_dom_1.BrowserRouter>
                </core_1.Container>}
            <Message_1.default />
        </react_1.default.Fragment>);
};
exports.default = App;
