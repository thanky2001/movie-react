import React from 'react';
import { Link } from 'react-router-dom';
import Slider from "react-slick";
import HomeTools from '../HomeTools/HomeTools';
import './carousel.css'

export default function Carousel() {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        // autoplay: true,
        // autoplaySpeed: 2000,
        slidesToShow: 1,
        slidesToScroll: 1
      };
    return (
        <div className="wrapper__trailer">
            <Slider className='slide__trailer' {...settings}>
                <Link to="/phim" className='slide__block'>
                    <img height='100%' src="img/trang-ti-16194117174325.jpg" alt="trangti" />
                    <div className="background__linear"></div>
                    <button className='play__trailer show--hover'>
                        <img src="./img/play-video.png" alt="play" />
                    </button>
                </Link>
                <Link to="/phim" className='slide__block'>
                    <img height='100%' src="img/lat-mat-48h-16177782153424.png" alt="latmat" />
                    <div className="background__linear"></div>
                    <button className='play__trailer show--hover' style={{right: '63%'}}>
                        <img src="./img/play-video.png" alt="play" />
                    </button>
                </Link>
                <Link to="/phim" className='slide__block'>
                    <img height='100%' src="img\ban-tay-diet-quy-evil-expeller-16177781815781.png" alt="dietquy" />
                    <div className="background__linear"></div>
                    <button className='play__trailer show--hover' style={{right: '49%'}}>
                        <img src="./img/play-video.png" alt="play" />
                    </button>
                </Link>
            </Slider>
            <HomeTools/>
        </div>
    )
}
