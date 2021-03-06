import React, { Component } from 'react';
import { Link, withRouter, NavLink} from 'react-router-dom';
import { slide as Menu } from "react-burger-menu";
import {
    Nav,
    Navbar,
    NavbarToggler,
    NavItem,
    Collapse,
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from 'reactstrap';
import { connect } from 'react-redux';
import { logOut } from '../../../actions/auth';
import { getCurrentUser } from '../../../actions/user';
import { scrollToTarget } from '../../../Layouts/AppLayout/AppLayout';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            isShowDrop: false,
            isShowDropMobile: false,
            isShowSetting:false,
        }
    }
    componentDidMount(){
        if (this.props.userInfo) {
            this.props.dispatch(getCurrentUser({'taiKhoan': this.props.userInfo && this.props.userInfo.taiKhoan}))
        }
    }
    handleScroll = (id) => {
        if(scrollToTarget && id){
            scrollToTarget(id)
        }else if(!id){
            window.scrollTo(0, 0)
        }
    }
    showSideBar=(id)=>{
        this.handleScroll(id)
        this.setState({ isOpen: !this.state.isOpen })
    }
    logOut=(e)=>{
        if(e){
            e.currentTarget.parentElement.style.display = "none"
        }
        this.props.dispatch(logOut());
    }
    handleShowUserSetting=()=>{
        this.setState({
            isShowSetting: !this.state.isShowSetting
        })
    }
    render() {
        let {userInfo, showModalUserInfo, currentUser} = this.props;
        return (
            <div>
                <Menu id='menu-mobile' right isOpen={this.state.isOpen} onClose={()=>{this.setState({ isOpen: !this.state.isOpen })}}>
                    <Nav className="mr-auto" navbar>
                        <div id='account' className="img-circle">
                            {currentUser ? 
                                <div onClick={showModalUserInfo} className="nav-link">
                                    <img src="../img/avatar.png" alt="user" />
                                    {currentUser.hoTen === '' ? currentUser.taiKhoan : currentUser.hoTen} 
                                </div> :
                                <Link className="nav-link" to="/login">
                                    <img src="../img/avatar.png" alt="user" />
                                    ????ng nh???p
                                </Link>
                            }
                        </div>
                        {
                            currentUser ? 
                            <NavItem>
                                <NavLink to="/thong-tin">V?? c???a t??i</NavLink>
                            </NavItem> :
                            ''
                        }
                        <NavItem>
                            <NavLink onClick={(e)=>this.showSideBar('#lich-chieu',e)} to="/">L???ch Chi???u</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink onClick={(e)=>this.showSideBar('#cum-rap',e)} to="/">C???m r???p</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink onClick={(e)=>this.showSideBar('#tin-tuc',e)} to="/">Tin t???c</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink onClick={(e)=>this.showSideBar('#ung-dung',e)} to="/">???ng d???ng</NavLink>
                        </NavItem>
                    </Nav>
                    <Nav className="right--header" >
                        <Dropdown isOpen={this.state.isShowDropMobile} toggle={() => { this.setState({ isShowDropMobile: !this.state.isShowDropMobile }) }}>
                            <DropdownToggle className="location--header">
                                <span>H??? Ch?? Minh</span>
                            </DropdownToggle>
                            <DropdownMenu
                                modifiers={{
                                    setMaxHeight: {
                                        enabled: true,
                                        order: 890,
                                        fn: (data) => {
                                            return {
                                                ...data,
                                                styles: {
                                                    ...data.styles,
                                                    overflow: 'auto',
                                                    maxHeight: '300px',
                                                },
                                            };
                                        },
                                    },
                                }}>
                                <DropdownItem>H??? Ch?? Minh</DropdownItem>    
                            </DropdownMenu>
                        </Dropdown>
                        {userInfo ? 
                        <NavItem style={{borderRight:'unset'}}>
                            <NavLink style={{padding: '.5rem 0'}} onClick={(e)=>{this.logOut(e);this.showSideBar(0,e)}} to="/">????ng Xu???t</NavLink>
                        </NavItem> : ''}
                    </Nav>
                </Menu>
                <Navbar id="header" light expand="md">
                    <Link to="/"> <img onClick={(e)=>this.handleScroll(0,e)} height="50" src="../img/web-logo.png" alt="logo.png" /></Link>
                    <NavbarToggler onClick={()=>{this.setState({ isOpen: !this.state.isOpen })}} />
                    <Collapse className="header__menu" navbar>
                        <Nav className="mr-auto " navbar>
                            <NavItem className="">
                                <NavLink to="/"  onClick={(e)=>this.handleScroll('#lich-chieu',e)} >L???ch Chi???u</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink to="/" onClick={(e)=>this.handleScroll('#cum-rap',e)}>C???m r???p</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink to="/" onClick={(e)=>this.handleScroll('#tin-tuc',e)}>Tin t???c</NavLink>
                            </NavItem>
                            <NavItem className='pr-0'>
                                <NavLink to="/" onClick={(e)=>this.handleScroll('#ung-dung',e)}>???ng d???ng</NavLink>
                            </NavItem>
                        </Nav>
                        <Nav className="right--header">
                            <div onMouseOver={this.handleShowUserSetting} onMouseOut={this.handleShowUserSetting}  id='account' className="img-circle" >
                                {currentUser ? 
                                    <div className="nav-link" style={{color: '#9b9b9b'}}>
                                        <div>
                                            <img src="../img/avatar.png" alt="user" />
                                            {currentUser.hoTen === '' ? currentUser.taiKhoan : currentUser.hoTen}
                                        </div>
                                        <div className="user-setting" style={this.state.isShowSetting ? {display: 'block'}: {display: 'none'}}>
                                            <p onClick={showModalUserInfo}>Th??ng tin</p>
                                            <p><Link style={{color: '#fff'}} to="/thong-tin" >V?? c???a t??i</Link></p>
                                            <p onClick={this.logOut}>????ng xu???t</p>
                                        </div>
                                    </div> :
                                    <Link className="nav-link" to="/login">
                                        <img src="../img/avatar.png" alt="user" />
                                        ????ng nh???p
                                    </Link>
                                }
                            </div>
                            <Dropdown isOpen={this.state.isShowDrop} toggle={() => { this.setState({ isShowDrop: !this.state.isShowDrop})}}>
                                <DropdownToggle className="location--header" caret>
                                    <img width={16} height={16} src="../img/location-header.png" alt="location-header.png"/>
                                    <span>H??? Ch?? Minh</span>
                                </DropdownToggle>
                                <DropdownMenu
                                    container="body"
                                    modifiers={{
                                        setMaxHeight: {
                                            enabled: true,
                                            order: 890,
                                            fn: (data) => {
                                                return {
                                                    ...data,
                                                    styles: {
                                                        ...data.styles,
                                                        overflow: 'auto',
                                                        maxHeight: '300px',
                                                    },
                                                };
                                            },
                                        },
                                    }}>
                                    <DropdownItem >H??? Ch?? Minh</DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        </Nav>
                    </Collapse>
                </Navbar>
            </div>
        )
    }
}
const mapStateToProps =(state)=>{
    return{
        userInfo: state.authReducer.userInfo,
        currentUser: state.userReducer.currentUser,
    }
}
export default connect(mapStateToProps)(withRouter(Header))