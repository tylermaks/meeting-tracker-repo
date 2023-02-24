import "../Styles/Import.scss"

function ImportFile(){

    const dragOver = (e) => { 
        e.preventDefault();
        e.target.className = "import import--active"
    }

    const dragLeave = (e) => { 
        e.target.className = "import"
    }

    const dropHandler = async (e) => {
        e.preventDefault();
        e.target.className = "import"
        const files = e.dataTransfer.files

        console.log(files)

        // for(let i = 0; i <= files.length - 1; i++){
        //     const extension = files[i].name.split(".").pop()

        //     if (extension === "csv") {
        //         console.log("Working!")
        //     }
        // }
    }

    return(
        <section id="csv-loader" className="flex-row flex-row--center">
            <div className="import" onDrop={dropHandler} onDragOver={dragOver} onDragLeave={dragLeave}>
                    {/* <img className="icon icon--lg" src={fileIcon} alt="" /> */}
                    <h3>Select a CSV file to import</h3>
                    <span>drag and drop it here</span>
                </div>
        </section>
    )
}

export default ImportFile