import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'


function exportReportPDF(coachingHours, coachingTotal, programHours, programTotal, currentDate, name){
    const doc = new jsPDF();

    //Add the HTML Tables to PDF
    autoTable(doc, {html:"#coaching-table"})
    autoTable(doc, {html:"#program-table"})



  doc.save(`${name}-${currentDate}2023-MonthlyReport`);
}

export default exportReportPDF