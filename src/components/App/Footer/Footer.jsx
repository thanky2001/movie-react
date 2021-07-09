import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import { Link } from 'react-router-dom';
import { Box } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        '& .MuiAvatar-root': {
            width: '30px',
            height: '30px',
            marginRight: '15px',
            background: '#fff'
        },
        '& .MuiGrid-root a:hover': {
            textDecoration: 'none',
        },
        '& .MuiGrid-root a .MuiAvatar-root:hover': {
            opacity: '.7'
        }
    }
}));
export default function Footer() {
    const classes = useStyles();
    return (
        <div id="footer" className={classes.root}>
            <div className="main__footer">
                <Grid container>
                    <Grid className="footer--block" item xs={4} sm>
                        <p className="title">TIX</p>
                        <Grid container>
                            <Grid item xs>
                                <Link className='agree--footer' to="/faq">FAQ</Link>
                                <Link className='agree--footer' to="/brand-guideline">Brand Guidelines</Link>
                            </Grid>
                            <Grid item xs>
                                <Link className='agree--footer' to="/thoa-thuan-su-dung">Thỏa thuận sử dụng</Link>
                                <Link className='agree--footer' to="/chinh-sach-bao-mat">Chính sách bảo mật</Link>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Box display={{ xs: 'none', md: 'block' }}>
                    <Grid className="footer--block" item sm>
                        <p className="title ">ĐỐI TÁC</p>
                        <Grid className="row--grid" container>
                            <a target="_blank" rel="noreferrer" href="http://cgv.vn"><Avatar alt="cgv" src="./img/cgv.png" /></a>
                            <a target="_blank" rel="noreferrer" href="http://bhdstar.vn"><Avatar alt="cgv" src="./img/bhd.png" /></a>
                            <a target="_blank" rel="noreferrer" href="http://galaxycine.vn"><Avatar alt="cgv" src="./img/galaxycine.png" /></a>
                            <a target="_blank" rel="noreferrer" href="http://cinestar.com.vn"><Avatar alt="cgv" src="./img/cinestar.png" /></a>
                            <a target="_blank" rel="noreferrer" href="http://lottecinemavn.com"><Avatar className='mr-0' alt="cgv" src="./img/404b8c4b80d77732e7426cdb7e24be20.png" /></a>
                        </Grid>
                        <Grid className="row--grid" container>
                            <a target="_blank" rel="noreferrer" href="http://megagscinemas.vn"><Avatar alt="cgv" src="./img/megags.png" /></a>
                            <a target="_blank" rel="noreferrer" href="http://betacinemas.vn"><Avatar alt="cgv" src="./img/bt.jpg" /></a>
                            <a target="_blank" rel="noreferrer" href="http://ddcinema.vn"><Avatar alt="cgv" src="./img/dongdacinema.png" /></a>
                            <a target="_blank" rel="noreferrer" href="http://touchcinema.com"><Avatar alt="cgv" src="./img/TOUCH.png" /></a>
                            <a target="_blank" rel="noreferrer" href="http://cinemaxvn.com"><Avatar className='mr-0' alt="cgv" src="./img/cnx.jpg" /></a>
                        </Grid>
                        <Grid className="row--grid" container>
                            <a target="_blank" rel="noreferrer" href="http://starlight.vn"><Avatar alt="cgv" src="./img/STARLIGHT.png" /></a>
                            <a target="_blank" rel="noreferrer" href="https://www.dcine.vn"><Avatar alt="cgv" src="./img/dcine.png" /></a>
                            <a target="_blank" rel="noreferrer" href="https://zalopay.vn"><Avatar alt="cgv" src="./img/zalopay_icon.png" /></a>
                            <a target="_blank" rel="noreferrer" href="https://www.payoo.vn"><Avatar alt="cgv" src="./img/payoo.jpg" /></a>
                            <a target="_blank" rel="noreferrer" href="https://www.vietcombank.com.vn"><Avatar className='mr-0' alt="cgv" src="./img/VCB.png" /></a>
                        </Grid>
                        <Grid container>
                            <a target="_blank" rel="noreferrer" href="https://www.agribank.com.vn"><Avatar alt="cgv" src="./img/AGRIBANK.png" /></a>
                            <a target="_blank" rel="noreferrer" href="https://www.vietinbank.vn"><Avatar alt="cgv" src="./img/VIETTINBANK.png" /></a>
                            <a target="_blank" rel="noreferrer" href="https://www.indovinabank.com.vn/"><Avatar alt="cgv" src="./img/IVB.png" /></a>
                            <a target="_blank" rel="noreferrer" href="http://123go.vn"><Avatar alt="cgv" src="./img/123go.png" /></a>
                            <a target="_blank" rel="noreferrer" href="https://laban.vn"><Avatar className='mr-0' alt="cgv" src="./img/laban.png" /></a>
                        </Grid>
                    </Grid>
                    </Box>
                    <Grid className="footer--block" item xs={8} sm>
                        <Grid container >
                            <Grid item xs>
                                <p className="title footer--item">MOBILE APP</p>
                                <Grid container className='footer--item'>
                                    <a target="_blank" rel="noreferrer" href="https://apps.apple.com/vn/app/tix-%C4%91%E1%BA%B7t-v%C3%A9-nhanh-nh%E1%BA%A5t/id615186197"><img className='icon--app' alt="apple" src="./img/apple-logo.png" /></a>
                                    <a target="_blank" rel="noreferrer" href="https://play.google.com/store/apps/details?id=vn.com.vng.phim123"><img className='icon--app' alt="android" src="./img/android-logo.png" /></a>
                                </Grid>
                            </Grid>
                            <Grid item xs>
                                <p className="title footer--item">SOCIAL</p>
                                <Grid container className='footer--item'>
                                    <a target="_blank" rel="noreferrer" href="https://www.facebook.com"><img className='icon--app' alt="apple" src="./img/facebook-logo.png" /></a>
                                    <a target="_blank" rel="noreferrer" href="https://www.zalo.vn"><img className='icon--app' alt="android" src="./img/zalo-logo.png" /></a>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <hr className='hr--footer' />
                <Grid container >
                    <Grid item xs={12} md={1}  className='info--footer'>
                        <img height={40} src="./img/zion-logo.jpg" alt="zion" />
                    </Grid>
                    <Grid item xs={12} md={9} className='info--footer'>
                        <span>TIX – SẢN PHẨM CỦA CÔNG TY CỔ PHẦN ZION</span>
                        <span>Địa chỉ: Z06 Đường số 13, Phường Tân Thuận Đông, Quận 7, Tp. Hồ Chí Minh, Việt Nam.</span>
                        <span>Giấy chứng nhận đăng ký kinh doanh số: 0101659783,<br/>
                                đăng ký thay đổi lần thứ 30, ngày 22 tháng 01 năm 2020
                                do Sở kế hoạch và đầu tư Thành phố Hồ Chí Minh cấp. </span>
                        <span>Số Điện Thoại (Hotline): 1900 545 436<br/>
                            Email: <a href="mailto:support@tix.vn">support@tix.vn</a>
                        </span>
                    </Grid>
                    <Grid item xs={12} md={2}  className='info--footer'>
                        <img height={50} src="./img/d1e6bd560daa9e20131ea8a0f62e87f8.png" alt="bocongthuong" />
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}
