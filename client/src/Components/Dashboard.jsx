import Companies from "../Components/Companies"
import Hours from "../Components/Hours"
import Reports from "../Components/Reports"
import Settings from "../Components/Settings"
import "../Styles/Dashboard.scss"

function Dashboard({ dash }){
    const components = [
        {id: "Companies", component:<Companies />}, 
        {id: "Hours", component: <Hours />},
        {id: "Reports", component: <Reports />}, 
        {id: "Settings", component: <Settings />}
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