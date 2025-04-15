import React from "react";
import jsPDF from "jspdf";

export default function App() {
  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFont("arial");
    doc.text("فاتورة اذكى - نظام تجريبي", 20, 20, { align: "right" });
    doc.save("invoice.pdf");
  };

  return (
    <div style={{ direction: "rtl", padding: "20px", fontFamily: "Arial" }}>
      <h1>نظام إصدار الفواتير - Athka Holidays</h1>
      <button onClick={generatePDF}>توليد الفاتورة PDF</button>
    </div>
  );
}