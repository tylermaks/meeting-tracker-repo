import UserDropdown from "./UserDropdown";

function HomeNav(){
    return(
        <div className="flex-row flex-row--space">
            <h2>Logo</h2>
            <UserDropdown />
        </div>
    )
}

export default HomeNav;