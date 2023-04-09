import { useState } from 'react'
import rightChevron from '../../Images/chevron-right-solid.svg'
import leftChevron from '../../Images/chevron-left-solid.svg'
import "../../Styles/Authentication/WelcomeModal.scss"

function WelcomeModal(){ 
    const [welcomeModal, setWelcomeModal] = useState(false)

    const toggleModal = () => {
        setWelcomeModal(!welcomeModal)
    }

    return(
        <section 
            className={ welcomeModal
                ? "welcome-modal welcome-modal--active "
                : "welcome-modal"
            }
        >
            <img 
                src={welcomeModal ? leftChevron : rightChevron} 
                className="icon icon--lg" 
                onClick={toggleModal}
                alt="Toggle modal" 
            />
            <div className={welcomeModal ? "flex-column gap--1" : "hidden"}>
                <h3>
                    Hey!&#128075;
                </h3>
                <p>
                    Thanks for visiting! This app was inspired by my work at a start-up accelerator,
                    where I connected start-up ventures with investors, coaches, and mentors.

                    Tracking the interactions between these two groups was challenging, especially at the end of
                    each invoice period. This app solves this problem by providing a platform
                    for the coaches to log their meetings with their clients. 
                </p>
                <p>
                    The app is built using React, Node.js, and AirTable. The login uses Json Web Tokens 
                    to authenticate the user - so you'll need to sign in with the following credentials: 
                </p>
                <ul>
                    <li>User email: jsmith@usertest.com</li>
                    <li>Password: password1234</li>
                </ul>
                <p>
                    Have fun looking around! Thanks again! 
                </p>
                <p>
                    Tyler
                </p>
            </div>
        </section>
    )
}

export default WelcomeModal