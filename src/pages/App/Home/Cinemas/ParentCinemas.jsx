import React, { useState } from 'react';
import { Avatar, List, ListItem, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
      '& .MuiList-root':{
          minHeight: '700px'
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
    const [selectedIndex, setSelectedIndex] = useState(1)
    const handleListItemClick = (event, index) => {
        setSelectedIndex(index);
    };
    return (
        <List component="ul" id="parent-cinemas" className={classes.root} aria-label="main">
            <ListItem 
                selected={selectedIndex === 1}
                onClick={(event) => handleListItemClick(event, 1)}>
                    <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
            </ListItem>
            <ListItem 
                selected={selectedIndex === 2}
                onClick={(event) => handleListItemClick(event, 2)}>
                    <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
            </ListItem>
            <ListItem 
                selected={selectedIndex === 3}
                onClick={(event) => handleListItemClick(event, 3)}>
                    <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
            </ListItem>
        </List>
    )
}
