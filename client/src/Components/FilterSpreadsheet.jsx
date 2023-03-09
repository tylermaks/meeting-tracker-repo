import useUser from "../hooks/useUser"
import "../Styles/FilterSpreadsheet.scss"

function FilterSpreadsheet ({ rowKey, hidden }) {
    const { user } = useUser()
    const data = user.meetingData

    return (
        <div className={`filter-dropdown flex-column ${hidden}`}>
     
            <p>Sort A - Z</p>
            <p>Sort Z - A</p>
            <p>Filter</p>
      
            <div>
                {
                    data.map( item => {
                        return(
                            <p> 
                                {item[rowKey]}
                            </p>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default FilterSpreadsheet