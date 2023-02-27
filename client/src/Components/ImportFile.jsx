import { useState } from 'react'
import useAxiosPrivate from "../hooks/useAxiosPrivate";
// import useAuth from "../hooks/useAuth"
import "../Styles/Import.scss"
const CSV = '/csv'

function ImportFile(){
    const axiosPrivate = useAxiosPrivate()
    const [dragActive, setDragActive] = useState(false)

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
        
        try{
            let csv = e.dataTransfer.files[0]
            const response = await axiosPrivate.post(
                CSV, 
                {
                    file: csv
                },
                {
                    headers:{'Content-Type': 'multipart/form-data'},
                    withCredentials: true
                }
            )
            console.log(response)
        } catch (err) {
            if (err){
                console.error(err)
                return
            }
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