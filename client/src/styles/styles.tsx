import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        primaryLight: {
            color: theme.palette.primary.light
        },
        primaryDark: {
            color: theme.palette.primary.dark
        },
        secondaryLight: {
            color: theme.palette.secondary.light
        },
        secondaryDark: {
            color: theme.palette.secondary.dark
        },
        flex: {
            display: 'flex',
        },
        textField: {
            marginBottom: '1rem'
        },
        menuButton: {
            padding: '1.23rem',
            color: theme.palette.primary.light,
            marginLeft: '0.5rem',
        },
        logoutButton: {
            padding: '1.23rem',
            color: theme.palette.primary.light,
            marginLeft: '0.5rem',
        },
        link: {
            textDecoration: 'none',
            color: 'white'
        },
        navBarText: {
            fontSize: '0.7rem',
            fontStyle: 'italic',
            color: theme.palette.secondary.light,
        },
        table: {
            fontFamily: 'Solway',
        },
        tableHead: {
            backgroundColor: theme.palette.primary.light,
        },
        tableLink: {
            textDecoration: 'none',
            fontWeight: 'bold',
            color: 'primary'
        },
        singleBlog: {
            marginTop: '1rem',
            marginBottom: '1rem',
            padding: '0.5rem',
        },
        topicsContainer: {
            padding: '2rem'
        },
        removeBtn: {
            color: '#D32F2F'
        },
        topicsWindow: {
            width: '30%',
            height: '20rem',
            overflow: 'auto',
            borderRight: '1px solid grey'
        },
        chatWindow: {
            width: '70%',
            height: '20rem',
            overflow: 'auto'
        },
        topicManagement: {
            display: 'flex',
            justifyContent: 'space-between'
        },
        addTopic: {
            display: 'flex',
            alignItems: 'center',
            width: '30%'
        },
        topicInfo: {
            width: '70%',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
        },
        chatFieldAndButton: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-around',
            marginTop: '1rem'
        },
        textInput: {
            width: '80%',
        },
        chatUserColor: {
            color: theme.palette.primary.light
        },
        chatMessage: {
            display: 'flex',
            alignItems: 'center',
            margin: '0.5rem',
            marginBottom: '1rem',
        },
        chatMessageUser: {
            display: 'flex',
            alignItems: 'center',
            margin: '0.5rem',
            marginBottom: '1rem',
            flexDirection: 'row-reverse',
            textAlign: 'right',
        }
    }),
);