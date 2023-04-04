import Exit from "../../Images/xmark-solid.svg"
import "../../Styles/Settings.scss"

function SettingsModal({ modal, setModal }){ 

    const handleClick = () => {
        setModal(false)
    }

    return(
        <div className={modal ? "settings-modal flex-column gap--2" : "hidden"}>
            <img 
                className="exit icon icon--md" 
                src={Exit} 
                alt="Close Modal" 
                onClick={handleClick}
            />
            <h3>Hey!&#128075;</h3>
            <p>
                I see that you're checking our the settings component. 
                Thanks for taking the time to look around. 
            </p>
            <p>
                Normally, this form would allow the user to update their first and last
                names, and reset their password. However, as this a demo this functionality
                has been limited.
            </p>
            <p>
                I've included the code in the comments in the github repository, feel free to check it out <a href="https://github.com/tylermaks/meeting-tracker-repo/blob/main/server/controllers/updateAccountController.js">here.</a>
            </p>
            <p>
                Thansk again,<br></br>
                Tyler
            </p>
        </div>
    )
}

export default SettingsModal

//