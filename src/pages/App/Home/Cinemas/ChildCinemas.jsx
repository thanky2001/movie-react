import React, { useState } from 'react';
import { List, ListItem, makeStyles, Tooltip } from '@material-ui/core';
import { useSelector } from 'react-redux';
import ReactLoading from 'react-loading';
import { splitString } from '../../../../utils/format';

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
    const { cinemasBySystem, isLoading } = useSelector(state => state.cinemasReducer);
    const handleListItemClick = (event, index) => {
        setSelectedIndex(index);
    };
    return (
        !isLoading ?
            <List component="ul" id='list-cinemas' className={classes.root} aria-label="main">
                {cinemasBySystem && cinemasBySystem.map((cinema, index) => {
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
            </List> :
            <div className="loading--component" style={{ paddingBottom: '80%' }}><ReactLoading type={"bars"} color={"#fb4226"} /></div>
    )
}
