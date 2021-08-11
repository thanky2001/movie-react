import { Avatar, Button, Divider, Hidden, makeStyles, Paper } from '@material-ui/core';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import '../admin.css';
import '../../App/Home/home.css';
import ReactLoading from 'react-loading';
import EditIcon from '@material-ui/icons/Edit';
import ModalUserInfo from '../../User/ModalUserInfo'

const useStyles = makeStyles((theme) => ({
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
            margin: '40px',
        }
    },
    button:{
        textTransform: 'unset',
        [theme.breakpoints.down('xs')]: {
            padding: 0,
            '& .MuiButton-endIcon':{
                margin: 0
            }
        }
    }
}));
export default function UserInfo() {
    const classes = useStyles();
    const [isShowEditUserModal, setIsShowEditUserModal] = useState(false);
    const { currentUser, isLoading } = useSelector(state => state.userReducer);
    const showModalUserInfo=()=>{
        setIsShowEditUserModal(true)
    }
    const closeModaleUserInfo =()=>{
        setIsShowEditUserModal(false)
    }
    return (
        !isLoading && currentUser ?
            <div id='info-admin'>
                <div className='admin--title'>
                    <span> Thông tin cá nhân </span>
                    <Button
                        onClick={showModalUserInfo}
                        className = {classes.button}
                        variant="contained"
                        color="primary"
                        endIcon={<EditIcon />}
                    >
                        <Hidden xsDown implementation="css">
                            Sửa thông tin
                        </Hidden>
                    </Button>
                </div>
                <Paper className='info__admin'>
                    <Avatar className={classes.avatar} alt='avatar' src="../img/avatar.png" />
                    <Divider className={classes.divider} />
                    <div className='info__admin--content '>
                        <p>
                            <span className='title--content'>Tài khoản</span>
                            <span className='info--content'>{currentUser.taiKhoan}</span>
                        </p>
                        <p>
                            <span className='title--content'>Họ và tên</span>
                            <span className='info--content'>{currentUser.hoTen}</span>
                        </p>
                        <p>
                            <span className='title--content'>Số điện thoại</span>
                            <span className='info--content'>{currentUser.soDT}</span>
                        </p>
                        <p>
                            <span className='title--content'>Email</span>
                            <span className='info--content'>{currentUser.email}</span>
                        </p>
                    </div>
                </Paper >
                <ModalUserInfo handleClose={closeModaleUserInfo} showModalUserInfo={showModalUserInfo} open={isShowEditUserModal}/>
            </div>
            :
            <div className="loading--component"><ReactLoading type={"bars"} color={"#fb4226"} /></div>
    )
}
