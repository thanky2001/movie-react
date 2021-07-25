import { List, ListItem, makeStyles } from '@material-ui/core'
import React from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { splitDateString, ToSlug } from '../../../../utils/format';

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiList-root': {
            height: '630px'
        },
        '& .MuiListItem-root':{
            display: 'block'
        }

    }
}));
export default function ListMovies() {
    const { ListMoviesByParentCinemas } = useSelector(state => state.moviesReducer);
    const { isLoading } = useSelector(state => state.cinemasReducer);
    const classes = useStyles();
    return (
        !isLoading ?
        <List component="ul" id='list-movies' className={classes.root} aria-label="main">
            {ListMoviesByParentCinemas ?
                ListMoviesByParentCinemas.map((lst, index) => {
                    return (
                        <ListItem key={index}>
                            <div className="info__movies">
                                <div className="img--film" style={{ backgroundImage: `url(${lst.hinhAnh}), url("img/default-film.webp")` }}></div>
                                <div className="info--film">
                                    <span className="name--film">{lst.tenPhim}</span>
                                    <span className="detail--film"> <Link to={`/phim/${lst.maPhim}-${ToSlug(lst.tenPhim)}`}>[Chi tiết]</Link></span>
                                </div>
                            </div>
                            <div className="showtime">
                                <span className="name--film">2D Digital</span>
                                <div className='time'>
                                    {lst.lstLichChieuTheoPhim.length && lst.lstLichChieuTheoPhim.map((st,index)=>{
                                        return(
                                            <Link key={index} to={`/phim/${lst.maPhim}-${ToSlug(lst.tenPhim)}`} className="btn btn--showtime">{splitDateString(st.ngayChieuGioChieu)[1].slice(0,5)}</Link>
                                        )
                                    })}
                                </div>
                            </div>
                        </ListItem>
                    )
                }) :
                <p className="message">Không có suất chiếu</p>
            }
        </List>:
        ''
    )
}
