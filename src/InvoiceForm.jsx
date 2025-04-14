import React, { useState } from "react";
import jsPDF from "jspdf";

export default function InvoiceForm() {
  const [invoiceNumber, setInvoiceNumber] = useState("011010");
  const [clientName, setClientName] = useState("");
  const [invoiceDate, setInvoiceDate] = useState(new Date().toISOString().split("T")[0]);
  const [items, setItems] = useState([{ service: "", name: "", date: "", description: "", ref: "", amount: "" }]);

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
    doc.setFontSize(12);
    doc.text("ATHKA HOLIDAYS", 10, 10);
    doc.text("Invoice Number: " + invoiceNumber, 10, 20);
    doc.text("Client: " + clientName, 10, 30);
    doc.text("Date: " + invoiceDate, 10, 40);

    let y = 50;
    doc.text("Service | Traveler Name | Date | Description | Ref | Amount", 10, y);
    y += 10;

    items.forEach((item) => {
      const row = `${item.service} | ${item.name} | ${item.date} | ${item.description} | ${item.ref} | ${item.amount}`;
      doc.text(row, 10, y);
      y += 10;
    });

    doc.save(`Invoice-${invoiceNumber}.pdf`);
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-xl font-bold mb-4">إصدار فاتورة جديدة</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input type="text" placeholder="Invoice Number" value={invoiceNumber} onChange={(e) => setInvoiceNumber(e.target.value)} className="p-2 border" />
        <input type="text" placeholder="Client Name" value={clientName} onChange={(e) => setClientName(e.target.value)} className="p-2 border" />
        <input type="date" value={invoiceDate} onChange={(e) => setInvoiceDate(e.target.value)} className="p-2 border" />
      </div>

      <div className="mt-6">
        <h2 className="text-lg font-semibold mb-2">الخدمات</h2>
        {items.map((item, index) => (
          <div key={index} className="grid grid-cols-6 gap-2 mb-2">
            <input placeholder="Service" value={item.service} onChange={(e) => handleItemChange(index, "service", e.target.value)} className="p-1 border" />
            <input placeholder="Traveler Name" value={item.name} onChange={(e) => handleItemChange(index, "name", e.target.value)} className="p-1 border" />
            <input type="date" value={item.date} onChange={(e) => handleItemChange(index, "date", e.target.value)} className="p-1 border" />
            <input placeholder="Description" value={item.description} onChange={(e) => handleItemChange(index, "description", e.target.value)} className="p-1 border" />
            <input placeholder="Ref" value={item.ref} onChange={(e) => handleItemChange(index, "ref", e.target.value)} className="p-1 border" />
            <input placeholder="Amount" value={item.amount} onChange={(e) => handleItemChange(index, "amount", e.target.value)} className="p-1 border" />
          </div>
        ))}
        <button onClick={addItem} className="mt-2 px-4 py-2 bg-gray-200 rounded">+ إضافة خدمة</button>
      </div>

      <button onClick={generatePDF} className="mt-6 px-6 py-2 bg-green-600 text-white rounded">تصدير PDF</button>
    </div>
  );
}
