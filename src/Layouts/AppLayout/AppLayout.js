import React, { Component } from 'react';
import Footer from '../../components/App/Footer/Footer';
import Header from '../../components/App/Header/Header';
import ModalUserInfo from '../../pages/User/ModalUserInfo';

export default class AppLayout extends Component {
    constructor(props) {
        super(props);
        this.state={
            isOpen: false
        }
    }
    showModalUserInfo=()=>{
        this.setState({
            isOpen: true
        })
    }
    closeModaleUserInfo =()=>{
        this.setState({
            isOpen: false
        })
    }
    render() {
        return (
            <>
                <Header showModalUserInfo={this.showModalUserInfo}/>
                {this.props.children}
                <Footer/>
                <ModalUserInfo handleClose={this.closeModaleUserInfo} showModalUserInfo={this.showModalUserInfo} open={this.state.isOpen}/>
            </>
        )
    }
}
