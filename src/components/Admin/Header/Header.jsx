import React, { useEffect, useState } from 'react';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles } from '@material-ui/core/styles';
import { Hidden, Typography } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentUser } from '../../../actions/user';
import { logOut } from '../../../actions/auth';

const useStyles = makeStyles((theme) => ({
    appBar: {
        [theme.breakpoints.up('sm')]: {
            width: '100%',
            '& .MuiToolbar-root': {
                justifyContent: 'space-between'
            },
        },
        [theme.breakpoints.down('xs')]: {
            '& .MuiTypography-h6': {
                width: '100%',
                textAlign: 'center'
            }
        },
        '& .MuiToolbar-regular': {
            height: '60px',
            minHeight: 'unset'
        },
        '& #account': {
            position: 'relative'
        },
        '& .user-setting': {
            color: 'rgba(0, 0, 0, 0.87)',
            background: '#fff',
            border: '1px solid #e1dedee6',
            boxShadow: '0 0 15px rgba(0, 0, 0, .3)'
        },
        '& .user-setting p:hover': {
            background: 'rgba(0, 0, 0, 0.04)',
        }
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    }
}));
export default function Header(props) {
    const classes = useStyles();
    const [isShowSetting, setIsShowSetting] = useState(false);
    const { currentUser } = useSelector(state => state.userReducer);
    const { userInfo } = useSelector(state => state.authReducer);
    const dispatch = useDispatch();
    const { handleDrawerToggle } = props;

    useEffect(() => {
        if (userInfo) {
            dispatch(getCurrentUser({ 'taiKhoan': userInfo && userInfo.taiKhoan }))
        }
    }, [userInfo]) // eslint-disable-line react-hooks/exhaustive-deps
    const handleLogOut = (e) => {
        if (e) {
            e.currentTarget.parentElement.style.display = "none"
        }
        dispatch(logOut());
    }
    const handleShowUserSetting = () => {
        setIsShowSetting(!isShowSetting)
    }
    return (
        <AppBar position="fixed" className={classes.appBar}>
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={handleDrawerToggle}
                    className={classes.menuButton}
                >
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" noWrap>
                    Booking Movie
                </Typography>
                <Hidden smUp>
                    <div onMouseOver={handleShowUserSetting} onMouseOut={handleShowUserSetting} id='account' className="img-circle" >
                        {
                            currentUser &&
                            <div className="nav-link" style={{ color: '#fff' }}>
                                <div>
                                    <img src="../img/avatar.png" alt="user" />
                                </div>
                                <div className="user-setting" style={isShowSetting ? { display: 'block' } : { display: 'none' }}>
                                    <p>{currentUser.hoTen === '' ? currentUser.taiKhoan : currentUser.hoTen}</p>
                                    <p onClick={handleLogOut}>Đăng xuất</p>
                                </div>
                            </div>
                        }
                    </div>
                </Hidden>
                <Hidden xsDown>
                    <div onMouseOver={handleShowUserSetting} onMouseOut={handleShowUserSetting} id='account' className="img-circle" >
                        {
                            currentUser &&
                            <div className="nav-link" style={{ color: '#fff' }}>
                                <div>
                                    <img src="../img/avatar.png" alt="user" />
                                    {currentUser.hoTen === '' ? currentUser.taiKhoan : currentUser.hoTen}
                                </div>
                                <div className="user-setting" style={isShowSetting ? { display: 'block' } : { display: 'none' }}>
                                    <p onClick={handleLogOut}>Đăng xuất</p>
                                </div>
                            </div>
                        }
                    </div>
                </Hidden>
            </Toolbar>
        </AppBar>
    )
}
