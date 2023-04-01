import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'


function exportReportPDF(currentDate, fName, lName){
    const doc = new jsPDF()
    const currentYear = new Date().getFullYear()


    // Set Document Title
    doc.setFontSize(24)
    doc.setTextColor("#4D4D4D")
    doc.setFont("helvetica", "bold")
    doc.text(`${currentDate} ${currentYear} EIR Hour Report`, 15, 20)

    //Set Name and Billing Cycle
    doc.setFontSize(10);
    doc.text("Name: ", 15, 30 )
    doc.text("Billing Cycle Ending: ", 15, 35)

    doc.setFont("helvetica", "normal")
    doc.text(`${fName} ${lName}`, 27, 30)
    doc.text(`${currentDate} 2023`, 52, 35)

    //Set Table Titles & Coaching Table
    doc.setFontSize(16);
    doc.text("Coaching Hours", 15, 55)
    autoTable(doc, {
        html:"#coaching-table",
        margin: {top: 40},
        startY: 60,
    })
    //Set Program Table
    doc.text("Program Hours", 15, doc.previousAutoTable.finalY + 15)
    autoTable(doc, {
        html:"#program-table",
        margin: {top: 40},
        startY: doc.previousAutoTable.finalY + 20,
    })

    //Set Totals Table
    doc.text("Totals", 15, doc.previousAutoTable.finalY + 15)
    autoTable(doc, {
        html:"#total-table",
        margin: {top: 40},
        startY: doc.previousAutoTable.finalY + 20,
    })

    doc.save(`${fName + lName}-${currentDate}${currentYear}-MonthlyReport`);
}

export default exportReportPDF