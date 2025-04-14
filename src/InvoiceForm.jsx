import React, { useState } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import logo from "./athka-logo.png"; // تأكد من إضافة الشعار

export default function InvoiceForm() {
  const [invoiceNumber, setInvoiceNumber] = useState("011010");
  const [clientName, setClientName] = useState("");
  const [invoiceDate, setInvoiceDate] = useState(new Date().toISOString().split("T")[0]);
  const [branch, setBranch] = useState("");
  const [items, setItems] = useState([
    { service: "", name: "", date: "", description: "", ref: "", amount: "" },
  ]);

  const handleItemChange = (index, field, value) => {
    const updatedItems = [...items];
    updatedItems[index][field] = value;
    setItems(updatedItems);
  };

  const addItem = () => {
    setItems([...items, { service: "", name: "", date: "", description: "", ref: "", amount: "" }]);
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();

    doc.addImage(logo, "PNG", 10, 10, 30, 30);
    doc.setFontSize(14);
    doc.text("ATHKA HOLIDAYS FOR COMMERCIAL AND TRAVEL SERVICE", pageWidth / 2, 15, { align: "center" });
    doc.setFontSize(12);
    doc.text("اذكى هوليديز للخدمات التجارية والسفر", pageWidth / 2, 22, { align: "center" });

    doc.setFontSize(11);
    doc.text(`Invoice No: ${invoiceNumber}`, 14, 45);
    doc.text(`Client: ${clientName}`, 14, 52);
    doc.text(`Date: ${invoiceDate}`, 14, 59);
    doc.text(`Branch: ${branch}`, 14, 66);

    autoTable(doc, {
      startY: 75,
      head: [["Service", "Traveler Name", "Date", "Description", "Ref", "Amount"]],
      body: items.map((item) => [
        item.service,
        item.name,
        item.date,
        item.description,
        item.ref,
        item.amount,
      ]),
      styles: { fontSize: 10, cellPadding: 2 },
    });

    doc.setFontSize(10);
    doc.text("Phone: 01206166 | Email: info@athkaholidays.com", 14, doc.lastAutoTable.finalY + 10);
    doc.text("Main Branch: Algeria St. & 60th St., Sana'a", 14, doc.lastAutoTable.finalY + 16);

    doc.save(`Invoice-${invoiceNumber}.pdf`);
  };

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <h1 className="text-xl font-bold mb-4">إصدار فاتورة</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <input type="text" placeholder="Invoice Number" value={invoiceNumber} onChange={(e) => setInvoiceNumber(e.target.value)} className="p-2 border" />
        <input type="text" placeholder="Client Name" value={clientName} onChange={(e) => setClientName(e.target.value)} className="p-2 border" />
        <input type="date" value={invoiceDate} onChange={(e) => setInvoiceDate(e.target.value)} className="p-2 border" />
        <select value={branch} onChange={(e) => setBranch(e.target.value)} className="p-2 border">
          <option value="">-- اختر الفرع --</option>
          <option value="صنعاء">صنعاء</option>
          <option value="عدن">عدن</option>
          <option value="الأصبحي">الأصبحي</option>
        </select>
      </div>

      <div className="mt-6">
        <h2 className="text-lg font-semibold mb-2">الخدمات</h2>
        {items.map((item, index) => (
          <div key={index} className="grid grid-cols-6 gap-2 mb-2">
            <input placeholder="Service" value={item.service} onChange={(e) => handleItemChange(index, "service", e.target.value)} className="p-1 border" />
            <input placeholder="Traveler" value={item.name} onChange={(e) => handleItemChange(index, "name", e.target.value)} className="p-1 border" />
            <input type="date" value={item.date} onChange={(e) => handleItemChange(index, "date", e.target.value)} className="p-1 border" />
            <input placeholder="Description" value={item.description} onChange={(e) => handleItemChange(index, "description", e.target.value)} className="p-1 border" />
            <input placeholder="Ref" value={item.ref} onChange={(e) => handleItemChange(index, "ref", e.target.value)} className="p-1 border" />
            <input placeholder="Amount" value={item.amount} onChange={(e) => handleItemChange(index, "amount", e.target.value)} className="p-1 border" />
          </div>
        ))}
        <button onClick={addItem} className="mt-2 px-4 py-2 bg-gray-200 rounded">+ إضافة خدمة</button>
      </div>

      <button onClick={generatePDF} className="mt-6 px-6 py-2 bg-green-600 text-white rounded">🧾 تصدير PDF</button>
    </div>
  );
}
