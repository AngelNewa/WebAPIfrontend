import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { Container, Row } from 'reactstrap';
import Axios from 'axios';
import Navigation from './Navigation';
import Footer from './Footer';

export default class Dashboard extends Component {

    constructor(props) {
        super(props)

        this.state = {
            user: {},
            config: {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
            }
        }
    }

    handleLogout = (e) => {
        e.preventDefault();
        localStorage.removeItem('token');
        this.props.history.push('/')
    }
    render() {
        return (
            <div >
                <Navigation />
                <Container className="dashboard_btn_container">
                    <Row>
                        <Link className="col-lg-3 col-md-4 shadow p-3 mb-5 rounded bg-success text-dark mt-3 mb-3 pt-3 pb-3 controls nounderline" to="/profile" style={{ width: '22rem' }}>
                            <h4 className="text-center">Profile</h4>
                            <p className="text-center"><small>Edit my profile</small></p>
                        </Link>
                        <span className="col-lg-1 col-md-4"></span>
                        <Link className="col-lg-3 col-md-4 shadow p-3 mb-5 rounded bg-primary text-dark mt-3 mb-3 pt-3 pb-3 controls" to="/addCounselor" style={{ width: '22rem' }}>
                            <h4 className="text-center">Counselor</h4>
                            <p className="text-center"><small>Add Counselor</small></p>
                        </Link>
                        <span className="col-lg-1 col-md-4"></span>
                        <Link className="col-lg-3 col-md-4 shadow p-3 mb-5 rounded bg-warning text-dark mt-3 mb-3 pt-3 pb-3 controls" to="/myCounselorProfile" style={{ width: '22rem' }}>
                            <h4 className="text-center">Counselor</h4>
                            <p className="text-center"><small>View My Counselor Profile</small></p>
                        </Link>

                    </Row>

                    <Row >
                        <Link className="col-lg-3 col-md-4 shadow p-3 mb-5 rounded bg-primary text-dark mt-3 mb-3 pt-3 pb-3 controls"
                            to="/addAppoinments" style={{ width: '22rem' }}>
                            <h4 className="text-center">Appoinments</h4>
                            <p className="text-center"><small>Add Appoinments</small></p>
                        </Link>
                        <span className="col-lg-1 col-md-4"></span>
                        <Link className="col-lg-3 col-md-4 shadow p-3 mb-5 rounded bg-warning text-dark mt-3 mb-3 pt-3 pb-3 controls"
                            to="/myAppoinments" style={{ width: '22rem' }}>
                            <h4 className="text-center">Appoinments</h4>
                            <p className="text-center"><small>View My Appoinments</small></p>
                        </Link>
                        <span className="col-lg-1 col-md-4"></span>
                        <Link onClick={this.handleLogout} className="col-lg-3 col-md-4 shadow p-1 mb-5 rounded bg-danger text-dark mt-3 mb-3 pt-3 pb-3 controls" to="/" style={{ width: '22rem' }}>
                            <h4 className="text-center">Logout</h4>
                            <p className="text-center"><small>logout from system</small></p>
                        </Link>

                    </Row>
                </Container>
                <Footer />
            </div>
        )
    }
}
