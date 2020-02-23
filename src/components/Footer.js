import React, { Component } from 'react'

export default class Footer extends Component {
    render() {
        return (
            <div id='footernav'>
                <footer class="page-footer font-small teal pt-4">
                    <div class="container-fluid text-center text-md-left">
                        <div class="row">
                            <div class="col-md-6 mt-md-0 mt-3">
                                <h5 class="text-uppercase font-weight-bold">BookMyAppoinment</h5>
                                <p>Includes the facilities like booking an appointment with the counselor</p>

                            </div>

                            <div class="col-md-6 mb-md-0 mb-3">
                                <h5 class="text-uppercase font-weight-bold">Footer text 2</h5>
                                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Optio deserunt fuga perferendis modi earum
                                  commodi aperiam temporibus quod nulla nesciunt aliquid debitis ullam omnis quos ipsam, aspernatur id
                                        excepturi hic.</p>
                            </div>
                        </div>

                    </div>
                    <div class="footer-copyright text-center py-3">© 2020 Copyright:
  <a href="https://mdbootstrap.com/education/bootstrap/"> BookMyAppoinment.com</a>
                    </div>

                </footer>
            </div>
        )
    }
}
