import React from 'react';
import '../Admin/admin.css';
import '../App/Home/home.css';
import { Avatar, Divider, makeStyles, Tooltip } from '@material-ui/core';
import Zoom from '@material-ui/core/Zoom';
import { useSelector } from 'react-redux';

const useStyle = makeStyles((theme) => ({
    avatar: {
        width: '150px',
        height: '150px',
        margin: '0 5% 0 8%',
        [theme.breakpoints.down('xs')]: {
            margin: 'auto',
            width: '120px',
            height: '120px'
        }
    },
    divider: {
        [theme.breakpoints.down('xs')]: {
            margin: '20px',
        }
    },
}))
export default function UserInformation() {
    const classes = useStyle();
    const { currentUser } = useSelector(state => state.userReducer);
    return (
        currentUser &&
        <div className="info">
            <Avatar className={classes.avatar} alt='avatar' src="../img/avatar.png" />
            <Divider className={classes.divider} />
            <div className='info__admin--content '>
                <p>
                    <span className='title--content'>Tài khoản</span>
                    <Tooltip TransitionComponent={Zoom} placement="bottom-start" title={currentUser.taiKhoan}>
                        <span className='info--content'>: {currentUser.taiKhoan}</span>
                    </Tooltip>
                </p>
                <p>
                    <span className='title--content'>Họ và tên</span>
                    <Tooltip TransitionComponent={Zoom} placement="bottom-start" title={currentUser.hoTen}>
                        <span className='info--content'>: {currentUser.hoTen}</span>
                    </Tooltip>
                </p>
                <p>
                    <span className='title--content'>Số điện thoại</span>
                    <Tooltip TransitionComponent={Zoom} placement="bottom-start" title={currentUser.soDT}>
                        <span className='info--content'>: {currentUser.soDT}</span>
                    </Tooltip>
                </p>
                <p>
                    <span className='title--content'>Email</span>
                    <Tooltip TransitionComponent={Zoom} placement="bottom-start" title={currentUser.email}>
                        <span className='info--content'>: {currentUser.email}</span>
                    </Tooltip>

                </p>
            </div>
        </div>
    )
}
