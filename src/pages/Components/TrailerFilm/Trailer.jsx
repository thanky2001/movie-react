import { Dialog } from '@material-ui/core';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiPaper-root': {
            position:'relative',
            width: '100vw',
            height: '80vh',
            [theme.breakpoints.down('xs')]: {
                height: '54vh',
            },
        },
        '& .close': {
            position: 'absolute',
            top: '-20px',
            right: '20px',
            opacity: '1',
            zIndex: '2',
        },
        '& .close img':{
            position: 'fixed',
            top: 'initial'
        }
    }
}))
export default function Trailer(props) {
    const classes = useStyles();
    return (
        <Dialog
            className={classes.root}
            open={props.open}
            onClose={props.onClose}
            maxWidth='md'
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
        >
            <button onClick={props.onClose} className='close'>
                <img width={40} height={40} src="../img/close.png" alt="close.png" />
            </button>
            <iframe
                width="100%"
                height='100%'
                allowFullScreen={true}
                src={`https://www.youtube.com/embed/${props.embedId ? props.embedId : 'error'}?autoplay=1`}
                frameBorder='0'
                title='video'
            />
        </Dialog>

    )
}
