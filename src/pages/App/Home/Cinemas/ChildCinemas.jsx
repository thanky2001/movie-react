import React, { useEffect, useState } from 'react';
import { List, ListItem, makeStyles, Tooltip } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { splitString } from '../../../../utils/format';
import { addListMoviesByParentCinemas } from '../../../../actions/cinemas';

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiList-root': {
            height: '630px'
        },
        '& .MuiListItem-root': {
            opacity: '.5',
            display: 'block',
            padding: '19px',
            cursor: 'pointer'
        },
        '& .MuiListItem-root span': {
            lineHeight: '1.4',
            display: 'block',
            fontSize: '12px'
        },
        '& .MuiListItem-root:hover': {
            opacity: '1'
        },
        '& .Mui-selected:hover': {
            backgroundColor: 'unset',
        },
        '& .Mui-selected': {
            backgroundColor: 'unset',
            opacity: '1'
        },
    }
}));
export default function ChildCinemas() {
    const classes = useStyles();
    const [selectedIndex, setSelectedIndex] = useState(0);
    const dispatch = useDispatch()
    const { showtimeBySystem, isLoading } = useSelector(state => state.cinemasReducer);
    useEffect(() => {
        if (showtimeBySystem && showtimeBySystem.lstCumRap) {
            getListMoviesByChildCinema()
        }
    }, [selectedIndex,showtimeBySystem]) // eslint-disable-line react-hooks/exhaustive-deps
    useEffect(() => {
        setSelectedIndex(0)
    }, [showtimeBySystem]) // eslint-disable-line react-hooks/exhaustive-deps
    const handleListItemClick = (event, index) => {
        setSelectedIndex(index);
    };
    const getListMoviesByChildCinema = () => {
        const value = showtimeBySystem.lstCumRap[selectedIndex] && showtimeBySystem.lstCumRap[selectedIndex].danhSachPhim;
        dispatch(addListMoviesByParentCinemas(value));
    }
    return (
        !isLoading ?
        <List component="ul" id='list-cinemas' className={classes.root} aria-label="main">
            {showtimeBySystem && showtimeBySystem.lstCumRap.map((cinema, index) => {
                return (
                    <Tooltip placement="right" key={index} title={cinema.tenCumRap} aria-label={index}>
                        <ListItem
                            selected={selectedIndex === index}
                            onClick={(event) => handleListItemClick(event, index)}>
                            <span className='cinema--name'><span className="color--name">{splitString(cinema.tenCumRap)[0]}</span>-{splitString(cinema.tenCumRap)[1]}</span>
                            <span className='cinema--location'>{cinema.diaChi}</span>
                        </ListItem>
                    </Tooltip>
                )
            })}
        </List>:
        ''
    )
}
