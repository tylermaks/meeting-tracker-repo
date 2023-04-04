import Companies from "../CompanyComponents/Companies"
import CoachingHours from "../CoachingHourComponent/CoachingHours"
import Reports from "../ReportsComponent/Reports"
import Settings from "../SettingsComponent/Settings"
import "../../Styles/Dashboard.scss"

function Dashboard({ activeDashboard }){
    const components = [
        {id: "Companies", component:<Companies />}, 
        {id: "Coaching Hours", component: <CoachingHours />},
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