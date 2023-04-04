import Companies from "../Components/Companies"
import Hours from "../Components/Hours"
import Reports from "../Components/Reports"
import Settings from "../Components/Settings"
import "../Styles/Dashboard.scss"

function Dashboard({ activeDashboard }){
    const components = [
        {id: "Companies", component:<Companies />}, 
        {id: "Hours", component: <Hours />},
        {id: "Reports", component: <Reports />}, 
        {id: "Settings", component: <Settings />}
    ]

    return(
        <>
            <h1 className="dashboard-title">{components[activeDashboard].id}</h1>
            <main>
                {components[activeDashboard].component}
            </main>
        </>
    )
}

export default Dashboard;