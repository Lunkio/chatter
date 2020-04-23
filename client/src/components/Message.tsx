import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Snackbar } from '@material-ui/core';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import { AppState } from '../store/store';
import { closeMessage } from '../reducers/messageReducer';

const Alert = (props: AlertProps) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
};

const Message = () => {
    const dispatch = useDispatch();
    const message = useSelector((state: AppState) => state.message);

    const handleClose = (_event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') { return };
        dispatch(closeMessage());
    };

    return (
        <div>
            <Snackbar open={message.open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={message.severity}>
                    {message.text}
                </Alert>
            </Snackbar>
        </div>
    )
};

export default Message;