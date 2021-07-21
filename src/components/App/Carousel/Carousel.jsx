import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Slider from "react-slick";
import HomeTools from '../HomeTools/HomeTools';
import './carousel.css'
import {bannerSlider} from '../Slider/DataSlider'
import { getEmbedId } from '../../../utils/format';
import Trailer from '../../../pages/Components/TrailerFilm/Trailer';

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
    const [isShowTrailer, setIsShowTrailer] = useState(false);
    const [embedId, setEmbedId] = useState('');
    const handleOpenTrailer=(url, e)=>{
        e.preventDefault(); 
        setIsShowTrailer(true)
        setEmbedId(getEmbedId(url))
      }
    return (
        <div className="wrapper__trailer">
            <Slider className='slide__trailer' {...settings}>
                {bannerSlider.map((banner,index)=>{
                    return (
                        <Link key={index} to="/phim" className='slide__block'>
                            <img height='100%' src={banner.img} alt={banner.alt} />
                            <div className="background__linear"></div>
                            <button onClick={(e)=>handleOpenTrailer(banner.trailer,e)} className='play__trailer show--hover'>
                                <img src="../img/play-video.png" alt="play" />
                            </button>
                        </Link>
                    )
                })}
            </Slider>
            <Trailer open={isShowTrailer} embedId={embedId} onClose={()=>{setIsShowTrailer(false)}}/>
            <HomeTools/>
        </div>
    )
}
