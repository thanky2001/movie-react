import React, { Component } from 'react';
import Footer from '../../components/App/Footer/Footer';
import Header from '../../components/App/Header/Header';

export default class AppLayout extends Component {
    render() {
        return (
            <>
                <Header/>
                {this.props.children}
                <Footer/>
            </>
        )
    }
}
