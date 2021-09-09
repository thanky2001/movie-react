import { Tab, makeStyles, Tabs, Grid, CircularProgress, List, ListItem, Avatar, Tooltip, Box } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReactLoading from 'react-loading';
import '../home.css';
import '../../../../styles/Layout/Content.css'
import { Link, useLocation } from 'react-router-dom';
import Trailer from '../../../Components/TrailerFilm/Trailer';
import { dayOfWeeks } from '../../../../utils/dayOfWeeks';
import { changeHttpIntoHttps, formatDateToVN, getEmbedId, getParamId, splitDateString, splitString, ToSlug } from '../../../../utils/format';
import Rating from '@material-ui/lab/Rating';
import { getParentCinemas } from '../../../../actions/cinemas';
import { addShowtimeFilmBySystem, getShowtimeFilm } from '../../../../actions/getShowtimeFilm';
import { scrollToTop } from '../../../../utils/scrollTop';

function TabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
        <div
            className="mt-60"
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
        '&#movies-detail': {
            marginTop: '60px'
        },
        '& .mt-60': {
            marginTop: '60px'
        },
        [theme.breakpoints.down('xs')]: {
            '& .film--info': {
                left: '33.333%'
            },
            '& .mt-60': {
                marginTop: '0'
            },
            '& .bg-main': {
                paddingTop: '50%'
            }
        },
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
            color: '#fa5238'
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
                width: '30%',
                '& li': {
                    justifyContent: 'center'
                }
            }
        },
        '& #list-day-of-week': {
            background: '#fff',
            width: '20%',
            [theme.breakpoints.down('md')]: {
                width: '25%',
            },
            [theme.breakpoints.down('xs')]: {
                width: '70%',
            }
        },
        '& #list-movies': {
            padding: '0',
            background: '#fff',
            [theme.breakpoints.down('md')]: {
                width: 'calc(100% - 25% - 92px)',
            },
            [theme.breakpoints.down('xs')]: {
                width: '100%',
                borderRadius: '4px',
            },
            '& .MuiBox-root':{
                width: '100%',
                padding: '20px',
                '& .cinema--name':{
                    fontSize: '16px !important',
                    whiteSpace: 'normal'
                },
                '& .color--name':{
                    fontSize: '16px !important'
                }
            }
        },
        '& #list-movies .MuiListItem-root': {
            padding: '0'
        }

    },
}));
export default function MoviesDetail() {
    const classes = useStyles();
    const { detailFilm, isLoading } = useSelector(state => state.moviesReducer);
    const { parentCinemas, listStFilm } = useSelector(state => state.cinemasReducer);
    const [selectedCinema, setSelectedCinema] = useState(0);
    const [selectedDay, setSelectedDay] = useState(0);
    const [value, setValue] = useState('one');
    const [index, setIndex] = useState('one');
    const [isShowTrailer, setIsShowTrailer] = useState(false);
    const [embedId, setEmbedId] = useState('');
    const location = useLocation();
    const dispatch = useDispatch();
    const [listDay, setListDay] = useState(null);
    useEffect(() => {
        let idFilm = getParamId(location.pathname).id;
        dispatch(getShowtimeFilm(idFilm));
        dispatch(getParentCinemas());
        scrollToTop();
    }, [location]) // eslint-disable-line react-hooks/exhaustive-deps
    useEffect(() => {
        setListDay(dayOfWeeks());
    }, [new Date().getDate()]) // eslint-disable-line react-hooks/exhaustive-deps
    useEffect(() => {
        setSelectedDay(0)
    }, [selectedCinema]) // eslint-disable-line react-hooks/exhaustive-deps
    useEffect(() => {
        getShowtimeOfFilm();
    }, [selectedCinema, selectedDay, listDay, parentCinemas, detailFilm]) // eslint-disable-line react-hooks/exhaustive-deps
    const handleChangeTab = (event, newValue) => {
        setValue(newValue);
        setIndex(newValue)
    };
    const handleOpenTrailer = (url, e) => {
        e.preventDefault();
        setIsShowTrailer(true)
        setEmbedId(getEmbedId(url))
    }
    const getShowtimeOfFilm = () => {
        let date = listDay && listDay[selectedDay].date;
        let idSt = parentCinemas && parentCinemas[selectedCinema].maHeThongRap;
        let listCinemas = detailFilm && detailFilm.heThongRapChieu;
        if (date && idSt && listCinemas && listCinemas.length) {
            dispatch(addShowtimeFilmBySystem(listCinemas, idSt, date));
        }
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
                                        onClick={() => setSelectedCinema(index)}
                                        selected={selectedCinema === index}>
                                        <Avatar alt={cinema.logo} src={changeHttpIntoHttps(cinema.logo)} />
                                    </ListItem>
                                </Tooltip>
                            )
                        })}
                    </List>
                    <List component="ul" id='list-day-of-week'>
                        {listDay && listDay.map((day, index) => {
                            return (
                                <ListItem
                                    className='btn btn--day'
                                    onClick={() => setSelectedDay(index)}
                                    key={index}
                                    selected={selectedDay === index}>
                                    {day.dayName} <br />
                                    {day.day}-{day.month}-{day.fullYear}
                                </ListItem>
                            )
                        })}
                    </List>
                    <List component="ul" id='list-movies' aria-label="main">
                        {listStFilm ?
                            listStFilm.cumRapChieu && listStFilm.cumRapChieu.map((st, index) => {
                                return (
                                    <ListItem key={index}>
                                        <Box >
                                            <span className='cinema--name'><span className="color--name">{splitString(st.tenCumRap)[0]}</span>-{splitString(st.tenCumRap)[1]}</span>
                                            <div className='time'>
                                                <span className="name--film">Lịch chiếu:</span>
                                                {st.lichChieuPhim.map((lst, index) => {
                                                    return (
                                                        <Link key={index} to={`/checkout/${lst.maLichChieu}-${ToSlug(lst.tenRap)}-${ToSlug(detailFilm.tenPhim)}`} className="btn btn--showtime">{splitDateString(lst.ngayChieuGioChieu)[1].slice(0, 5)}</Link>
                                                    )
                                                })}
                                            </div>
                                        </Box>
                                    </ListItem>
                                )
                            })
                            :
                            <p className="message">Không có suất chiếu</p>
                        }
                    </List>
                </div>
            )
        } else if (index === 'two') {
            return(
                <Grid container className='news-film'>
                    <Grid item xs={12} md >
                        <p>
                            <span className='title--content'>Ngày công chiếu</span>
                            <span className='info--content'>{formatDateToVN(detailFilm.ngayKhoiChieu)}</span>
                        </p>
                        <p>
                            <span className='title--content'>Thời gian khởi chiếu</span>
                            <span className='info--content'>{splitDateString(detailFilm.ngayKhoiChieu)[1].slice(0, 5)}</span>
                        </p>
                        <p>
                            <span className='title--content'>Định dạng</span>
                            <span className='info--content'>2D/Digital</span>
                        </p>
                        <p>
                            <span className='title--content'>Đánh giá</span>
                            <span className='info--content'>{detailFilm.danhGia}</span>
                        </p>
                    </Grid>
                    <Grid item xs={12} md>
                        <p className='title--content'>Nội dung</p>
                        <p className='full--content'>{detailFilm.moTa}</p>
                    </Grid>
                </Grid>
            )
        } else {
            return(
                <div id="show-reviews">
                    <div id='my-rating'>
                        <div className='my-comment' onClick={()=>alert('Chức năng đang phát triển')}>
                            <Avatar id='avatar' alt="cgv" src="../img/avatar.png" />
                            <span id='thinks'>Bạn nghĩ gì về phim này?</span>
                            <Box className='rating' component='div' display={{ xs: 'none', sm: 'block' }}><Rating name="half-rating-read" defaultValue={5} precision={0.5} readOnly /></Box>
                        </div>
                    </div>
                    <div id='list-comment'></div>
                </div>
            )
        }
    }
    return (
        <div id="movies-detail" className={classes.root}>
            {!isLoading && detailFilm ?
                <div className='main--detail'>
                    <div className='info--main'>
                        <div className='bg-main'>
                            <img alt={detailFilm.hinhAnh} src={changeHttpIntoHttps(detailFilm.hinhAnh)} />
                        </div>
                        <div >
                            <Grid className="content--info tab--child" container spacing={3}>
                                <Grid className='film--poster' item xs={4} sm={3}>
                                    <div className="box--card" style={{ backgroundImage: `url(${changeHttpIntoHttps(detailFilm.hinhAnh)}), url("../img/default-film.webp")` }}>
                                        <div className="show--hover">
                                            <button onClick={(e) => handleOpenTrailer(detailFilm.trailer, e)} className='play__trailer'>
                                                <img width={60} src="../img/play-video.png" alt="play" />
                                            </button>
                                        </div>
                                    </div>
                                </Grid>
                                <Grid className='film--info' item sx={8} sm={6}>
                                    <div>
                                        <span>{formatDateToVN(detailFilm.ngayKhoiChieu)}</span>
                                    </div>
                                    <div className='film--info-name'>
                                        <span>{detailFilm.tenPhim}</span>
                                    </div>
                                    <div>
                                        <span>{detailFilm.heThongRapChieu.length && detailFilm.heThongRapChieu[0].cumRapChieu.length && detailFilm.heThongRapChieu[0].cumRapChieu[0].lichChieuPhim.length ? `${detailFilm.heThongRapChieu[0].cumRapChieu[0].lichChieuPhim[0].thoiLuong} phút - 2D/Digital` : '2D/Digital'}</span>
                                    </div>
                                </Grid>
                                <Grid className='film--avg' item sm={3}>
                                    <Box component='div' display={{ xs: 'none', sm: 'block' }}>
                                        <div className="border--avg">
                                            <span>{detailFilm.danhGia}</span>
                                        </div>
                                        <CircularProgress size={125} variant="determinate" value={detailFilm.danhGia * 10} />
                                        <Rating name="half-rating-read" defaultValue={parseFloat(detailFilm.danhGia) / 2} precision={0.5} readOnly />
                                    </Box>
                                </Grid>
                            </Grid>
                        </div>
                    </div>
                    <div className='content--main tab--child'>
                        <Tabs
                            value={value}
                            indicatorColor="primary"
                            textColor="primary"
                            onChange={handleChangeTab}
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
