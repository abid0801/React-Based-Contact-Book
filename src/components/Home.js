import React from 'react'
import { Form } from 'react-bootstrap'
import {Link} from 'react-router-dom'

const Home = () => {
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-12 ">
                    <Link to="/add" className="btn btn-outline-dark">
                            Add Contact
                    </Link>
                </div>
                <div className="col-md-6 mx-auto p-5">
                    
                    <h1>
                        Welcome to Contact Book homepage
                    </h1>
                </div>

            </div>
            
        </div>
    )
}

export default Home
