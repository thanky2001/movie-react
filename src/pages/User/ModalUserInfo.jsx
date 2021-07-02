import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Fab, TextField } from '@material-ui/core';
import React, { useState } from 'react';
import EditIcon from '@material-ui/icons/Edit';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';

const useStyles = makeStyles(() => ({
    root: {
        '& .MuiDialog-paper': {
            margin: '0 !important',
            minWidth: '400px',
        },
        '& .MuiDialogContent-root:first-child':{
            paddingTop: '0'
        },
        '& .MuiPaper-rounded': {
            borderRadius: '0',
            boxShadow: '0 0 10px 0 rgba(0, 0, 0, .45)'
        },
        '& .MuiTypography-h6':{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        '& .MuiFab-root':{
            color: '#949494',
            border: '1px solid #949494',
            boxShadow: 'unset',
            backgroundColor: '#fff'
        },
        '& .MuiFab-root:hover':{
            backgroundColor: '#fb4226',
            border: '1px solid #fb4226',
            color: '#fff'
        },
        '& .MuiButton-contained':{
            color: '#fff !important'
        },
        '& .change__password':{
            width: '100%',
            display:'flex',
            justifyContent: 'flex-end',
            marginBottom: '0',
            cursor: 'pointer'
        },
        '& .change__password:hover':{
            color: '#fb4226'
        },
        '& .btn--orange':{
            marginTop: '0 !important'
        },
        '& .MuiDialogActions-root':{
            padding: '16px',
        }
    },
}));
export default function ModalUserInfo(props) {
    const userInfo = useSelector(state => state.authReducer.userInfo)
    const classes = useStyles();
    const [isChangeInfo, setIsChangeInfo] = useState(false);
    const [isChangePassword, setIsChangePassword] = useState(false);
    const handleChangInfo=()=>{
        setIsChangeInfo(true);
    }
    const handleCloseChange=(e)=>{
        e.preventDefault();
        setIsChangeInfo(false);
        props.handleClose();
        handleCloseChangPassword()
    }
    const handleChangPassword=()=>{
        setIsChangePassword(true);
    }
    const handleCloseChangPassword=()=>{
        setIsChangePassword(false);
    }
    return (
        <div>
            <Dialog
                className={classes.root}
                maxWidth='xs'
                open={props.open}
                onClose={!isChangeInfo && !isChangePassword ? handleCloseChange : props.showModalUserInfo}
                aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">
                    Thông tin cá nhân
                    <Fab className={isChangeInfo ? 'd-none' : 'd-block'} onClick={handleChangInfo} size="small" aria-label="edit">
                        <EditIcon />
                    </Fab>
                </DialogTitle>
                <form>
                    <DialogContent>
                        <TextField
                            disabled
                            margin="dense"
                            label="Tài khoản"
                            name='taiKhoan'
                            value={userInfo && userInfo.taiKhoan}
                            fullWidth
                        />
                        <TextField
                            disabled = {!isChangeInfo}
                            margin="dense"
                            label="Họ và Tên"
                            name='hoTen'
                            value={userInfo && userInfo.hoTen}
                            fullWidth
                        />
                        <TextField
                            disabled = {!isChangeInfo}
                            margin="dense"
                            label="Email"
                            name='email'
                            value={userInfo && userInfo.email}
                            fullWidth
                        />
                        <TextField
                            disabled = {!isChangeInfo}
                            margin="dense"
                            label="Số điện thoại"
                            name='soDT'
                            value={userInfo && userInfo.soDT}
                            fullWidth
                        />
                        <p onClick={handleChangPassword} className={`${ isChangePassword ? 'd-none' : 'd-flex' } change__password`}> Đổi mật khẩu</p>
                        <div className={isChangePassword ? 'd-block' : 'd-none'}>
                            <TextField
                                margin="dense"
                                label="Mật khẫu cũ"
                                name='soDT'
                                type='password'
                                fullWidth
                            />
                            <TextField
                                margin="dense"
                                label="Mật khẩu mới"
                                name='soDT'
                                type='password'
                                fullWidth
                            />
                            <TextField
                                margin="dense"
                                label="Nhập lại mật khẩu mới"
                                name='soDT'
                                type='password'
                                fullWidth
                            />
                        </div>
                        <p onClick={handleCloseChangPassword} className={`${ isChangePassword ? 'd-flex' : 'd-none' } change__password`}> Hủy đổi mật khẩu</p>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseChange} type='submit' variant="contained" className="btn--orange">
                            Đóng
                        </Button>
                        <Button onClick={props.handleClose} type='submit' variant="contained" className={` ${!isChangeInfo && !isChangePassword ? 'd-none' : 'd-block'} btn--orange`} >
                            Thay đổi
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </div>
    )
}
