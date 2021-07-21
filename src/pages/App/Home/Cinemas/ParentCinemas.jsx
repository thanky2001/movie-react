import React, { useEffect, useState } from 'react';
import { Avatar, List, ListItem, makeStyles, Tooltip } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { getShowtimeByParentCinemas  } from '../../../../actions/getShowtimeByParentCinema';
import ReactLoading from 'react-loading';

const useStyles = makeStyles((theme) => ({
    root: {
      '& .MuiList-root':{
          minHeight: '630px'
      },
      '& .MuiListItem-root':{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '20px',
            cursor: 'pointer'
      },
      '& .MuiListItem-root:hover .MuiAvatar-root':{
            opacity: '1'
      },
      '& .MuiAvatar-root':{
          width: '50px',
          height: '50px',
          opacity: '.5'
      },
      '& .Mui-selected':{
        backgroundColor: 'unset',
      },
      '& .Mui-selected:hover':{
        backgroundColor: 'unset',
      },
      '& .Mui-selected .MuiAvatar-root':{
        opacity: '1'
      },
    }
}));
export default function ParentCinemas() {
    const classes = useStyles();
    const [selectedIndex, setSelectedIndex] = useState(0);
    const dispatch = useDispatch()
    const {parentCinemas, isLoading} = useSelector(state => state.cinemasReducer);
    useEffect(() => {
        if(parentCinemas){
            getListChildCinemas()
        }
    }, [selectedIndex, parentCinemas]) // eslint-disable-line react-hooks/exhaustive-deps
    const handleListItemClick = (event, index) => {
        setSelectedIndex(index);
    };
    const getListChildCinemas=()=>{
       const code = parentCinemas[selectedIndex].maHeThongRap;
       dispatch(getShowtimeByParentCinemas(code));
    }
    return (
        !isLoading ?
        <List component="ul" id="parent-cinemas" className={classes.root} aria-label="main">
            {parentCinemas && parentCinemas.map((cinema,index)=>{
                return (
                    <Tooltip placement="right" key={index} title={cinema.tenHeThongRap} aria-label={index}>
                        <ListItem 
                            selected={selectedIndex === index}
                            onClick={(event) => handleListItemClick(event, index)}>
                            <Avatar alt={cinema.logo} src={cinema.logo} />
                        </ListItem>
                    </Tooltip>
                )
            })}
        </List>:
        <div className="loading--component" style={{ paddingBottom: '80%' }}><ReactLoading type={"bars"} color={"#fb4226"} /></div>
    )
}
