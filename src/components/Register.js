import React, { Component } from 'react'
import { Button, Form, FormGroup, Label, Input, Container, FormText } from 'reactstrap'
import { Link, Redirect } from 'react-router-dom'
import axios from 'axios'

export default class Register extends Component {

    constructor(props) {
        super(props)

        this.state = {
            firstName: '',
            phone: '',
            email: '',
            username: '',
            password: '',
            isRegistered: false
        }
    }


    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    register = (e) => {
        e.preventDefault();
        console.log(this.state);

        axios.post('http://localhost:5000/users/register', this.state)
            .then((response) => {
                console.log(response.data);
                localStorage.setItem('token', response.data.token)
                this.setState({
                    username: '',
                    phone: '',
                    address: '',
                    password: '',
                    isRegistered: true
                });

            }).catch((err) => console.log(err))
    }


    render() {
        if (this.state.isRegistered === true) {
            return <Redirect to='/dashboard' />
        }
        return (
            <Container>
                <div id='signupform'>
                    <h2>Sign Up</h2>
                    <Form>
                        <FormGroup>
                            <Label for='username'>User Name</Label>
                            <Input type='text' name='username' id='username'
                                value={this.state.username} onChange={this.handleChange} />
                        </FormGroup>
                        <FormGroup>
                            <Label for='phone'>Phone Number</Label>
                            <Input type='text' name='phone' id='phone'
                                value={this.state.phone} onChange={this.handleChange} />
                        </FormGroup>
                        <FormGroup>
                            <Label for='address'>Adress</Label>
                            <Input type='text' name='address' id='address'
                                value={this.state.address} onChange={this.handleChange} />
                        </FormGroup>
                        <FormGroup>
                            <Label for='password'>Password</Label>
                            <Input type='password' name='password' id='password'
                                value={this.state.password} onChange={this.handleChange} />
                        </FormGroup>
                        <Button color='primary' onClick={this.register}>Sign Up</Button>
                        <FormText>Already a user? <Link to='/'> Login here!</Link></FormText>
                    </Form>
                </div>

            </Container>
        )
    }
}
