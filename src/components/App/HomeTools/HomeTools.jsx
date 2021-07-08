import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DropdownItem, DropdownMenu, DropdownToggle, Dropdown } from 'reactstrap';
import { getListMovies } from '../../../actions/movies';
import './homeTools.css'

export default function HomeTools() {
    const [isShowMovie, setIsShowMovie] = useState(false);
    const [isShowCinema, setIsShowCinema] = useState(false);
    const [isShowDate, setIsShowDate] = useState(false);
    const [filmName, setFilmName] = useState(null);
    const [isShowSession, setIsShowSession] = useState(false);
    const {listFilmsNow} = useSelector(state => state.moviesReducer);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getListMovies())
    }, []) // eslint-disable-line react-hooks/exhaustive-deps
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
                                return <DropdownItem onClick={()=>{setFilmName(film.tenPhim)}} key={index}>{film.tenPhim}</DropdownItem>
                            })}
                        </>
                    </DropdownMenu>
                </Dropdown>
            </div>
            <div className="child__box">
                <Dropdown isOpen={isShowCinema} toggle={() => {setIsShowCinema(!isShowCinema)}}>
                    <DropdownToggle className="location--header" caret>
                        <span>Rạp</span>
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
                        <DropdownItem>Another Action</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </div>
            <div className="child__box">
            <Dropdown isOpen={isShowDate} toggle={() => {setIsShowDate(!isShowDate)}}>
                    <DropdownToggle className="location--header" caret>
                        <span>Ngày xem</span>
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
                        <DropdownItem>Another Action</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </div>
            <div className="child__box"><Dropdown isOpen={isShowSession} toggle={() => {setIsShowSession(!isShowSession)}}>
                    <DropdownToggle className="location--header" caret>
                        <span>Suất chiếu</span>
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
                        <DropdownItem>Another Action</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
                </div>
            <div id="btn-buy">
                <button>MUA VÉ NGAY</button>
            </div>
        </div>
    )
}
