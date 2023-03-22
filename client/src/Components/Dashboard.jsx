import Companies from "../Components/Companies"
import Hours from "../Components/Hours"
import Documents from "../Components/Documents"
import Options from "../Components/Options"
import "../Styles/Dashboard.scss"

function Dashboard({ dash }){
    const components = [
        {id: "Companies", component:<Companies />}, 
        {id: "Hours", component: <Hours />},
        {id: "Documents", component: <Documents />}, 
        {id: "Options", components: <Options />}
    ]

    return(
        <>
            <h1 className="dashboard-title">{components[dash].id}</h1>
            <main>
                {components[dash].component}
            </main>
        </>
    )
}

export default Dashboard;