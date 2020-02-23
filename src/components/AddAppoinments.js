import React, { Component } from 'react'
import Axios from 'axios'
import { Container, Alert, Form, FormGroup, Input, Button, CustomInput, FormText } from 'reactstrap';
import FileUploadButton from './FileUploadButton'
import Navigation from './Navigation';
import Footer from './Footer';

export default class AddAppoinments extends Component {
    constructor(props) {
        super(props)

        this.state = {
            visible1: false,
            user: {},
            appoinment: {},
            selectCounselors: [],
            from: null,
            to: null,
            counselor: null,
            time: null,
            counselorId: null,
            bookedBy: null,

            config: {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
            },
            selectedFile: null
        }
    }

    componentDidMount() {
        Axios.get('http://localhost:5000/users/me', this.state.config)
            .then((response) => {
                console.log(response.data)
                this.setState({
                    user: response.data
                })
            })
            .catch((err) => console.log(err.response))
        Axios.get('http://localhost:5000/counselors/', this.state.config)
            .then((response) => {
                console.log(response.data)
                this.setState({
                    selectCounselors: response.data,
                    counselorId: response.data[0]._id
                })
            })
            .catch((err) => console.log(err.response));
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    toogle() {
        this.setState({
            visible1: !this.state.visible1
        })
    }

    addAppoinments = (e) => {
        e.preventDefault();

        Axios.post('http://localhost:5000/appoinments',
            {
                from: this.state.from,
                to: this.state.to,
                time: this.state.time,
                counselor: this.state.counselor,
                bookedBy: this.state.user._id,
            }, this.state.config)
            .then((response) => {
                console.log(response.data);
                this.setState({
                    visible1: true,
                    from: '',
                    to: '',
                    time: '',
                    counselor: '',
                    bookedBy: ''
                })
            })
            .catch((err) => console.log(err.response))
    }

    render() {
        return (
            <div>
                <Navigation />
                <h1 className="mb-3 mt-3 text-muted text-center">Add your appoinments.</h1>
                <div class="addSong">

                    <Form>
                        <FormGroup>
                            <label for="startingdate">Starting from</label>
                            <Input type='text' name='from' id='from'
                                value={this.state.from}
                                onChange={this.handleChange} required />
                        </FormGroup>
                        <FormGroup>
                            <label for="to">to</label>
                            <Input type='text' name='to' id='to' value={this.state.to}
                                onChange={this.handleChange} required />
                        </FormGroup>
                        <FormGroup>
                            <label for="time">time</label>
                            <Input type='text' name='time' id='time' value={this.state.time}
                                onChange={this.handleChange} required />
                        </FormGroup>

                        {/* {
                            this.state.selectCounselors.map(conslr => {
                                return (
                                    <FormGroup>
                                        <label for="counselor">Counselor</label>
                                        <Input type="select" name="counselor" id="counselor"
                                            value={conslr._id} onChange={this.handleChange}>
                                            <option>Select counselor</option>
                                            <option>{conslr.counselorName}</option>
                                        </Input>
                                    </FormGroup>
                                )
                            })
                        } */}
                        <FormGroup>
                            <label for='counselor'>Counselor</label>
                            <Input type='select' id='counselor' name='counselor' value={this.state.counselorId} onChange={this.handleChange}>
                                {
                                    this.state.selectCounselors.map((counselor) => {
                                        return <option key={counselor._id} value={counselor._id}>{counselor.counselorName}</option>
                                    })
                                }
                            </Input>
                        </FormGroup>
                        {/* <FormGroup>
                            <label for="counselor">Counselor</label>
                            <Input type="select" name="counselor" id="counselor"
                                value={this.state.counselor._id} onChange={this.handleChange}>
                                <option>Select counselor</option>
                            </Input>
                        </FormGroup> */}

                        <FormGroup>
                            <Alert color="success" isOpen={this.state.visible1} toggle={this.toogle.bind(this)}>Appointment Added Successfully. </Alert>
                        </FormGroup>
                        <Button color="primary" type="submit" onClick={this.addAppoinments}>Add Appoinments</Button>
                    </Form>

                </div>
                <Footer />
            </div>
        )
    }
}
