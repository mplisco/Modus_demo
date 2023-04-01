import React from "react";
import { Menu } from "semantic-ui-react"
import {Link, useHistory} from 'react-router-dom'

import toplogo from "../assets/ModusLogo - Light.png"

function Header({ currentUser , handleLogout }) {
    const history = useHistory();

    async function handleLogoutAndFetch() {
        await fetch("/logout", {
            method: "DELETE",
            mode:"cors",
            headers: {
              "Content-Type": "application/json"
            }
        }).then(() => {
            handleLogout()
            history.push("/login")
            // alert("You've been successfully logged out");
            window.location.reload()
            ;
            }).catch(error => {
            console.error(error);
        })
    }

    const login_option = <Menu.Item as={Link} to ="/login" class="item">Login</Menu.Item>
    const profile_option = <Menu.Item as={Link} to ="/profile" class="item">Profile</Menu.Item>
    const signup_option = <Menu.Item as={Link} to ="/signup" class="item">Sign-up</Menu.Item>
    const logout_option = <Menu.Item onClick={handleLogoutAndFetch} position="right" class="item">Logout</Menu.Item>
    const newbudget_option = <Menu.Item as={Link} to ="/newbudget" class="item">New Budget</Menu.Item>
    const home_option = <Menu.Item as={Link} to ="/home" class="active item">Home</Menu.Item>
    const initiatives_option = <Menu.Item as={Link} to ="/initiatives" class="item">My Initiatives</Menu.Item>


    return (
        <div className="max-w-max mx-auto">
            <div className="basic-box">
                <img className="mx-auto border-black border-2 border-solid m-4" alt="Modus" src={toplogo} />
                <div className="border-2 border-solid border-black p-3 max-w-max mx-auto">
                    <Menu class="ui secondary pointing menu">
                        {currentUser ? home_option : null }
                        {currentUser ? initiatives_option : null}
                        {currentUser ? newbudget_option : null}
                        {currentUser ? profile_option : login_option}
                        {currentUser ? null : signup_option}
                        {currentUser ? logout_option : null}
                    </Menu>
                </div>
            </div>
        </div>
    )
}

export default Header;