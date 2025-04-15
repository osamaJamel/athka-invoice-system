
import React from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";

export default function InvoiceFormEnglish() {
  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("ATHKA HOLIDAYS - Sales Invoice", 15, 20);
    doc.autoTable({
      head: [["Service", "Traveler", "Date", "Description", "Ref", "Amount"]],
      body: [["TICKET", "ALI", "2025-04-10", "Sanaa-Amman", "635-xxxx", "550"]],
      startY: 30
    });
    doc.save("Invoice-English.pdf");
  };

  return (
    <button onClick={generatePDF} className="bg-blue-500 text-white px-4 py-2 rounded">
      Download English Invoice
    </button>
  );
}
