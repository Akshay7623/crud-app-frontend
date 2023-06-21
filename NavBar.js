import React from 'react'
import { NavLink } from 'react-router-dom';

const NavBar = () => {
  return (
    <div>
        <div style={{display:'flex', flexDirection:'row', justifyContent:'space-around',marginTop:'20px'}}>
            <div><NavLink to='/'>Home</NavLink></div>
            <div><NavLink to='/alluser'>All User</NavLink></div>
            <div><NavLink to='/singleuser'>Single User</NavLink></div>
        </div>
    </div>
  )
}

export default NavBar