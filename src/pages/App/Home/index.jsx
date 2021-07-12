import React, { Component } from 'react'
import Carousel from '../../../components/App/Carousel/Carousel';
import Movies from './Movies/Movies';
import './home.css'
import HomeApp from './HomeApp/HomeApp';
import Cinemas from './Cinemas/Cinemas';

export default class index extends Component {
    targetRef = React.createRef();
    render() {
        return (
            <div className="content__wrap">
                <Carousel/>
                <Movies />
                <Cinemas/>
                <div id="tin-tuc" className="test" style={{ background: '#23434' }}>asdasd</div>
                <HomeApp/>
            </div>
        )
    }
}
