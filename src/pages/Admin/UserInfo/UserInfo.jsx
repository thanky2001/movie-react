import { Button, Hidden, makeStyles, Paper } from '@material-ui/core';
import React, { useState } from 'react';
import '../admin.css';
import '../../App/Home/home.css';
import EditIcon from '@material-ui/icons/Edit';
import ModalUserInfo from '../../User/ModalUserInfo';
import UserInformation from '../../User/UserInformation';

const useStyles = makeStyles((theme) => ({
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
    const showModalUserInfo=()=>{
        setIsShowEditUserModal(true)
    }
    const closeModaleUserInfo =()=>{
        setIsShowEditUserModal(false)
    }
    return (
        
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
                    <UserInformation/>
                </Paper >
                <ModalUserInfo handleClose={closeModaleUserInfo} open={isShowEditUserModal}/>
            </div>
            
    )
}
