import React, { Component } from 'react'
import Carousel from '../../../components/App/Carousel/Carousel';
import Movies from './Movies/Movies';
import './home.css'
import HomeApp from './HomeApp/HomeApp';
import Cinemas from './Cinemas/Cinemas';
import News from './News/News';

export default class index extends Component {
    targetRef = React.createRef();
    render() {
        return (
            <div className="content__wrap">
                <Carousel/>
                <Movies />
                <Cinemas/>
                <News/>
                <HomeApp/>
            </div>
        )
    }
}
