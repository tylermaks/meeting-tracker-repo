import { useState } from 'react'
import ImportCSVTable from './ImportCSVTable'
import "../../Styles/Import.scss"

function ImportCSV({ setAddHoursModal }){
    const [dragActive, setDragActive] = useState(false)
    const [csvTableData, setCsvTableData] = useState('')

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

        const csv = e.dataTransfer.files[0]
        const reader = new FileReader()
        const csvData = []

        reader.readAsText(csv)
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
    }


    return(
        <section id="csv-loader" className="flex-row flex-row--center">
            {/* Will return to clean this up */}
            {
                csvTableData
                    ? <ImportCSVTable csvTableData={csvTableData} setAddHoursModal={setAddHoursModal}/>
                    : <div
                        className={ dragActive ? "import import--active" : "import"} 
                        onDrop={handleDropEvent} 
                        onDragOver={handleDragEvent} 
                        onDragLeave={handleDragEvent}
                    >
                        <h3>Select a CSV file to import</h3>
                        <span>drag and drop it here</span>
                    </div>
            } 
        </section>
    )
}

export default ImportCSV