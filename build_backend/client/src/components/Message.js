"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_redux_1 = require("react-redux");
const core_1 = require("@material-ui/core");
const Alert_1 = __importDefault(require("@material-ui/lab/Alert"));
const messageReducer_1 = require("../reducers/messageReducer");
const Alert = (props) => {
    return <Alert_1.default elevation={6} variant="filled" {...props}/>;
};
const Message = () => {
    const dispatch = react_redux_1.useDispatch();
    const message = react_redux_1.useSelector((state) => state.message);
    const handleClose = (_event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        ;
        dispatch(messageReducer_1.closeMessage());
    };
    return (<div>
            <core_1.Snackbar open={message.open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={message.severity}>
                    {message.text}
                </Alert>
            </core_1.Snackbar>
        </div>);
};
exports.default = Message;
