import Companies from "../CompanyComponents/Companies"
import CoachingHours from "../CoachingHourComponent/CoachingHours"
import Reports from "../ReportsComponent/Reports"
import Settings from "../SettingsComponent/Settings"

function Dashboard({ activeDashboard }){
    const components = [
        {id: "Companies", component:<Companies />}, 
        {id: "Coaching Hours", component: <CoachingHours />},
        {id: "Reports", component: <Reports />}, 
        {id: "Settings", component: <Settings />}
    ]

    return(
        <>
            <h1>{components[activeDashboard].id}</h1>
            <main>
                {components[activeDashboard].component}
            </main>
        </>
    )
}

export default Dashboard;