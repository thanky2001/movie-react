import { Box, Grid } from '@material-ui/core';
import React from 'react';
import Slider from "react-slick";
import { makeStyles } from '@material-ui/core/styles';
import { appSlider } from '../../../../components/App/Slider/DataSlider';
const useStyles = makeStyles((theme) => ({
    root: {
        '& .grid--reponsive': {
            [theme.breakpoints.up('md')]: {
                textAlign: 'left'
            },
            [theme.breakpoints.down('sm')]: {
                textAlign: 'center'
            }
        },
        '& #slider-screen': {
            [theme.breakpoints.up('md')]: {
                padding: '1.5% 29.2% 0 29.2%'
            },
            [theme.breakpoints.down('sm')]: {
                padding: '1.4% 29.2% 0 29.2%'
            }
        },
        '& #slider-screen .slick-list':{
            [theme.breakpoints.up('md')]: {
                borderRadius: '23px'
            },
            [theme.breakpoints.down('sm')]: {
                borderRadius: '32px'
            },
            [theme.breakpoints.down('xs')]: {
                borderRadius: '20px'
            }
        },
        '& .text--left':{
            [theme.breakpoints.down('xs')]: {
                fontSize: 'x-large'
            }
        }
    }
}));
export default function HomeApp() {
    const settings = {
        dots: false,
        arrows: false,
        infinite: true,
        speed: 500,
        autoplay: true,
        autoplaySpeed: 2000,
        slidesToShow: 1,
        slidesToScroll: 1
    };
    const classes = useStyles();
    return (
        <div id="ung-dung">
            <Box component="div" className='tab--child'>
                <Grid container className={classes.root}>
                    <Grid item xs={12} md className="grid--reponsive">
                        <p className="text--left">Ứng dụng tiện lợi dành cho</p>
                        <p className="text--left">người yêu điện ảnh</p><br />
                        <p className="text--left-small">Không chỉ đặt vé, bạn còn có thể bình luận phim, chấm điểm rạp và đổi quà hấp dẫn.</p>
                        <button onClick={() => window.open('https://play.google.com/store/apps/details?id=vn.com.vng.phim123', '_blank')} className="btn--left">App miễn phí - Tải về ngay</button>
                        <p className="text--app-under">
                            {'TIX có hai phiên bản '}
                            <a href="https://itunes.apple.com/us/app/123phim-mua-ve-lien-tay-chon/id615186197?mt=8" rel="noreferrer" target="_blank">IOS</a>
                            {' & '}
                            <a href="https://play.google.com/store/apps/details?id=vn.com.vng.phim123" rel="noreferrer" target="_blank">Android</a>
                        </p>
                    </Grid>
                    <Grid item xs={12} md className='app--right'>
                        <img className="img--phone" src="../img/mobile.png" alt="mobile" />
                        <div id='slider-screen'>
                            <Slider {...settings}>
                                {appSlider.map((img, index) => {
                                    return (
                                        <img key={index} src={img.img} alt={img.al} />
                                    )
                                })}
                            </Slider>
                        </div>
                    </Grid>
                </Grid>
            </Box>
        </div>
    )
}
