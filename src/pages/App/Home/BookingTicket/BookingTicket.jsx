import React, { useEffect, useState } from 'react';
import { Grid, makeStyles, Paper, Table, TableHead, TableRow, TableCell, TableBody, TableContainer, TableFooter } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import ReactLoading from 'react-loading';
import '../home.css';
import './booking.css';
import { useDispatch, useSelector } from 'react-redux';
import { Prompt, useHistory, useLocation } from 'react-router-dom';
import { getListTicketRoom } from '../../../../actions/getListTicketRoom';
import { changeHttpIntoHttps, getParamId } from '../../../../utils/format';
import { addChair } from '../../../../actions/addChair';
import Swal from 'sweetalert2';
import { postBookingTicket } from '../../../../actions/postBookingTicket';

const useStyle = makeStyles((theme) => ({
    root: {
        [theme.breakpoints.down('xs')]: {
            '& .bg-main': {
                paddingTop: '50%'
            },
            '& .film--info p': {
                marginBottom: '5px',
                fontSize: '14px',
            },
            '& .box--card': {
                marginBottom: '0',
                paddingTop: '165%'
            },
            '& .content--booking': {
                paddingTop: '30px'
            },
            '& .content--info': {
                top: '55%'
            },
            '& .compartment': {
                display: 'none'
            },
            '& .chooseing': {
                display: 'block'
            },
        },
        [theme.breakpoints.down('sm')]: {
            '& .content--booking': {
                maxWidth: '700px'
            },
            '& #checkout': {
                paddingBottom: '60px',
                marginTop: 0,
            }
        },
        [theme.breakpoints.up('md')]: {
            '& .bg-main': {
                paddingTop: '30%',
            }
        },
        '& .loading--component': {
            height: 'calc(100vh - 451px)'
        },
        '& .MuiBox-root': {
            marginTop: '10%',
            textAlign: 'initial'
        },
        '& .film--info p': {
            display: 'flex',
            fontSize: '15px',
        },
        '& .info--main': {
            position: 'relative'
        },
        '& .film--info': {
            left: '30%',
            width: '70%',
        },
        ' & .title--content': {
            width: '30% ',
            [theme.breakpoints.down('xs')]: {
                width: '40% ',
            }
        },
        '& .info--content': {
            width: '70%',
            [theme.breakpoints.down('xs')]: {
                width: '60% ',
            }
        },
        '& .checkout': {
            paddingTop: '20px'
        },
        '& #chair.MuiPaper-root': {
            backgroundColor: 'transparent',
            color: '#fff'
        },
        '& .MuiTableCell-root': {
            padding: '10px'
        },
        '& .MuiTableContainer-root': {
            maxHeight: '340px',
            overflowX: 'hidden',
            borderRadius: '5px',
            [theme.breakpoints.down('sm')]: {
                maxHeight: '200px'
            }
        },
        '& .MuiSvgIcon-root': {
            fill: '#ff1919'
        },
        '& .MuiCircularProgress-root': {
            margin: '-1px 13px'
        }

    }
}))
export default function BookingTicket() {
    const classes = useStyle();
    const dispatch = useDispatch();
    const location = useLocation();
    const history = useHistory();
    const { isLoading, listChairs, isReload } = useSelector(state => state.bookingReducer);
    const { userInfo } = useSelector(state => state.authReducer);
    const [updateListChairs, setUpdateListChairs] = useState(null);
    if (updateListChairs && updateListChairs.danhSachVe.length > 0) {
        window.onbeforeunload = function () {
            return true;
        };
    } else {
        window.onbeforeunload = null;
    }
    useEffect(() => {
        let idSt = getParamId(location.pathname).id;
        if (idSt) {
            dispatch(getListTicketRoom(idSt))
        }
    }, [location, isReload]) // eslint-disable-line react-hooks/exhaustive-deps
    useEffect(() => {
        setUpdateListChairs({
            maLichChieu: listChairs && listChairs.thongTinPhim.maLichChieu,
            danhSachVe: [],
            taiKhoanNguoiDung: userInfo && userInfo.taiKhoan
        })
    }, [listChairs && listChairs.thongTinPhim, userInfo, isReload]) // eslint-disable-line react-hooks/exhaustive-deps
    const handleChooseChair = (stt) => {
        if (userInfo) {
            dispatch(addChair(listChairs, stt));
            let ic = listChairs.danhSachGhe.findIndex(lc => lc.stt === stt)
            if (listChairs.danhSachGhe[ic].dangChon) {
                updateListChairs.danhSachVe.push({
                    maGhe: listChairs.danhSachGhe[ic].maGhe,
                    giaVe: listChairs.danhSachGhe[ic].giaVe,
                    stt: listChairs.danhSachGhe[ic].stt,
                    loaiGhe: listChairs.danhSachGhe[ic].loaiGhe
                })
            } else {
                let i = updateListChairs.danhSachVe.findIndex(ch => ch.stt === stt)
                if (i !== -1) {
                    updateListChairs.danhSachVe.splice(i, 1);
                }
            }
        } else {
            goToLogin()
        }
    }
    const goToLogin = () => {
        Swal.fire({
            title: `<span style="font-size: 25px">Vui lòng đăng nhập để có thể đặt vé</span>`,
            confirmButtonText: 'Đăng nhập',
            confirmButtonColor: '#fa5238',
            showCancelButton: true,
            cancelButtonText: 'Hủy bỏ',
        }).then((result) => {
            if (result.isConfirmed) {
                history.push('/login')
            }
        })
    }
    const handleBookTicket = () => {
        if (userInfo) {
            if (updateListChairs && updateListChairs.danhSachVe.length) {
                Swal.fire({
                    title: `
                        <span style="font-size: 20px">Vui lòng kiểm tra kỹ trước khi đặt vé!!</span>
                        <span style="font-size: 16px; font-weight: 500">Bạn đã chọn <span style="font-size: 16px; font-weight: 500; color: red"> ${updateListChairs && updateListChairs.danhSachVe.length} </span> ghế </span>
                        <span style="font-size: 16px; font-weight: 500">Số tiền phải thanh toán là <span style="font-size: 16px; font-weight: 500; color: red"> ${updateListChairs && updateListChairs.danhSachVe.length ?
                            updateListChairs.danhSachVe.reduce((total, currentValue) => {
                                return total + currentValue.giaVe
                            }, 0).toLocaleString('it-IT') :
                            0
                        } đồng </span></span>
                    `,
                    confirmButtonText: 'Đặt vé',
                    showLoaderOnConfirm: true ,
                    confirmButtonColor: '#fa5238',
                    showCancelButton: true,
                    cancelButtonText: 'Hủy bỏ',
                }).then((result) => {
                    if (result.isConfirmed) {
                        dispatch(postBookingTicket(updateListChairs));
                    }
                })
            }
        } else {
            goToLogin()
        }
    }
    return (
        <div id='booking' className={classes.root} >
            {
                !isLoading && listChairs && listChairs.thongTinPhim ?
                    <div className='main--booking' >
                        <div className='info--main'>
                            <div className='bg-main'>
                                <img alt={listChairs.thongTinPhim.hinhAnh} src={changeHttpIntoHttps(listChairs.thongTinPhim.hinhAnh)} />
                            </div>
                            <Grid className="content--info tab--child" container>
                                <Grid className='film--poster' item xs={3}>
                                    <div className="box--card" style={{ backgroundImage: `url(${changeHttpIntoHttps(listChairs.thongTinPhim.hinhAnh)}), url("../img/default-film.webp")` }}>
                                    </div>
                                </Grid>
                                <Grid className='film--info' item sx={9}>
                                    <p>
                                        <span className='title--content'>Tên phim</span>
                                        <span className='info--content'>: {listChairs.thongTinPhim.tenPhim}</span>
                                    </p>
                                    <p>
                                        <span className='title--content'>Ngày chiếu</span>
                                        <span className='info--content'>: {listChairs.thongTinPhim.ngayChieu}</span>
                                    </p>
                                    <p>
                                        <span className='title--content'>Giờ chiếu</span>
                                        <span className='info--content'>: {listChairs.thongTinPhim.gioChieu}</span>
                                    </p>
                                    <p>
                                        <span className='title--content'>Địa chỉ</span>
                                        <span className='info--content'>: {listChairs.thongTinPhim.diaChi}</span>
                                    </p>
                                    <p>
                                        <span className='title--content'>Rạp chiếu</span>
                                        <span className='info--content'>: {`${listChairs.thongTinPhim.tenRap} - ${listChairs.thongTinPhim.tenCumRap}`}</span>
                                    </p>
                                </Grid>
                            </Grid>
                        </div>
                        <div className='booking'>
                            <div className='content--booking'>
                                <img src='../img/cinema-ticket.png' alt="cinema-ticket" />
                                <h2>Đặt vé</h2>
                                <span>và tận hưởng bộ phim vui vẻ</span>
                                <Grid className='checkout' container spacing={2}>
                                    <Grid item xs={12} md={8}>
                                        <div id='chair'>
                                            <div className='screen--img'>
                                                <img src="../img/screen.png" alt="../img/screen.png" />
                                            </div>
                                            <div className='d-flex'>
                                                <div className='rows-of-seats'>
                                                    <span>1</span>
                                                    <span>2</span>
                                                    <span>3</span>
                                                    <span>4</span>
                                                    <span>5</span>
                                                    <span>6</span>
                                                    <span>7</span>
                                                    <span>8</span>
                                                    <span>9</span>
                                                    <span>10</span>
                                                </div>
                                                <div className='list__chair'>
                                                    {
                                                        listChairs.danhSachGhe && listChairs.danhSachGhe.map((ds, index) => {
                                                            return (
                                                                <span
                                                                    onClick={() => handleChooseChair(ds.stt)}
                                                                    key={index}
                                                                    className={`chair ${ds.daDat ? 'chair--choosed disable' : ds.loaiGhe === 'Vip' ? ds.dangChon ? 'chair--choosing' : 'chair--vip' : ds.dangChon ? 'chair--choosing' : 'chair--normal'}`}
                                                                ></span>
                                                            )
                                                        })
                                                    }
                                                </div>
                                            </div>
                                            <div className='note'>
                                                <span><span className='chair chair--normal'></span>Thường</span>
                                                <span><span className='chair chair--vip'></span>Vip</span>
                                                <span><span className='chair chair--choosing'></span>Đang chọn</span>
                                                <span><span className='chair chair--choosed'></span>Không có sẵn</span>
                                            </div>
                                        </div>
                                    </Grid>
                                    <Grid item xs={12} md={4}>
                                        <Paper elevation={3} id='checkout' >
                                            <TableContainer>
                                                <Table stickyHeader aria-label="sticky table" id='tb-booking'>
                                                    <TableHead>
                                                        <TableRow>
                                                            <TableCell>Loại ghế</TableCell>
                                                            <TableCell>Mã ghế</TableCell>
                                                            <TableCell>Giá vé</TableCell>
                                                            <TableCell></TableCell>
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody>
                                                        {
                                                            updateListChairs && updateListChairs.danhSachVe.length ?
                                                                updateListChairs.danhSachVe.map((ds, index) => {
                                                                    return (
                                                                        <TableRow key={index}>
                                                                            <TableCell>{ds.loaiGhe === 'Vip' ? 'Vip' : 'Thường'}</TableCell>
                                                                            <TableCell>{ds.stt}</TableCell>
                                                                            <TableCell>{ds.giaVe.toLocaleString('it-IT')}</TableCell>
                                                                            <TableCell>
                                                                                <span onClick={() => handleChooseChair(ds.stt)} className='delete'>
                                                                                    <DeleteIcon />
                                                                                </span>
                                                                            </TableCell>
                                                                        </TableRow>
                                                                    )
                                                                }) :
                                                                <TableRow>
                                                                    <TableCell style={{ textAlign: 'center' }} colSpan={4}>Bạn chưa chọn ghế</TableCell>
                                                                </TableRow>
                                                        }
                                                    </TableBody>
                                                    <TableFooter>
                                                        <TableRow className='total'>
                                                            <TableCell><span>Thành tiền:</span></TableCell>
                                                            <TableCell ><span>{
                                                                updateListChairs && updateListChairs.danhSachVe.length ?
                                                                    updateListChairs.danhSachVe.reduce((total, currentValue) => {
                                                                        return total + currentValue.giaVe
                                                                    }, 0).toLocaleString('it-IT') :
                                                                    0
                                                            }</span></TableCell>
                                                            <TableCell><button onClick={handleBookTicket} className='btn btn--booking'> Đặt vé</button></TableCell>
                                                        </TableRow>
                                                    </TableFooter>
                                                </Table>
                                            </TableContainer>
                                        </Paper>
                                    </Grid>
                                </Grid>
                            </div>
                        </div>
                    </div>
                    :
                    <div className="loading--component"><ReactLoading type={"bars"} color={"#fb4226"} /></div>
            }
            <Prompt
                when={updateListChairs && updateListChairs.danhSachVe.length > 0}
                message={
                    `Có ghế đang được chọn. Bạn muốn rời khỏi?`
                } />
        </div>
    )
}
