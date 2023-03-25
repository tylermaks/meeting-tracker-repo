import useAuth from "../hooks/useAuth"

function Options() {
    const { auth } = useAuth()

    return(
        <section className="dashboard">
            <h2>Account Information</h2>
            <div className="gap--4 flex-row">
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
                <label htmlFor="">Email</label>
                <input 
                    type="text" 
                    name="" 
                    id="" 
                />
            </div>
        
        </section>
    )
}

export default Options;