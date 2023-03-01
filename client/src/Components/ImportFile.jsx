import { useState } from 'react'
// import useAxiosPrivate from "../hooks/useAxiosPrivate";
// import useAuth from "../hooks/useAuth"
import "../Styles/Import.scss"
// const CSV = '/csv'

function ImportFile(){
    // const axiosPrivate = useAxiosPrivate()
    const [dragActive, setDragActive] = useState(false)
    const [data, setData] = useState('')

    const handleDrag = (e) => {
        e.preventDefault()
        e.stopPropagation()

        if(e.type === 'dragenter' || e.type === 'dragover'){
            setDragActive(true)
        } else if (e.type === 'dragleave') {
            setDragActive(false)
        }
    }


    const dropHandler = async (e) => {
        e.preventDefault()
        e.stopPropagation()
        setDragActive(false)

        const csv = e.dataTransfer.files[0]
        const reader = new FileReader()
        const csvData = []
        const tableData = []


        reader.readAsText(csv)
       
        reader.onload = function() {
            const dataset = reader.result
            const cleanedData = dataset.replace(RegExp(/,\s/g), " ").replace(RegExp(/"/g), "")
            const result = cleanedData.split('\r')
            
            result.map( data => {
                let row = []
                row.push(data.split(','))
                csvData.push(row)

            })

            console.log(csvData)
            setData(csvData)
        }
    }


    return(
        <section id="csv-loader" className="flex-row flex-row--center">
            {/* Will return to clean this up */}
            {
                data 
                    ? <table>
                        <tr>
                            <th>Company Name</th>
                            <th>Date</th>
                            <th>Duration (Hrs)</th>
                            <th>Meeting Type</th>
                            <th>Notes</th>
                        </tr>
                    </table>
                    
                    
                    : <form 
                        className={ dragActive ? "import import--active" : "import"} 
                        onDrop={dropHandler} 
                        onDragOver={handleDrag} 
                        onDragLeave={handleDrag}
                        onSubmit={(e) => e.preventDefault()}
                    >
                        <h3>Select a CSV file to import</h3>
                        <span>drag and drop it here</span>
                    </form>
            } 
        </section>
    )
}

export default ImportFile