import React, { Component } from 'react'
import Axios from 'axios'
import { Container, Alert, Modal, Form, FormGroup, ModalBody, ModalHeader, Input, Button, ListGroup, CustomInput, FormText } from 'reactstrap';
import FileUploadButton from './FileUploadButton'
import Navigation from './Navigation';
import Footer from './Footer';

export default class ViewAppoinments extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isActive: false,
            visible1: false,
            appoinments: [],
            user: {},
            config: {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
            },
            appoinmentId: ''
        }
    }

    componentDidMount() {
        Axios.get('http://localhost:5000/appoinments/', this.state.config)
            .then((response) => {
                console.log(response.data)
                this.setState({
                    appoinments: response.data
                })
            })
            .catch((err) => console.log(err.response));

        Axios.get('http://localhost:5000/users/me', this.state.config)
            .then((response) => {
                console.log(response.data)
                this.setState({
                    user: response.data
                })
            })
            .catch((err) => console.log(err.response));
    }

    toogle() {
        this.setState({
            visible1: !this.state.visible1
        })
    }
    deleteAppoinment = (appoinmentId) => {
        Axios.delete(`http://localhost:5000/appoinments/${appoinmentId}`, this.state.config)
            .then((response) => {

                const filteredAppoinments = this.state.appoinments.filter((appoinment) => {
                    return appoinment._id !== appoinmentId
                })
                this.setState({
                    visible1: true,
                    appoinments: filteredAppoinments
                })
            }).catch((err) => console.log(err.response));
    }


    render() {
        return (
            <div>
                <Navigation />
                <h1 className='text-center'>List of my appoinments</h1>
                <Alert color="danger" isOpen={this.state.visible1} toggle={this.toogle.bind(this)}>Appoinment had been removed.</Alert>
                <table className="table">
                    <thead className="table-light">
                        <tr>
                            <th scope="col">From</th>
                            <th scope="col">To</th>
                            <th scope="col">Time</th>
                            <th scope="col">Counselor Name</th>
                            <th scope="col">Phone Number</th>
                            <th scope="col">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.appoinments.map(appoinment => {
                                return (<tr key={appoinment._id}>
                                    <td>{appoinment.from}</td>
                                    <td>{appoinment.to}</td>
                                    <td>{appoinment.time}</td>
                                    <td>{appoinment.counselor.counselorName}</td>
                                    <td>{appoinment.counselor.Price}</td>
                                    <td><button type="button" class="btn btn-danger" onClick={() => this.deleteAppoinment(appoinment._id)}>Delete</button></td>
                                </tr>)
                            })
                        }
                    </tbody>
                </table>
                <Footer />
            </div>
        )
    }
}
