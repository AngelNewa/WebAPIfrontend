import React, { Component } from 'react'
import Axios from 'axios'
import { Container, Alert, Form, FormGroup, Input, Button, CustomInput, FormText } from 'reactstrap';
import FileUploadButton from './FileUploadButton'
import Navigation from './Navigation';
import Footer from './Footer';

export default class EditMyCounsolerProfile extends Component {
    constructor(props) {
        super(props)

        this.state = {
            visible1: false,
            visible2: false,
            username: '',
            user: {},
            counselors: {},
            config: {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
            },
            selectedFile: null,
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
            .catch((err) => console.log(err.response));

        Axios.get('http://localhost:5000/counselors/' + (this.props.match.params.id), this.state.config)
            .then((response) => {
                console.log(response.data)
                this.setState({
                    counselors: response.data
                })
            })
            .catch((err) => console.log(err.response));
    }

    handleChange = (e) => {
        this.setState({
            counselors: { ...this.state.counselors, [e.target.name]: e.target.value }
        })
    }

    toogle() {
        this.setState({
            visible1: !this.state.visible1
        })

    }
    uploadFile = (e) => {
        e.preventDefault();
        const data = new FormData()
        data.append('imageFile', this.state.selectedFile)
        Axios.post('http://localhost:5000/upload', data, this.state.config)
            .then((response) => {
                this.setState({
                    counselors: { ...this.state.counselors, image: response.data.filename },
                    visible1: true,
                })
            }).catch((err) => console.log(err.response))
    }

    handleFileSelect = (e) => {
        this.setState({
            selectedFile: e.target.files[0]
        })
    }

    updateCounselor = (e) => {
        e.preventDefault();
        Axios.put('localhost:5000/counselors/' + (this.props.match.params.id), this.state.counselors, this.state.config)
            .then((response) => {
                console.log(response.data);
                this.setState({
                    visible2: true
                })
            })
            .catch((err) => console.log(err.response))
        // this.props.history.push('/myCounselorProfile');
    }
    render() {
        return (
            <div>
                <Navigation />
                <h1 className="mb-3 mt-3 text-muted text-center">Update your counselor profile.</h1>
                <div class="addSong">

                    <Form>
                        <FormGroup>
                            <label for="counselorName">Name Of the Counselor</label>
                            <Input type='text' name='counselorName' id='counselorName' value={this.state.counselors.counselorName}
                                onChange={this.handleChange} required />
                        </FormGroup>
                        <FormGroup>
                            <label for="Qualification">Qualification</label>
                            <Input type='text' name='Qualification' id='Qualification' value={this.state.counselors.Qualification}
                                onChange={this.handleChange} required />
                        </FormGroup>
                        <FormGroup>
                            <label for="Price">Price</label>
                            <Input type='text' name='Price' id='Price' value={this.state.counselors.Price}
                                onChange={this.handleChange} required />
                        </FormGroup>
                        <FormGroup>
                            <label for="Description">Description</label>
                            <Input type='text' name='Description' id='Description' value={this.state.counselors.Description}
                                onChange={this.handleChange} required />
                        </FormGroup>
                        <label>Please Select Image of your counselor Profile</label>
                        <FormGroup>
                            <img className='img-thumbnail'
                                width='400' src={`http://localhost:5000/uploads/${this.state.counselors.image}`}
                                alt="Property Image" />
                            <CustomInput type='file' id='image'
                                onChange={this.handleFileSelect} />
                            {this.state.selectedFile ? (<FileUploadButton
                                uploadFile={this.uploadFile} />) : null}
                        </FormGroup>
                        <FormGroup>
                            <Alert color="success" isOpen={this.state.visible1} toggle={this.toogle.bind(this)}>Counselor Updated Successfully. </Alert>
                        </FormGroup>
                        <Button color="primary" type="submit" onClick={this.updateCounselor}>Update Counselor</Button>
                    </Form>

                </div>
                <Footer />
            </div>
        )
    }
}
