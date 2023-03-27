import React, { useState , useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import profileIcon from '../assets/profileIcon.png';
import { Form , Button } from 'semantic-ui-react';
import { AppContext } from './AppContext';

function UserProfile({currentUser, onDeleteUser, onEditUserProfile }) {

    const [editFormIsOpen, setEditFormIsOpen] = useState(false)
    const [profilePhoto, setProfilePhoto] = useState(profileIcon)
    const history = useHistory();

    // const {currentContextUser } = useContext(AppContext);

    // console.log(currentContextUser)


    const initialFormValues = {
        first_name: currentUser.first_name,
        last_name: currentUser.last_name,
        email: currentUser.email,
        username: currentUser.username,
        password: currentUser.password,
    }
    const [formData, setFormData] = useState(initialFormValues)


    const { username, first_name, last_name, password , email } = formData

    const handleFormData = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    async function handleEditFormSubmit(e) {
        e.preventDefault()
        setEditFormIsOpen(false)

        const requestObj = {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        }

    await fetch(`users/${currentUser.id}`, requestObj)
            .then(response => response.json())
            .then(() => {
                onEditUserProfile(formData)
                history.push("/profile")
                window.location.reload();
            })
    }

    async function deleteAccount() {
        if (!currentUser) {
          history.push("/login");
          return;
        }
        let user_id = currentUser.id;
        await onDeleteUser(user_id);
        await fetch(`users/${user_id}`, { method: 'DELETE' });

        alert("Your account has been deactivated");
        history.push("/login");
        window.location.reload();
      }

    const editForm = (
        <div class="ui centered grid">
            <div class="eight wide column">
            <div class="ui segment">
                <Form onSubmit={handleEditFormSubmit}>
                    <Form.Field>
                        <img class="ui centered small circular image" src={profileIcon} alt="profile" />
                    </Form.Field>
                    <Form.Field>
                        <label>First Name: </label>
                        <input type="text" placeholder="First Name" name="first_name" value={first_name} onChange={handleFormData}/>
                    </Form.Field>
                    <Form.Field>
                        <label>Last Name: </label>
                        <input type="text" placeholder="Last Name" name="last_name" value={last_name} onChange={handleFormData}/>
                    </Form.Field>
                    <Form.Field>
                        <label>Email Address: </label>
                        <input type='email' placeholder="Email" name="email" value={email} onChange={handleFormData}/>
                    </Form.Field>
                    <Form.Field>
                        <label>Username: </label>
                        <input placeholder="Username" name="username" value={username} onChange={handleFormData}/>
                    </Form.Field>
                    <Form.Field>
                        <label>Password: </label>
                        <input required type='password' placeholder="password" name="password" value={password} onChange={handleFormData}/>
                    </Form.Field>
                    <Button secondary type="button" className="cancel-button" onClick={() => setEditFormIsOpen(false)}>Cancel</Button>
                    <Button primary type="submit">Save</Button>
                </Form>
            </div>
            </div>
        </div>
    )

    const editButton = <Button secondary onClick={()=> setEditFormIsOpen(true)}>Edit</Button>

    const deleteButton = <Button negative onClick={deleteAccount}>Deactivate</Button>

    const displayForm = (
        <div class="ui centered grid">
            <div class="eight wide column">
            <div class="ui segment">
                <Form>
                    <Form.Field>
                        <img class="ui centered small circular image" src={profileIcon} alt="profile" />
                    </Form.Field>
                    <Form.Field>
                        <label> Name: </label>
                        <p>{first_name} {last_name}</p>
                    </Form.Field>
                    <Form.Field>
                        <label> Email: </label>
                        <p className="email">{email}</p>
                    </Form.Field>
                    <Form.Field>
                        <label> Username: </label>
                        <p className="username">{username}</p>
                    </Form.Field>
                    {editButton}{deleteButton}
                </Form>
            </div>
            </div>
        </div>
    )

    const {id} = currentUser

    const header = "User Profile"
    const editHeader = "Edit User Profile"

return (
        <>
           <h1>{editFormIsOpen ? editHeader : header}</h1>
           <div className="max-w-max mx-auto">
                <div className='basic-box'>
                    <div className="profile-info">
                        {editFormIsOpen ? editForm : displayForm}
                    </div>
                </div>
            </div>
        </>
        )
}


export default UserProfile;
