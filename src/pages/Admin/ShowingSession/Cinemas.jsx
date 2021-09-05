import { Grid, List, ListItem, ListItemText, makeStyles, Paper } from '@material-ui/core'
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addListMoviesByParentCinemas } from '../../../actions/cinemas';
import { getHeight } from '../../../utils/size';

const height = getHeight() - 56;
const useStyles = makeStyles((theme) => ({
    root: {
        [theme.breakpoints.up('sm')]: {
            paddingRight: '15px'
        },
        [theme.breakpoints.down('xs')]: {
            paddingBottom: '15px'
        }
    },
    overflow: {
        maxHeight: `${height}px`,
        overflowX: 'hidden',
        scrollbarWidth: 'thin',
        overflowY: 'auto',
        [theme.breakpoints.down('xs')]: {
            maxHeight: '144px',
        }
    },
    paper: {
        borderRadius: 0
    },
}))
export default function Cinemas(props) {
    const classes = useStyles();
    const [selectedCinema, setSelectedCinema] = useState(0);
    const { showtimeBySystem } = useSelector(state => state.cinemasReducer);
    const dispatch = useDispatch();
    const date = props.date && props.date;
    useEffect(() => {
        setSelectedCinema(0)
    }, [showtimeBySystem]) // eslint-disable-line react-hooks/exhaustive-deps
    useEffect(() => {
        if (showtimeBySystem) {
            const value = showtimeBySystem.lstCumRap[selectedCinema] && showtimeBySystem.lstCumRap[selectedCinema].danhSachPhim;
            dispatch(addListMoviesByParentCinemas(value, date));
        }
    }, [showtimeBySystem, selectedCinema, date]) // eslint-disable-line react-hooks/exhaustive-deps
    const handleListItemClick = (index) => {
        setSelectedCinema(index);
        props.setSelectedDay(0)
    };
    return (
        <Grid className={classes.root} item xs={12} sm={3} >
            <Paper className={classes.paper}>
                <List id='list-cinemas' className = {classes.overflow} disablePadding={true}>
                    {
                        showtimeBySystem && showtimeBySystem.lstCumRap.length &&
                        showtimeBySystem.lstCumRap.map((ci, index) => {
                            return (
                                <ListItem
                                    key={index}
                                    button
                                    selected={selectedCinema === index}
                                    onClick={() => handleListItemClick(index)}
                                >
                                    <ListItemText className='cinema--name' primary={ci.tenCumRap.split(' - ')[1]} />
                                </ListItem>
                            )
                        })
                    }
                </List>
            </Paper>
        </Grid>
    )
}
