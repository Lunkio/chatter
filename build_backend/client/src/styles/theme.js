"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const styles_1 = require("@material-ui/core/styles");
const theme = styles_1.createMuiTheme({
    typography: {
        fontFamily: [
            'Solway',
            'serif'
        ].join(','),
        button: {
            textTransform: 'none'
        }
    },
    palette: {
        primary: {
            main: '#05386B',
            light: '#EDF5E1',
        },
        secondary: {
            main: '#5CDB95',
            light: '#8EE4AF',
            dark: '#379683'
        },
        error: {
            main: '#F44336',
            dark: '#D32F2F',
            light: '#E57373'
        }
    }
});
exports.default = theme;
