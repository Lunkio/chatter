import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
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

export default theme;