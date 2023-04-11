import { useState } from 'react'
import ImportCSVTable from './ImportCSVTable'
import "../../Styles/CoachingHours/ImportCSV.scss"

function ImportCSV({ setAddHoursModal }){
    const [dragActive, setDragActive] = useState(false)
    const [csvTableData, setCsvTableData] = useState('')
    const [errorMsg, setErrorMsg] = useState('')

    const handleDragEvent = (e) => {
        e.preventDefault()
        e.stopPropagation()

        if(e.type === 'dragenter' || e.type === 'dragover'){
            setDragActive(true)
        } else if (e.type === 'dragleave') {
            setDragActive(false)
        }
    }

    const handleDropEvent = async (e) => {
        e.preventDefault()
        e.stopPropagation()
        setDragActive(false)

        const file = e.dataTransfer.files[0]

        if (file.name.split('.').pop() === 'csv') {
            const reader = new FileReader()
            const csvData = []
            reader.readAsText(file)
            reader.onload = function() {
                const dataset = reader.result
                const cleanedData = dataset.replace(RegExp(/,\s/g), " ").replace(RegExp(/"/g), "")
                const result = cleanedData.split('\r')

                //Slipt data from CSV File into row objects, and add them to the CSV Data Array -- this data is used to populate the ImportCSVTable
                result.forEach( (data, i) => {
                    let splitData = data.split(',')
                    let rowObj = {
                        company: splitData[0].replace(RegExp(/\n/g), ""),
                        date: splitData[1],
                        duration: splitData[2],
                        meetingType: splitData[3],
                        notes: splitData[4]
                    }
                    
                    if (i > 0) {
                        csvData.push(rowObj)
                    }
                })

                setCsvTableData(csvData)
            }
        } else{
            setErrorMsg("Sorry, that file type is not accepted. Please upload a CSV file.")
        }
    }


    return(
        <section id="csv-loader" className="flex-column">
            {
                csvTableData
                    ? <ImportCSVTable csvTableData={csvTableData} setAddHoursModal={setAddHoursModal}/>
                    : <div>
                        <p>{errorMsg}</p>
                        <div
                            className={ dragActive ? "import import--active flex-column flex-column--center" : "import flex-column flex-column--center"} 
                            onDrop={handleDropEvent} 
                            onDragOver={handleDragEvent} 
                            onDragLeave={handleDragEvent}
                        >
                            <h3>Select a CSV file to import</h3>
                            <span>drag and drop it here</span>
                        </div>
                    </div> 
                    
                    
                   
            } 
        </section>
    )
}

export default ImportCSV