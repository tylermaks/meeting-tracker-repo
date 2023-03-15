import Companies from "../Components/Companies"
import Hours from "../Components/Hours"
import Documents from "../Components/Documents"
import Options from "../Components/Options"
import "../Styles/Dashboard.scss"

function Dashboard({ dash }){
    const components = [
        <Companies />, 
        <Hours />,
        <Documents />, 
        <Options />
    ]

    return(
        <main id="dashboard">
            {components[dash]}
        </main>
    )
}

export default Dashboard;