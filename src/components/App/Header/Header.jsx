import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { slide as Menu } from "react-burger-menu";
import {
    Nav,
    Navbar,
    NavbarToggler,
    NavItem,
    NavLink,
    Collapse,
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from 'reactstrap';
import { connect } from 'react-redux';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            isShowDrop: false,
            isShowDropMobile: false,
        }
    }
    showSideBar=()=>{
        this.setState({ isOpen: !this.state.isOpen })
    }
    handleClickDropdown=()=>{
        this.setState({
            isShowDropMobile: !this.state.isShowDropMobile
        })
    }
    handleScroll=()=>{
        window.scrollTo(0, 0)
    }
    render() {
        let {userInfo} = this.props;
        return (
            <div>
                <Menu id='menu-mobile' right isOpen={this.state.isOpen} onClose={this.showSideBar}>
                    <Nav className="mr-auto" navbar>
                        <div id='account' className="img-circle">
                            {userInfo ? 
                                <div className="nav-link">
                                    <img onClick={this.handleScroll} src="img/avatar.png" alt="user" />
                                    {userInfo.hoTen} 
                                </div> :
                                <Link className="nav-link" to="/login">
                                    <img onClick={this.handleScroll} src="img/avatar.png" alt="user" />
                                    Đăng nhập
                                </Link>
                            }
                            
                        </div>
                        <NavItem>
                            <NavLink onClick={this.showSideBar} href="#lich-chieu">Lịch Chiếu</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink onClick={this.showSideBar} href="#cum-rap">Cụm rạp</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink onClick={this.showSideBar} href="#tin-tuc">Tin tức</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink onClick={this.showSideBar} href="#ung-dung">Ứng dụng</NavLink>
                        </NavItem>
                    </Nav>
                    <Nav className="right--header" >
                        <Dropdown isOpen={this.state.isShowDropMobile} toggle={() => { this.setState({ isShowDropMobile: !this.state.isShowDropMobile }) }}>
                            <DropdownToggle className="location--header">
                                <span>Hồ Chí Minh</span>
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
                                <DropdownItem>Another Action1</DropdownItem>
                                <DropdownItem>Another Action</DropdownItem>
                                <DropdownItem>Another Action</DropdownItem>
                                <DropdownItem>Another Action</DropdownItem>
                                <DropdownItem>Another Action</DropdownItem>
                                <DropdownItem>Another Action</DropdownItem>
                                <DropdownItem>Another Action</DropdownItem>
                                <DropdownItem>Another Action</DropdownItem>
                                <DropdownItem>Another Action</DropdownItem>
                                <DropdownItem>Another Action</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                        {userInfo ? 
                        <NavItem style={{borderRight:'unset'}}>
                            <NavLink style={{padding: '.5rem 0'}} href="#">Đăng Xuất</NavLink>
                        </NavItem> : ''}
                    </Nav>
                </Menu>
                <Navbar id="header" light expand="md">
                    <Link to="/"> <img onClick={this.handleScroll} height="50" src="img/web-logo.png" alt="logo.png" /></Link>
                    <NavbarToggler onClick={this.showSideBar} />
                    <Collapse className="header__menu" navbar>
                        <Nav className="mr-auto" navbar>
                            <NavItem>
                                <NavLink href="#lich-chieu">Lịch Chiếu</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="#cum-rap">Cụm rạp</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="#tin-tuc">Tin tức</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="#ung-dung">Ứng dụng</NavLink>
                            </NavItem>
                        </Nav>
                        <Nav className="right--header">
                            <div id='account' className="img-circle" >
                                {userInfo ? 
                                    <div className="nav-link" style={{color: '#9b9b9b'}}>
                                        <img onClick={this.handleScroll} src="img/avatar.png" alt="user" />
                                        {userInfo.hoTen} 
                                    </div> :
                                    <Link className="nav-link" to="/login">
                                        <img onClick={this.handleScroll} src="img/avatar.png" alt="user" />
                                        Đăng nhập
                                    </Link>
                                }
                            </div>
                            <Dropdown className="border--left" isOpen={this.state.isShowDrop} toggle={() => { this.setState({ isShowDrop: !this.state.isShowDrop})}}>
                                <DropdownToggle className="location--header" caret>
                                    <img width={16} height={16} src="img/location-header.png" alt="location-header.png"/>
                                    <span>Hồ Chí Minh</span>
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
                                    <DropdownItem onClick={this.handleClickDropdown}>Another Action</DropdownItem>
                                    <DropdownItem> Another Action</DropdownItem>
                                    <DropdownItem>Another Action</DropdownItem>
                                    <DropdownItem>Another Action</DropdownItem>
                                    <DropdownItem>Another Action</DropdownItem>
                                    <DropdownItem>Another Action</DropdownItem>
                                    <DropdownItem>Another Action</DropdownItem>
                                    <DropdownItem>Another Action</DropdownItem>
                                    <DropdownItem>Another Action</DropdownItem>
                                    <DropdownItem>Another Action</DropdownItem>
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
    }
}
export default connect(mapStateToProps)(Header)