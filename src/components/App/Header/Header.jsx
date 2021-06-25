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

export default class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            isShowDrop: false,
        }
    }
    showSideBar=(a)=>{
        this.setState({ isOpen: !this.state.isOpen })
    }
    render() {
        return (
            <div>
                <Menu right isOpen={this.state.isOpen} onClose={this.showSideBar}>
                    <Nav className="mr-auto" navbar>
                        <div id='account' className="img-circle">
                            <Link className="nav-link" to="/login">
                                <img src="img/avatar.png" alt="user" />
                                Đăng nhập
                            </Link>
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
                        <Dropdown isOpen={this.state.isShowDrop} toggle={() => { this.setState({ isShowDrop: !this.state.isShowDrop }) }}>
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
                                <DropdownItem >Another Action1</DropdownItem>
                                <DropdownItem >Another Action</DropdownItem>
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
                </Menu>
                <Navbar id="header" light expand="md">
                    <Link to="/"> <img height="50" src="img/web-logo.png" /></Link>
                    <NavbarToggler onClick={() => { this.setState({ isOpen: !this.state.isOpen }) }} />
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
                            <div id='account' className="img-circle">
                                <Link className="nav-link" to="/login">
                                    <img src="img/avatar.png" alt="user" />
                                    Đăng nhập
                                </Link>
                            </div>
                            <Dropdown className="border--left" isOpen={this.state.isShowDrop} toggle={() => { this.setState({ isShowDrop: !this.state.isShowDrop})}}>
                                <DropdownToggle className="location--header" caret>
                                    <img width={16} height={16} src="img/location-header.png"/>
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
                                    <DropdownItem >Another Action</DropdownItem>
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
