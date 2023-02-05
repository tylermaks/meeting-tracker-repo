import HomeNav from "./HomeNav";
import MenuNav from "./MenuNav";
import Dashboard from "./Dashboard";

import "../Styles/Home.scss"

function Home(){
    return(
        <section id="home">
            <HomeNav />
            <MenuNav />
            <Dashboard />
        </section>
    )
}

export default Home;