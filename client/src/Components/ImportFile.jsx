import { useState } from 'react'
import HoursTable from './HoursTable'
import "../Styles/Import.scss"

function ImportFile({ setModal }){
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

        reader.readAsText(csv)
        reader.onload = function() {
            const dataset = reader.result
            const cleanedData = dataset.replace(RegExp(/,\s/g), " ").replace(RegExp(/"/g), "")
            const result = cleanedData.split('\r')

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

            setData(csvData)
        }
    }


    return(
        <section id="csv-loader" className="flex-row flex-row--center">
            {/* Will return to clean this up */}
            {
                data 
                    ? <HoursTable data={data} setModal={setModal}/>
                    : <div
                        className={ dragActive ? "import import--active" : "import"} 
                        onDrop={dropHandler} 
                        onDragOver={handleDrag} 
                        onDragLeave={handleDrag}
                    >
                        <h3>Select a CSV file to import</h3>
                        <span>drag and drop it here</span>
                    </div>
            } 
        </section>
    )
}

export default ImportFile