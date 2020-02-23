import React, { Component } from 'react'
import { Button, Navbar, Nav, NavbarBrand, NavbarToggler, Collapse, NavItem, NavLink } from 'reactstrap'
import { withRouter } from 'react-router-dom'
import logo from "../Images/mylogo.png";


class Navigation extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isOpen: false
        }
    }

    handleLogout = (e) => {
        e.preventDefault();
        localStorage.removeItem('token');
        this.props.history.push('/')
    }
    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        })
    }
    render() {
        return (
            <Navbar color='dark' dark expand='md'>
                <NavbarBrand>
                    <img src={logo} clasName="logo" alt="logo" height="75px" width="75px">
                    </img>
                </NavbarBrand>
                <NavbarBrand href='/dashboard'>BookMyAppoinment</NavbarBrand>
                <NavbarToggler onClick={this.toggle} />
                <Collapse isOpen={this.state.isOpen} navbar>
                    <Nav className='mr-auto' navbar>
                        <NavItem>
                            <NavLink href='/dashboard'>Dashboard</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href='/viewCounsolers'>Counselors</NavLink>
                        </NavItem>
                        <NavItem>
                            <Button color='warning' onClick={this.handleLogout}> Logout</Button>
                        </NavItem>
                    </Nav>
                </Collapse>
            </Navbar>
        )
    }
}

export default withRouter(Navigation)

