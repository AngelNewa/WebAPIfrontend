import React, { Component } from 'react'
import Axios from 'axios'
import Navigation from './Navigation';
import Footer from './Footer';

export default class ViewCounsolers extends Component {
    constructor(props) {
        super(props)

        this.state = {
            counselors: [],
            user: {},
            config: {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
            }
        }
    }
    componentDidMount() {
        Axios.get('http://localhost:5000/counselors/', this.state.config)
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

    render() {
        return (
            <div>
                <Navigation />
                <h1 className='text-center'>List of counselors</h1>

                <table className="table">
                    <thead className="table-light">
                        <tr>
                            <th scope="col">Image</th>
                            <th scope="col">Name</th>
                            <th scope="col">Price</th>
                            <th scope="col">Qualification</th>
                            <th scope="col">Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.counselors.map(counselor => {
                                return (<tr key={counselor._id}>
                                    <th scope="row">
                                        <img className='img-thumbnail counselorImage'
                                            width='200px' src={`http://localhost:5000/uploads/${counselor.image}`}
                                            alt="profile" />
                                    </th>
                                    <td>{counselor.counselorName}</td>
                                    <td>{counselor.Price}</td>
                                    <td>{counselor.Qualification}</td>
                                    <td>{counselor.Description}</td>
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
