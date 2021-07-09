import React, { Component } from 'react';
import Footer from '../../components/App/Footer/Footer';
import Header from '../../components/App/Header/Header';
import ModalUserInfo from '../../pages/User/ModalUserInfo';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class AppLayout extends Component {
    constructor(props) {
        super(props);
        this.state={
            isOpen: false
        };
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
    // custom hash router
    componentDidMount = () => {
        if (this.props.location.state){
            this.scrollToTarget(0)
        }
    }

    scrollToTarget = (id) => {
        if (id) {
            setTimeout(() =>{
                document.querySelector(id).scrollIntoView() 
               }, 500);
        }
    }
    render() {
        return (
            <>
                <Header showModalUserInfo={this.showModalUserInfo} scrollToTarget={this.scrollToTarget}/>
                {this.props.children}
                <Footer/>
                <ModalUserInfo handleClose={this.closeModaleUserInfo} showModalUserInfo={this.showModalUserInfo} open={this.state.isOpen}/>
                
            </>
        )
    }
}
export default connect(null)(withRouter(AppLayout))