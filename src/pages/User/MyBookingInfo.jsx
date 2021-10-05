import { Divider, Hidden, makeStyles } from '@material-ui/core';
import React, { useEffect } from 'react';
import ReactLoading from 'react-loading';
import { useDispatch, useSelector } from 'react-redux';
import '../App/Home/home.css';
import './user.css';
import UserInformation from './UserInformation';
import { getCurrentUser } from '../../actions/user';
import { formatDateToVN } from '../../utils/format';

const useStyle = makeStyles((theme) => ({
    root: {
        marginTop: '60px',
        color: '#fff',
        '& .MuiDivider-root': {
            backgroundColor: 'rgba(249, 244, 244, 0.12)'
        },
        '& .my-info': {
            paddingTop: '20px'
        },
        '& .loading--component': {
            height: 'calc(100vh - 451px)'
        },
        [theme.breakpoints.down('xs')]: {
            '& .info__admin--content': {
                padding: '0 5%',
            }
        }
    },
    divider: {
        maxWidth: '940px',
        margin: '20px 0',
    },
}))
export default function MyBookingInfo() {
    const classes = useStyle();
    const { currentUser, isReload, isLoading } = useSelector(state => state.userReducer);
    const { userInfo } = useSelector(state => state.authReducer);
    const dispatch = useDispatch();
    useEffect(() => {
        if (userInfo) {
            dispatch(getCurrentUser({ 'taiKhoan': userInfo && userInfo.taiKhoan }))
        }
    }, [isReload]) // eslint-disable-line react-hooks/exhaustive-deps
    console.log(currentUser);
    return (
        <div className={classes.root}>
            {
                !isLoading && currentUser ?
                    <div className='main--detail'>
                        <div className='my-info tab--child'>
                            <UserInformation />
                            <Divider className={classes.divider} />
                        </div>
                        <div className="transaction" >
                            {
                                currentUser.thongTinDatVe.length && currentUser.thongTinDatVe.map((ticket, index)=>{
                                    return (
                                        <div key={index} className="tab--child view-booking">
                                            <Hidden xsDown>
                                                <img src="../img/ticket.png" alt="ticket" />
                                            </Hidden>
                                            <div className='view-booking--content'>
                                                <p>
                                                    <span className='info-title'>Mã vé</span>
                                                    <span className='info-content'>: {ticket.maVe}</span>
                                                </p>
                                                <p>
                                                    <span className='info-title'>Tên phim</span>
                                                    <span className='info-content'>: {ticket.tenPhim}</span>
                                                </p>
                                                <p>
                                                    <span className='info-title'>Ngày đặt vé</span>
                                                    <span className='info-content'>: {formatDateToVN(ticket.ngayDat)}</span>
                                                </p>
                                                <p>
                                                    <span className='info-title'>Rạp chiếu</span>
                                                    <span className='info-content'>: {ticket.danhSachGhe[0].tenCumRap} - <span style={{color: '#8bc541'}}>{ticket.danhSachGhe[0].tenHeThongRap}</span></span>
                                                </p>
                                                <p>
                                                    <span className='info-title'>Mã ghế</span>
                                                    <span className='info-content'>: 
                                                    {
                                                        ticket.danhSachGhe.map((ds, ind)=>{
                                                            return <span className='d-block' key={ind}> {ds.maGhe} - Ghế số <span style={{color: '#e50914'}}>{ds.tenGhe}</span>  </span> 
                                                        })
                                                    }
                                                    </span>
                                                </p>
                                            </div>
                                            <Divider className={classes.divider} />
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div> :
                    <div className="loading--component"><ReactLoading type={"bars"} color={"#fb4226"} /></div>
            }
        </div>
    )
}
