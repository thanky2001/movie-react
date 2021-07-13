import { Box } from '@material-ui/core';
import React, { useEffect } from 'react';
import ChildCinemas from './ChildCinemas';
import ParentCinemas from './ParentCinemas';
import ListMovies from './ListMovies';
import { getParentCinemas } from '../../../../actions/cinemas';
import { useDispatch} from 'react-redux';

export default function Cinemas() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getParentCinemas())
    }, []) // eslint-disable-line react-hooks/exhaustive-deps
    return (
        <div id="cum-rap">
            <Box component="div" className="tab--child bg--new" ></Box>
            <div className='tab--child tab--child-table'>
                <ParentCinemas />
                <ChildCinemas />
                <ListMovies />
            </div>
        </div>

    )
}
