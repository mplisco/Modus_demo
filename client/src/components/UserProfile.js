import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import profileIcon from '../assets/profileIcon.png';
import { Form , Button } from 'semantic-ui-react';
function UserProfile({currentUser, onDeleteUser, onEditUserProfile}) {

    const [editFormIsOpen, setEditFormIsOpen] = useState(false)
    const [profilePhoto, setProfilePhoto] = useState(profileIcon)
    const history = useHistory();


    const initialFormValues = {
        first_name: currentUser.first_name,
        last_name: currentUser.last_name,
        username: currentUser.user_name,
        password: currentUser.password,
    }
    const [formData, setFormData] = useState(initialFormValues)

    console.log(currentUser.first_name)


    const { username, first_name, last_name, password } = formData

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
    const editForm = (
        <form className='edit-profile-form' onSubmit={handleEditFormSubmit}>
            <input type="text" placeholder="first name" name="first_name" value={first_name} onChange={handleFormData}/>
            <br />
            <input type="text" placeholder="last name" name="last_name" value={last_name} onChange={handleFormData}/>
            <br />
            <input required type='password' placeholder="password" name="password" value={password} onChange={handleFormData}/>
            <br />
            <button type="button" className="cancel-button" onClick={() => setEditFormIsOpen(false)}>Cancel</button>
            <Button type="submit">Save</Button>
        </form>
    )

    const editButton = <Button onClick={()=> setEditFormIsOpen(true)}>Edit</Button>


    const {id} = currentUser

    async function deleteAccount() {
        let user_id = currentUser.id

        await fetch("/logout", {
            method: "DELETE",
            mode:"cors",
            headers: {
            "Content-Type": "application/json"
            }
        })

        if (user_id) {
            fetch(`users/${user_id}`,
            { method: 'DELETE'})
            .then(() => onDeleteUser(id))
            alert("your account has been deactivated")
        }

        history.push("/signup")
        window.location.reload();
    }
        if(!currentUser) {history.push("/login")}

return (
           <>
           <h1>This is the User Profile</h1>
           <div className="max-w-max mx-auto">
                <div className='basic-box'>
                    <input type="file" accept='image/*' name="photo" id="profilePhotoInput" />
                    <label htmlFor="profilePhotoInput" className='max-w-max mx-auto'>
                        <div className="profile-photo" role="button" title="Click to edit photo">
                            <img src={profileIcon} alt="profile" />
                        </div>
                    </label>

                    <div className="profile-info">
                        <p className="name">{currentUser.full_name}</p>
                        <p className="username">@{currentUser.user_name}</p>
                        {editFormIsOpen ? editForm : editButton}
                        <button className="cancel-button" onClick={deleteAccount}> Deactivate </button>
                    </div>
                </div>
            </div>
            </>
        )
}

export default UserProfile;
