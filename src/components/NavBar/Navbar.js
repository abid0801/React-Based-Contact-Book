import React from 'react'
import { Link } from "react-router-dom"
import "./Navbar.css"

const Navbar = () => {
    return (
        <div className= "topBar">
            <h3 style={{'margin-right': '50px'}}>Home</h3>
            <h3>Contact List</h3>

        </div>
    )
}

export default Navbar
