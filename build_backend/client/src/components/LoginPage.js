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
const core_1 = require("@material-ui/core");
const loginService_1 = __importDefault(require("../services/loginService"));
const loginReducer_1 = require("../reducers/loginReducer");
const messageReducer_1 = require("../reducers/messageReducer");
const styles_1 = require("../styles/styles");
const blogsService_1 = __importDefault(require("../services/blogsService"));
const topicsService_1 = __importDefault(require("../services/topicsService"));
const LoginPage = () => {
    const classes = styles_1.useStyles();
    const dispatch = react_redux_1.useDispatch();
    const [username, setUsername] = react_1.useState('');
    const [password, setPassword] = react_1.useState('');
    const handleLogin = (event) => __awaiter(void 0, void 0, void 0, function* () {
        event.preventDefault();
        try {
            const user = yield loginService_1.default.login({ username, password });
            if (user) {
                blogsService_1.default.setToken(user.token);
                topicsService_1.default.setToken(user.token);
            }
            ;
            setUsername('');
            setPassword('');
            dispatch(messageReducer_1.setMessage({ open: true, severity: 'success', text: `Welcome ${user === null || user === void 0 ? void 0 : user.name}` }));
            dispatch(loginReducer_1.loginUser(user));
        }
        catch (e) {
            dispatch(messageReducer_1.setMessage({ open: true, severity: 'error', text: 'Wrong username or password' }));
            console.log('error', e);
        }
    });
    return (<div>
            <div>
                <h1>Log in to application</h1>
            </div>
            <form onSubmit={handleLogin}>
                <core_1.TextField className={classes.textField} fullWidth variant='outlined' type='text' label='Username' value={username} onChange={(e) => setUsername(e.target.value)} size='small'/>
                <core_1.TextField className={classes.textField} fullWidth variant='outlined' type='password' label='Password' value={password} onChange={(e) => setPassword(e.target.value)} size='small'/>
                <core_1.Button type='submit' variant='contained' color='primary'>
                    Log in
                </core_1.Button>
            </form>
        </div>);
};
exports.default = LoginPage;
