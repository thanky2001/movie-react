import { Box, makeStyles } from '@material-ui/core';
import React, { useEffect } from 'react';
import ChildCinemas from './ChildCinemas';
import ParentCinemas from './ParentCinemas';
import ListMovies from './ListMovies';
import { getParentCinemas } from '../../../../actions/cinemas';
import { useDispatch} from 'react-redux';

const useStyles = makeStyles((theme) => ({
    root: {
        '& .tab--child-table':{
            [theme.breakpoints.down('xs')]: {
                display: 'flow-root'
            }
        },
    }
}));
export default function Cinemas() {
    const classes = useStyles();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getParentCinemas())
    }, []) // eslint-disable-line react-hooks/exhaustive-deps
    return (
        <div id="cum-rap" className={classes.root}>
            <Box component="div" className="tab--child bg--new" ></Box>
            <div className='tab--child tab--child-table'>
                <ParentCinemas />
                <ChildCinemas />
                <ListMovies />
            </div>
        </div>

    )
}
