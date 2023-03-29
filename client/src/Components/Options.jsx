import { useState } from "react"
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useAuth from "../hooks/useAuth"
import SettingsModal from "./SettingsModal";
import "../Styles/Options.scss"
const SETTINGS_URL = "/settings"

function Options() {
    const { auth } = useAuth()
    const axiosPrivate = useAxiosPrivate()
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [currentPassword, setCurrentPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [modal, setModal] = useState(false)

    // Handlers for input changes
    const handleFirstNameChange = (e) => {
        setFirstName(e.target.value);
    };
    
    const handleLastNameChange = (e) => {
        setLastName(e.target.value);
    };
    
    const handleCurrentPasswordChange = (e) => {
        setCurrentPassword(e.target.value);
    };
    
    const handleNewPasswordChange = (e) => {
        setNewPassword(e.target.value);
    };
    
    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
    };

    //Reset all states to initial values 
    const handleReset = (e) => {
        console.log("working")
    }

    //Handle Submit -> POST request to update Account Info & Password
    const handleSubmit = async (e) => {
        e.preventDefault()

        try{ 
            const response = await axiosPrivate.post(
                SETTINGS_URL,
                JSON.stringify({
                    "userName": auth.userName,
                    "currentPswd": currentPassword
                }),
                {
                    headers: {'Content-Type': 'application/json'},
                    withCredentials: true
                }
            )
            
            //If post request is successful show modal
            if(response?.status === 200) {
                console.log("working!")
                setModal(true)
            }
        } catch(err) { 
            console.error(err)
        }

    }


    // firstName and lastName are used for updating account information
    // currentPassword, newPassword, and confirmPassword are used for changing the password
    return(
        <section id="options" className="dashboard flex-column gap--15">
            <SettingsModal 
                modal={modal} 
                setModal={setModal}
            />
            <h2>Account Information</h2>
            <div className="gap--2 flex-row">
                <div>
                    <label htmlFor="fName">First Name</label>
                    <input 
                        name="fName"
                        type="text" 
                        placeholder={auth.fName}
                        autoComplete="off"
                        value={firstName}
                        onChange={handleFirstNameChange}
                    />
                </div>
                <div>
                    <label htmlFor="lName">Last Name</label>
                    <input
                        name="lName" 
                        type="text" 
                        placeholder={auth.lName}
                        autoComplete="off"
                        value={lastName}
                        onChange={handleLastNameChange}
                    />
                </div>
            </div>
            <div>
                <label htmlFor="email">Email</label>
                <input 
                    disabled
                    className="not-allowed"
                    type="text" 
                    name="email" 
                    placeholder={auth.userName}
                    autoComplete="off"
                />
            </div>
            <div>
                <label htmlFor="current-password">Current Password</label>
                <input 
                    type="password" 
                    name="current-password" 
                    placeholder="Enter Current Password"
                    autoComplete="off"
                    value={currentPassword}
                    onChange={handleCurrentPasswordChange}
                    required
                />
                <p className="input-note">Enter your current password to update your account settings</p>
            </div>
            <div className="flex gap--2">
                <div>
                    <label htmlFor="new-password">New Password</label>
                    <input
                        type="text"
                        name="new-password"
                        placeholder="New Password"
                        autoComplete="off"
                        value={newPassword}
                        onChange={handleNewPasswordChange}
                    />
                    <p className="input-note">Your password must contain at least 1 uppercase letter, 1 lowercase letter, and 1 digit.</p>
                </div>
                <div>
                    <label htmlFor="confirm-password">Confirm New Password</label>
                    <input
                        type="text"
                        name="confirm-password"
                        placeholder="Confirm New Password"
                        autoComplete="off"
                        value={confirmPassword}
                        onChange={handleConfirmPasswordChange}
                    />
                </div>
            </div>
            <div className="flex-row flex-row--right gap--15">
                <button onClick={handleReset} className="btn btn--secondary">Reset</button>
                <button onClick={handleSubmit} className="btn btn--primary">Save</button>
            </div>
        </section>
    )
}

export default Options;