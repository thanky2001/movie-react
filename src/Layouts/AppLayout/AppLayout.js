import React, { Component } from 'react';
import Footer from '../../components/App/Footer/Footer';
import Header from '../../components/App/Header/Header';
import ModalUserInfo from '../../pages/User/ModalUserInfo';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';


export const scrollToTarget = (id) => {
    if (id) {
        setTimeout(() =>{
            document.querySelector(id).scrollIntoView() 
           }, 500);
    }
}
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
            scrollToTarget(0)
        }
    }
    render() {
        return (
            <>
                <Header showModalUserInfo={this.showModalUserInfo} />
                {this.props.children}
                <Footer/>
                <ModalUserInfo handleClose={this.closeModaleUserInfo} showModalUserInfo={this.showModalUserInfo} open={this.state.isOpen}/>
                
            </>
        )
    }
}
export default connect(null)(withRouter(AppLayout))