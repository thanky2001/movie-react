import { Box } from '@material-ui/core';
import React from 'react';
import ChildCinemas from './ChildCinemas';
import ParentCinemas from './ParentCinemas';
import ListMovies from './ListMovies';

export default function Cinemas() {
    return (
        <div id="cum-rap">
            <Box component="div" className="tab--child bg--new" ></Box>
            <div className='tab--child'>
                <ParentCinemas/>
                <ChildCinemas/>
                <ListMovies/>
            </div>
        </div>
    )
}
