import React from 'react'
import { Link } from 'react-router-dom'
import "./Navbar.scss"
const Navbar = () => {
  return (
    <div className='navbar'>
      <div className="logo">
        RAAD SHOP
      </div>

      <nav className='lists'>
        <ul className="nav_lists">
            <li>
                <Link to="/">HOME</Link>
            </li>

            <li>
                <Link to="/ABOUT">ABOUT</Link>
            </li>

            <li>
                <Link to="/CAREERS">CAREERS</Link>
            </li>

            <li>
                <Link to="/PRODUCTS">PRODUCTS</Link>
            </li>
            <li>
                <Link to="/CONTACT">CONTACT</Link>
            </li>
        </ul>
      </nav>
    </div>
  )
}

export default Navbar
