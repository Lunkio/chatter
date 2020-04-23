"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_dom_1 = __importDefault(require("react-dom"));
require("./index.css");
const App_1 = __importDefault(require("./App"));
const react_redux_1 = require("react-redux");
const store_1 = __importDefault(require("./store/store"));
const styles_1 = require("@material-ui/core/styles");
const theme_1 = __importDefault(require("./styles/theme"));
react_dom_1.default.render(<react_redux_1.Provider store={store_1.default}>
        <styles_1.ThemeProvider theme={theme_1.default}>
            <App_1.default />
        </styles_1.ThemeProvider>
    </react_redux_1.Provider>, document.getElementById('root'));
