import React, { Component } from 'react'

import Axios from 'axios'
import { Container, Alert, Form, FormGroup, Input, Button, CustomInput, FormText } from 'reactstrap';
import FileUploadButton from './FileUploadButton'
import Navigation from './Navigation';
import Footer from './Footer';

export default class AddCounsoler extends Component {
    constructor(props) {
        super(props)

        this.state = {
            visible1: false,
            user: {},
            counselor: {},
            image: null,
            counselorName: null,
            Qualification: null,
            Price: null,
            Description: null,
            owner: null,
            config: {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
            },
            selectedFile: null
        }

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
    componentDidMount() {
        Axios.get('http://localhost:5000/users/me', this.state.config)
            .then((response) => {
                console.log(response.data)
                this.setState({
                    user: response.data
                })
            })
            .catch((err) => console.log(err.response));
    }

    handleFileSelect = (e) => {
        this.setState({
            selectedFile: e.target.files[0]
        })
    }
    uploadFile = (e) => {
        e.preventDefault();
        const data = new FormData()
        data.append('imageFile', this.state.selectedFile)
        Axios.post('http://localhost:5000/upload', data, this.state.config)
            .then((response) => {
                this.setState({
                    image: response.data.filename
                })
            }).catch((err) => console.log(err.response))
    }

    addCounselor = (e) => {
        e.preventDefault();

        Axios.post('http://localhost:5000/counselors',
            {
                image: this.state.image,
                counselorName: this.state.counselorName,
                Price: this.state.Price,
                Qualification: this.state.Qualification,
                owner: this.state.user._id,
                Description: this.state.Description
            }, this.state.config)
            .then((response) => {
                console.log(response.data);
                this.setState({
                    visible1: true,
                    image: '',
                    counselorName: '',
                    price: '',
                    Qualification: '',
                    Description: ''
                })
            })
            .catch((err) => console.log(err.response))
    }

    render() {
        return (
            <div>
                <Navigation />
                <h1 className="mb-3 mt-3 text-muted text-center">Add your counselor profile.</h1>
                <div class="addSong">

                    <Form>
                        <FormGroup>
                            <label for="counselorName">Name Of the Counselor</label>
                            <Input type='text' name='counselorName' id='counselorName' value={this.state.counselorName}
                                onChange={this.handleChange} required />
                        </FormGroup>
                        <FormGroup>
                            <label for="Qualification">Qualification</label>
                            <Input type='text' name='Qualification' id='Qualification' value={this.state.Qualification}
                                onChange={this.handleChange} required />
                        </FormGroup>
                        <FormGroup>
                            <label for="Price">Price</label>
                            <Input type='text' name='Price' id='Price' value={this.state.Price}
                                onChange={this.handleChange} required />
                        </FormGroup>
                        <FormGroup>
                            <label for="Description">Description</label>
                            <Input type='text' name='Description' id='Description' value={this.state.Description}
                                onChange={this.handleChange} required />
                        </FormGroup>
                        <label>Please Select Image of your counselor Profile</label>
                        <FormGroup>
                            <CustomInput type='file' id='image'
                                onChange={this.handleFileSelect} />
                            {this.state.selectedFile ? (<FileUploadButton
                                uploadFile={this.uploadFile} />) : null}
                        </FormGroup>
                        <FormGroup>
                            <Alert color="success" isOpen={this.state.visible1} toggle={this.toogle.bind(this)}>Counselor Added Successfully. </Alert>
                        </FormGroup>
                        <Button color="primary" type="submit" onClick={this.addCounselor}>Add Counselor</Button>
                    </Form>

                </div>
                <Footer />
            </div>
        )
    }
}
