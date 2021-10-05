import PropTypes from 'prop-types';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import Header from '../../components/Admin/Header/Header';
import { useState } from 'react';
import SiderBar from '../../components/Admin/SiderBar/SiderBar';
import { useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import {ToastContainer} from 'react-toastify'
import SystemCinemas from '../../components/Admin/SiderBar/SystemCinemas';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        minWidth: '280px',
        minHeight: '100vh',
        [theme.breakpoints.down('xs')]: {
            padding: theme.spacing(2),
        }
    },
}));

export default function AdminLayout(props) {
    const classes = useStyles();
    const [mobileOpen, setMobileOpen] = useState(false);
    // const [openToast, setOpenToast] = useState(false);
    const {userInfo} = useSelector(state => state.authReducer);
    const history = useHistory();
    const location = useLocation();
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };
    if (!userInfo || (userInfo && userInfo.maLoaiNguoiDung === 'KhachHang')) {
        history.push('/login')
    }
    return (
        <>
            <div className={classes.root}>
                <CssBaseline />
                <Header handleDrawerToggle = {handleDrawerToggle} />
                {
                    location.pathname.split('/')[2] && location.pathname.split('/')[2] === 'quan-ly-lich-chieu' ?
                        <SystemCinemas mobileOpen = {mobileOpen} handleDrawerToggle = {handleDrawerToggle}/> :
                        <SiderBar mobileOpen = {mobileOpen} handleDrawerToggle = {handleDrawerToggle}/> 
                }
                <main className={classes.content}>
                    <div className={classes.toolbar} />
                    {props.children}
                </main>
            </div>
        <ToastContainer theme='colored' autoClose={3000} position="bottom-left"/>
        </>
    );
}

AdminLayout.propTypes = {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
};
