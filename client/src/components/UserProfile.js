import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import profileIcon from '../assets/profileIcon.png';
import { Form , Button } from 'semantic-ui-react';

function UserProfile({currentUser, onDeleteUser, onEditUserProfile }) {

    const [editFormIsOpen, setEditFormIsOpen] = useState(false)
    const [profilePhoto, setProfilePhoto] = useState(profileIcon)
    const history = useHistory();

    const initialFormValues = {
        first_name: currentUser.first_name,
        last_name: currentUser.last_name,
        email: currentUser.email,
        username: currentUser.username,
        password: currentUser.password,
    }
    const [formData, setFormData] = useState(initialFormValues)

    console.log(currentUser.first_name)


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
        let user_id = currentUser.id

        if (user_id) {
            await fetch(`users/${user_id}`,
            { method: 'DELETE'});
            await onDeleteUser(user_id).then(() => {
            alert("Your account has been deactivated")
            history.push("/signup")
            window.location.reload();
        });
    }
        if(!currentUser) {history.push("/login")}
    }

    const editForm = (
        <form className='edit-profile-form' onSubmit={handleEditFormSubmit}>
            <input type="text" placeholder="first name" name="first_name" value={first_name} onChange={handleFormData}/>
            <br />
            <input type="text" placeholder="last name" name="last_name" value={last_name} onChange={handleFormData}/>
            <br />
            <input type='email' placeholder="email" name="email" value={email} onChange={handleFormData}/>
            <br />
            <input type='username' placeholder="user name" name="username" value={username} onChange={handleFormData}/>
            <br />
            <input required type='password' placeholder="password" name="password" value={password} onChange={handleFormData}/>
            <br />
            <input type="file" accept='image/*' name="photo" id="profilePhotoInput" />
            <br/>
            <Button secondary type="button" className="cancel-button" onClick={() => setEditFormIsOpen(false)}>Cancel</Button>
            <Button primary type="submit">Save</Button>
        </form>
    )

    const editButton = <Button secondary onClick={()=> setEditFormIsOpen(true)}>Edit</Button>

    const deleteButton = <Button negative onClick={deleteAccount}>Deactivate</Button>

    const displayForm = (
        <div class="ui centered grid">
            <div class="eight wide column">
            <div class="ui segment" align="center">
                <div className="profile-info">
                    <div className="profile-photo" role="button" title="Click to edit photo">
                        <img src={profileIcon} alt="profile" />
                    </div>
                    <p className="name">Name: {first_name} {last_name}</p>
                    <p className="email">Email: {email}</p>
                    <p className="username">Username: {username}</p>
                    {editButton}{deleteButton}
                </div>
            </div>
            </div>
        </div>
    )

    const {id} = currentUser

   

return (
           <>
           <h1>User Profile</h1>
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
