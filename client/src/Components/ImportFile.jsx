import { useState } from 'react'
import useAxiosPrivate from "../hooks/useAxiosPrivate";
// import useAuth from "../hooks/useAuth"
import "../Styles/Import.scss"
const CSV = '/csv'

function ImportFile(){
    const axiosPrivate = useAxiosPrivate()
    const [dragActive, setDragActive] = useState(false)
    const [data, setData] = useState()

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
            const result = dataset.split('\r')
            result.map( data => {
                let row = []
                row.push(data.split(','))
                csvData.push(row)
            })
            console.log(csvData)
        }
    }


    return(
        <section id="csv-loader" className="flex-row flex-row--center">
            <form 
                className={ dragActive ? "import import--active" : "import"} 
                onDrop={dropHandler} 
                onDragOver={handleDrag} 
                onDragLeave={handleDrag}
                onSubmit={(e) => e.preventDefault()}
                encType="multipart/form-data"
            >
                {/* <img className="icon icon--lg" src={fileIcon} alt="" /> */}
                {/* <input type='file' id="fileInput" name="csvFile" /> */}
                <h3>Select a CSV file to import</h3>
                <span>drag and drop it here</span>
            </form>
        </section>
    )
}

export default ImportFile