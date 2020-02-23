import React, { Component } from 'react'
import Axios from 'axios'
import { Alert } from 'reactstrap';
import FileUploadButton from './FileUploadButton'
import Navigation from './Navigation';
import Footer from './Footer';
import { Link } from 'react-router-dom'
export default class MyCounselorProfile extends Component {
    constructor(props) {
        super(props)

        this.state = {
            visible1: false,
            counselors: [],
            user: {},
            config: {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
            },
            counselorId: ''
        }
    }
    componentDidMount() {
        Axios.get('http://localhost:5000/counselors/myCounsolerProfile', this.state.config)
            .then((response) => {
                console.log(response.data)
                this.setState({
                    counselors: response.data
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
    deleteCounselor = (counselorId) => {

        Axios.delete(`http://localhost:5000/counselors/${counselorId}`, this.state.config)
            .then((response) => {
                const filteredcounselor = this.state.counselors.filter((counselor) => {
                    return counselor._id !== counselorId
                })
                this.setState({
                    visible1: true,
                    counselor: filteredcounselor
                })
            }).catch((err) => console.log(err.response));
        this.props.history.push('/dashboard');
    }

    render() {
        return (
            <div>
                <Navigation></Navigation>
                <div >
                    <h2 className='text-center'>My Counsoler Profile</h2>
                    <Alert color="danger" isOpen={this.state.visible1} toggle={this.toogle.bind(this)}>You have deactived your account.</Alert>
                    {
                        this.state.counselors.map(counselor => {
                            return (<div id="counsoler" key={counselor._id}>

                                <img className='img-thumbnail counselor'
                                    width='200px' src={`http://localhost:5000/uploads/${counselor.image}`}
                                    alt="profile" />

                                <p>{counselor.counselorName}</p>
                                <p>{counselor.Price}</p>
                                <p>{counselor.Qualification}</p>
                                <p>{counselor.Description}</p>
                                <p>{counselor.owner.phone}</p>
                                <button type="button" class="btn btn-danger" onClick={() => this.deleteCounselor(counselor._id)}>Deactivate Profile</button>
                                {/* <br /><br />
                                <Link to={`/editmyCounselorProfile/${counselor._id}`}><button type="button" class="btn btn-primary" >Edit counselor profile</button>
                                </Link> */}

                            </div>)
                        })
                    }
                </div>
                <Footer></Footer>
            </div>
        )
    }
}
