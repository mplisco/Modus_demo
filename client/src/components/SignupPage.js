import { useEffect, useState } from "react";
import { Redirect, Route, useHistory } from "react-router-dom";

function SignUpPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const history = useHistory();

    function handleSignUp(e) {
        e.preventDefault();
        fetch("/users", {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({"username": username, "first_name": first_name, "last_name": last_name,
            "email": email, "password":password})
        })
        .then(res => {
            if(res.status === 201) {
                alert("Sign up successful, please log in")
                history.push('/login')
            }
        })
    }

    return (
        <div>
            <form>
                <div>
                    <label>Username: </label>
                    <input type="text" name="username" value={username}
                    onChange={ (e) => setUsername(e.target.value)}/>
                </div>
                <div>
                    <label>Password: </label>
                    <input type="password" name="password" value={password}
                    onChange={ (e) => setPassword(e.target.value)}/>
                </div>
                <div>
                    <label>First Name: </label>
                    <input type="text" name="first-name" value={first_name}
                    onChange={ (e) => setFirstName(e.target.value)}/>
                </div>
                <div >
                    <label>Last Name: </label>
                    <input type="text" name="last-name" value={last_name}
                    onChange={ (e) => setLastName(e.target.value)}/>
                </div>
                <div>
                    <label>Email: </label>
                    <input type="text" name="email" value={email}
                    onChange={ (e) => setEmail(e.target.value)}/>
                </div>
                <div >
                    <input type="submit" onClick={handleSignUp}/>
                </div>
            </form>
        </div>
    )
}

export default SignUpPage;