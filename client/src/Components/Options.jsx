import useAuth from "../hooks/useAuth"
import "../Styles/Options.scss"

function Options() {
    const { auth } = useAuth()

    return(
        <section id="options" className="dashboard flex-column gap--15">
            <h2>Account Information</h2>
            <div className="gap--2 flex-row">
                <div>
                    <label htmlFor="fName">First Name</label>
                    <input 
                        name="fName"
                        type="text" 
                        placeholder={auth.fName}
                    />
                </div>
                <div>
                    <label htmlFor="lName">Second Name</label>
                    <input
                        name="lName" 
                        type="text" 
                        placeholder={auth.lName}
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
                />
            </div>
            <div>
                <label htmlFor="current-password">Current Password</label>
                <input 
                    type="password" 
                    name="current-password" 
                    placeholder="Enter Current Password"
                />
                <p>Enter your current password to update your account settings</p>
            </div>
            <div className="flex gap--2">
                <div>
                    <label htmlFor="new-password">New Password</label>
                    <input
                        type="text"
                        name="new-password"
                        placeholder="New Password"
                    />
                    <p>Your password must contain at least 1 uppercase letter, 1 lowercase letter, and 1 digit.</p>
                </div>
                <div>
                    <label htmlFor="confirm-password">Confirm New Password</label>
                    <input
                        type="text"
                        name="confirm-password"
                        placeholder="Confirm New Password"
                    />
                    
                </div>
            </div>
           <div className="flex-row flex-row--right gap--15">
                <div className="btn-alt">Reset</div>
                <button>Save</button>
           </div>
        </section>
    )
}

export default Options;