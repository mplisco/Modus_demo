// import React from "react";
// import {Link, useHistory} from 'react-router-dom'

// function Header({ currentUser }) {
//     const history = useHistory();

//     async function handleLogout() {
//         await fetch("/logout", {
//             method: "DELETE",
//             mode:"cors",
//             headers: {
//               "Content-Type": "application/json"
//             }
//         }).then(() => alert("You've been successfully logged out"))
        
//         window.location.reload()
//         return false
//     }

//     const login_option = <Menu.Item as={Link} to ="/login" className="basic-button">Login</Menu.Item>
//     const profile_option = <Menu.Item as={Link} to ="/profile" className="basic-button">Profile</Menu.Item>
//     const signup_option = <Menu.Item as={Link} to ="/signup" className="basic-button">Sign-up</Menu.Item>
//     const logout_option = <Menu.Item as={Link} onClick={handleLogout} position="right" className="basic-button">Logout</Menu.Item>
//     const newbudget_option = <Menu.Item as={Link} to ="/newbudget" className="basic-button">New Budget</Menu.Item>