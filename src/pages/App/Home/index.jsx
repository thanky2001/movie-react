import React, { Component } from 'react'
import Carousel from '../../../components/App/Carousel/Carousel';
import Movies from './Movies/Movies';
import './home.css'
import HomeApp from './HomeApp/HomeApp';

export default class index extends Component {
    targetRef = React.createRef();
    render() {
        return (
            <div className="content__wrap">
                <Carousel/>
                <Movies />
                <div id="cum-rap" className="test" style={{ background: '#fff' }}></div>
                <div id="tin-tuc" className="test" style={{ background: '#23434' }}></div>
                <HomeApp/>
            </div>
        )
    }
}
