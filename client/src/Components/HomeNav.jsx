import UserDropdown from "./UserDropdown";

function HomeNav({ userName }){
    return(
        <div id="home-nav" className="flex-row flex-row--space">
            <h2>Logo</h2>
            <UserDropdown 
                userName={userName}
            />
        </div>
    )
}

export default HomeNav;