import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { DropdownItem, DropdownMenu, DropdownToggle, Dropdown } from 'reactstrap';
import { getShowtimeFilm } from '../../../actions/getShowtimeFilm';
import { getDayHomeTools } from '../../../actions/handleBookingTickets';
import { getListMovies } from '../../../actions/movies';
import { splitDateString, splitString, ToSlug } from '../../../utils/format';
import './homeTools.css'

export default function HomeTools() {
    const [isShowMovie, setIsShowMovie] = useState(false);
    const [isShowCinema, setIsShowCinema] = useState(false);
    const [isShowDate, setIsShowDate] = useState(false);
    const [isShowSession, setIsShowSession] = useState(false);
    const [filmName, setFilmName] = useState(null);
    const [idFilm, setIdFilm] = useState(null);
    const [cinemaName, setCinemaName] = useState(null);
    const [idSystem, setIdSystem] = useState(null);
    const [idCinema, setIdCinema] = useState(null);
    const [dayName, setDayName] = useState(null);
    const [dayShowFilm, setDayShowFilm] = useState(null);
    const [hoursShow, setHoursShow] = useState(null);
    const [rapName, setRapName] = useState(null);
    const [idSt, setIdSt] = useState(null);
    const {listFilmsNow,detailFilm} = useSelector(state => state.moviesReducer);
    const {listDay, showtimeByCinema} = useSelector(state => state.cinemasReducer);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getListMovies())
    }, []) // eslint-disable-line react-hooks/exhaustive-deps
    useEffect(() => {
        dispatch(getShowtimeFilm(idFilm));
        setCinemaName(null);
        setIdSystem(null);
        setIdCinema(null);
    }, [idFilm]) // eslint-disable-line react-hooks/exhaustive-deps
    useEffect(() => {
        if (detailFilm && detailFilm.heThongRapChieu && idCinema && idSystem) {
            dispatch(getDayHomeTools(detailFilm.heThongRapChieu, idCinema, idSystem));
        }
        setDayName(null);
        setDayShowFilm(null);
    }, [idCinema, detailFilm, idSystem]) // eslint-disable-line react-hooks/exhaustive-deps
    useEffect(() => {
        getListDayShow();
        setHoursShow(null);
    }, [dayName]) // eslint-disable-line react-hooks/exhaustive-deps
    const getListDayShow = () =>{
        if (showtimeByCinema && showtimeByCinema.lichChieuPhim.length && dayName) {
            let d = splitString(dayName);
            let fd = [d[2],d[1],d[0]].join('-');
            let st = showtimeByCinema.lichChieuPhim.filter(l=> +new Date(splitDateString(l.ngayChieuGioChieu)[0]) === +new Date(fd));
            setDayShowFilm(st)
        }
    }
    return (
        <div id="home-tools" className="d-md-flex">
            <div id="select__movie">
                <Dropdown isOpen={isShowMovie} toggle={() => {setIsShowMovie(!isShowMovie)}}>
                    <DropdownToggle className="location--header" caret>
                        <span>{filmName ? filmName : 'Vui lòng chọn phim...'}</span>
                    </DropdownToggle>
                    <DropdownMenu
                        container="body"
                        modifiers={{
                            setMaxHeight: {
                                enabled: true,
                                order: 890,
                                fn: (data) => {
                                    return {
                                        ...data,
                                        styles: {
                                            ...data.styles,
                                            overflow: 'auto',
                                            maxHeight: '300px',
                                        },
                                    };
                                },
                            },
                        }}>
                        <>
                            {
                            listFilmsNow && listFilmsNow.map((film, index)=>{
                                return <DropdownItem onClick={()=>{setFilmName(film.tenPhim);setIdFilm(film.maPhim)}} key={index}>{film.tenPhim}</DropdownItem>
                            })}
                        </>
                    </DropdownMenu>
                </Dropdown>
            </div>
            <div className="child__box">
                <Dropdown isOpen={isShowCinema} toggle={() => {setIsShowCinema(!isShowCinema)}}>
                    <DropdownToggle className="location--header" caret>
                        <span>{cinemaName ? cinemaName : 'Rạp'}</span>
                    </DropdownToggle>
                    <DropdownMenu
                        container="body"
                        modifiers={{
                            setMaxHeight: {
                                enabled: true,
                                order: 890,
                                fn: (data) => {
                                    return {
                                        ...data,
                                        styles: {
                                            ...data.styles,
                                            overflow: 'auto',
                                            maxHeight: '300px',
                                        },
                                    };
                                },
                            },
                        }}>
                            {detailFilm && detailFilm.heThongRapChieu.length ? 
                                detailFilm.heThongRapChieu.map((cinema,index)=>{
                                    return(
                                    <p key={index}>
                                        <span className='title--drop'>{cinema.tenHeThongRap}</span>
                                        {cinema.cumRapChieu && cinema.cumRapChieu.map((crc,index)=>{
                                            return <DropdownItem onClick={()=>{setCinemaName(crc.tenCumRap);setIdCinema(crc.maCumRap);setIdSystem(cinema.maHeThongRap)}} key={index}>{crc.tenCumRap}</DropdownItem>
                                        })}
                                    </p>
                                    )
                                })
                                :<DropdownItem>Vui lòng chọn phim</DropdownItem>
                            }
                        
                    </DropdownMenu>
                </Dropdown>
            </div>
            <div className="child__box">
            <Dropdown isOpen={isShowDate} toggle={() => {setIsShowDate(!isShowDate)}}>
                    <DropdownToggle className="location--header" caret>
                        <span>{dayName ? dayName : 'Ngày xem'}</span>
                    </DropdownToggle>
                    <DropdownMenu
                        container="body"
                        modifiers={{
                            setMaxHeight: {
                                enabled: true,
                                order: 890,
                                fn: (data) => {
                                    return {
                                        ...data,
                                        styles: {
                                            ...data.styles,
                                            overflow: 'auto',
                                            maxHeight: '300px',
                                        },
                                    };
                                },
                            },
                        }}>
                            {
                                cinemaName ?
                                listDay && listDay.length ? listDay.map((day,index)=>{
                                    return <DropdownItem onClick={()=>setDayName(day)} key={index}>{day}</DropdownItem>
                                }):
                                <DropdownItem >Không có lịch chiếu trên rạp này</DropdownItem>:
                                <DropdownItem >Vui lòng chọn phim và rạp</DropdownItem>
                            }
                    </DropdownMenu>
                </Dropdown>
            </div>
            <div className="child__box"><Dropdown isOpen={isShowSession} toggle={() => {setIsShowSession(!isShowSession)}}>
                    <DropdownToggle className="location--header" caret>
                        <span>{hoursShow ? hoursShow: 'Suất chiếu'}</span>
                    </DropdownToggle>
                    <DropdownMenu
                        container="body"
                        modifiers={{
                            setMaxHeight: {
                                enabled: true,
                                order: 890,
                                fn: (data) => {
                                    return {
                                        ...data,
                                        styles: {
                                            ...data.styles,
                                            overflow: 'auto',
                                            maxHeight: '300px',
                                        },
                                    };
                                },
                            },
                        }}>
                            {
                                dayShowFilm && dayShowFilm.length ? dayShowFilm.map((ds,index)=>{
                                    return (
                                    <DropdownItem onClick={()=>{
                                        setHoursShow(splitDateString(ds.ngayChieuGioChieu)[1].slice(0,5));
                                        setRapName(ds.tenRap);
                                        setIdSt(ds.maLichChieu);
                                    }} 
                                    key={index}>{splitDateString(ds.ngayChieuGioChieu)[1].slice(0,5)}
                                    </DropdownItem>)
                                }):
                                <DropdownItem>Vui lòng chọn phim, rạp và ngày xem</DropdownItem>
                            }
                    </DropdownMenu>
                </Dropdown>
                </div>
            <div id="btn-buy">
                <Link to={`/checkout/${idSt && idSt}-${rapName && ToSlug(rapName)}-${detailFilm && ToSlug(detailFilm.tenPhim)}`} className={hoursShow ? 'btn--orange' :'disable'} >MUA VÉ NGAY</Link>
            </div>
        </div>
    )
}
