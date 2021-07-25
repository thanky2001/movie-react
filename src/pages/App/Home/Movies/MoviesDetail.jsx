import { Tab, makeStyles, Tabs, Grid, CircularProgress, List, ListItem, Avatar, Tooltip } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReactLoading from 'react-loading';
import '../home.css';
import '../../../../styles/Layout/Content.css'
import { useLocation } from 'react-router-dom';
import Trailer from '../../../Components/TrailerFilm/Trailer';
import { getMoviesDetail } from '../../../../actions/getMoviesDetailPage';
import { dayOfWeeks } from '../../../../utils/dayOfWeeks';
import { formatDateToVN, getEmbedId, getParamId } from '../../../../utils/format';
import Rating from '@material-ui/lab/Rating';
import { getParentCinemas } from '../../../../actions/cinemas';

function TabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            {...other}
        >
            {value === index && (
                <div className='tab--child tab--child-table'>
                    {children}
                </div>
            )}
        </div>
    );
}
const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: '60px',
        width: '100%',
        '& .MuiTabs-flexContainer': {
            justifyContent: 'center',
        },
        '& .loading--component': {
            height: 'calc(100vh - 451px)'
        },
        '& .MuiButtonBase-root': {
            color: '#fff',
            fontSize: '18px',
            fontWeight: '500',
            [theme.breakpoints.down('xs')]: {
                fontSize: '15px',
                fontWeight: 'bold'
            }
        },
        '& .MuiTab-textColorPrimary.Mui-selected': {
            color: '#fa5238'
        },
        '& .news--link': {
            color: '#000',
            fontSize: '17px',
            fontWeight: '600'
        },
        '& a.news--link:hover': {
            color: '#fb4226',
            textDecoration: 'none'
        },
        '& .col--news': {
            [theme.breakpoints.down('xs')]: {
                width: '100% !important'
            }
        },
        '& .info--main': {
            background: 'linear-gradient(to top, rgb(10, 32, 41), transparent 100%)',
            position: 'relative'
        },
        '& .box--card': {
            paddingTop: '150%',
            borderRadius: '4px'
        },
        '& .MuiGrid-item .show--hover': {
            visibility: 'hidden',
            opacity: '0',
            transition: 'all .2s',
        },
        '& .MuiGrid-item:hover .show--hover': {
            visibility: 'visible',
            opacity: '1',
        },
        '& .play__trailer': {
            top: '50%'
        },
        '& .MuiTab-root': {
            [theme.breakpoints.down('sm')]: {
                fontSize: '15px',
                fontWeight: 'bold',
                minWidth: 'unset',
            }
        },
        '& .film--info-name': {
            fontSize: '24px',
            fontWeight: '600'
        },
        '& .MuiCircularProgress-colorPrimary': {
            color: '#7ed321'
        },
        '& .MuiRating-root': {
            color: '#fa5238',
            display: 'flex',
            justifyContent: 'center',
            paddingTop: '10px'
        },
        '& .MuiRating-iconEmpty': {
            color: 'rgba(238, 238, 238, 0.71)'
        },
        '& .MuiListItem-root': {
            justifyContent: 'center',
            padding: '20px',
            cursor: 'pointer',
            [theme.breakpoints.down('xs')]: {
                justifyContent: 'flex-start',
            }
        },
        '& .MuiListItem-root:hover .MuiAvatar-root': {
            opacity: '1'
        },
        '& .MuiAvatar-root': {
            width: '50px',
            height: '50px',
            opacity: '.5'
        },
        '& .Mui-selected': {
            backgroundColor: 'unset',
        },
        '& .Mui-selected:hover': {
            backgroundColor: 'unset',
        },
        '& .Mui-selected .MuiAvatar-root': {
            opacity: '1'
        },
        '& #parent-cinemas': {
            minHeight: '630px',
            background: '#fff',
            borderRadius: '4px 0 0 4px',
            [theme.breakpoints.down('xs')]: {
                width: '40%',
            }
        },
        '& #list-day-of-week': {
            background: '#fff',
            width: '20%',
            [theme.breakpoints.down('md')]: {
                width: '25%',
            },
            [theme.breakpoints.down('xs')]: {
                width: '60%',
            }
        },
        '& #list-movies': {
            padding: '0',
            background: '#fff'
        },
        '& #list-movies .MuiListItem-root': {
            padding: '0'
        }

    },
}));
export default function MoviesDetail() {
    const classes = useStyles();
    const { detailFilm, isLoading } = useSelector(state => state.moviesReducer);
    const { parentCinemas } = useSelector(state => state.cinemasReducer);
    console.log(detailFilm, isLoading);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [value, setValue] = useState('one');
    const [index, setIndex] = useState('one');
    const [isShowTrailer, setIsShowTrailer] = useState(false);
    const [embedId, setEmbedId] = useState('');
    const location = useLocation();
    const dispatch = useDispatch();
    const [listDay, setListDay] = useState(null);
    useEffect(() => {
        let idFilm = getParamId(location.pathname).id;
        dispatch(getMoviesDetail(idFilm));
        dispatch(getParentCinemas());
    }, [location]) // eslint-disable-line react-hooks/exhaustive-deps
    useEffect(() => {
        setListDay(dayOfWeeks());
    }, [new Date().getDate()]) // eslint-disable-line react-hooks/exhaustive-deps
    console.log(listDay);
    const handleChange = (event, newValue) => {
        setValue(newValue);
        setIndex(newValue)
    };
    const handleOpenTrailer = (url, e) => {
        e.preventDefault();
        setIsShowTrailer(true)
        setEmbedId(getEmbedId(url))
    }

    const renderDetailMovies = () => {
        if (index === 'one') {
            return (
                <div className={classes.root}>
                    <List component="ul" id="parent-cinemas" aria-label="main">
                        {parentCinemas && parentCinemas.map((cinema, index) => {
                            return (
                                <Tooltip placement="right" key={index} title={cinema.tenHeThongRap} aria-label={index}>
                                    <ListItem
                                        selected={selectedIndex === index}>
                                        <Avatar alt={cinema.logo} src={cinema.logo} />
                                    </ListItem>
                                </Tooltip>
                            )
                        })}
                    </List>
                    <List component="ul" id='list-day-of-week'>
                        {listDay && listDay.map((day, index) => {
                            return (
                                <ListItem className='btn btn--day' key={index}>
                                    {day.dayName} <br />
                                    {day.date}
                                </ListItem>
                            )
                        })}
                    </List>
                </div>
            )
        } else if (index === 'two') {

        } else {

        }
    }
    return (
        <div id="movies-detail" className={classes.root}>
            {!isLoading && detailFilm ?
                <div className='main--detail'>
                    <div className='info--main'>
                        <div className='bg-main'>
                            <img alt={detailFilm.hinhAnh} src={detailFilm.hinhAnh} />
                        </div>
                        <div >
                            <Grid className="content--info tab--child" container spacing={3}>
                                <Grid className='film--poster' item xs={3}>
                                    <div className="box--card" style={{ backgroundImage: `url(${detailFilm.hinhAnh}), url("../img/default-film.webp")` }}>
                                        <div className="show--hover">
                                            <button onClick={(e) => handleOpenTrailer(detailFilm.trailer, e)} className='play__trailer'>
                                                <img width={60} src="../img/play-video.png" alt="play" />
                                            </button>
                                        </div>
                                    </div>
                                </Grid>
                                <Grid className='film--info' item xs={6}>
                                    <div>
                                        <span>{formatDateToVN(detailFilm.ngayKhoiChieu)}</span>
                                    </div>
                                    <div className='film--info-name'>
                                        <span>{detailFilm.tenPhim}</span>
                                    </div>
                                    <div>
                                        <span>{detailFilm.lichChieu ? `${detailFilm.lichChieu[0].thoiLuong} phút - 2D/Digital` : '2D/Digital'}</span>
                                    </div>
                                </Grid>
                                <Grid className='film--avg' item xs={3}>
                                    <div>
                                        <div className="border--avg">
                                            <span>{detailFilm.danhGia}</span>
                                        </div>
                                        <CircularProgress size={125} variant="determinate" value={detailFilm.danhGia * 10} />
                                    </div>
                                    <Rating name="half-rating-read" defaultValue={parseFloat(detailFilm.danhGia) / 2} precision={0.5} readOnly />
                                </Grid>
                            </Grid>
                        </div>
                    </div>
                    <div className='content--main tab--child'>
                        <Tabs
                            value={value}
                            indicatorColor="primary"
                            textColor="primary"
                            onChange={handleChange}
                        >
                            <Tab value="one" label="Lịch chiếu" />
                            <Tab value="two" label="Thông tin" />
                            <Tab value="three" label="Đánh giá" />
                        </Tabs>
                        <TabPanel value={value} index={index}>
                            {renderDetailMovies()}
                        </TabPanel>
                    </div>
                    <Trailer open={isShowTrailer} embedId={embedId} onClose={() => { setIsShowTrailer(false) }} />
                </div> :
                <div className="loading--component"><ReactLoading type={"bars"} color={"#fb4226"} /></div>}
        </div>
    )
}
