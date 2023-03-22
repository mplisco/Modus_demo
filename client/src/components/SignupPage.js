import { useEffect, useState } from "react";
import { Redirect, Route, useHistory } from "react-router-dom";
import { Form , Button } from 'semantic-ui-react'

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
            } else {
                res.json().then((errorData)=> alert(errorData.errors))
                }
        })
    }

    return (
    <>
      <h1>Create an Account</h1>
      <div class="ui centered grid">
      <div class="eight wide column">
          <div class="ui segment">
            <Form>
                <Form.Field>
                    <label>First Name: </label>
                    <input placeholder="First Name" type="text" name="first-name" value={first_name}
                    onChange={ (e) => setFirstName(e.target.value)}/>
                </Form.Field>
                <Form.Field>
                    <label>Last Name: </label>
                    <input placeholder="Last Name" type="text" name="last-name" value={last_name}
                    onChange={ (e) => setLastName(e.target.value)}/>
                </Form.Field>
                <Form.Field>
                    <label>Email: </label>
                    <input placeholder="Email Address" type="text" name="email" value={email}
                    onChange={ (e) => setEmail(e.target.value)}/>
                </Form.Field>
                <Form.Field>
                    <label>Username: </label>
                    <input placeholder="Username" value={username}
                    onChange={ (e) => setUsername(e.target.value)}/>
                </Form.Field>
                <Form.Field>
                    <label>Password: </label>
                    <input placeholder="Password" type="password" name="password" value={password}
                    onChange={ (e) => setPassword(e.target.value)}/>
                </Form.Field>
                <Button primary type="submit" onClick={handleSignUp}>Submit</Button>
            </Form>
        </div>
        </div>
    </div>
    </>
    )
}

export default SignUpPage;