# إعادة تحميل مكتبة الترميز والملف بعد إعادة التشغيل
from base64 import b64encode

# إعادة تحديد المسارات
font_path = "/mnt/data/arial.ttf"
final_file_path = "/mnt/data/InvoiceFormArabic-FINAL.jsx"

# قراءة وتحويل الخط إلى base64
with open(font_path, "rb") as f:
    font_base64 = b64encode(f.read()).decode("utf-8")

# كود React النهائي للفوترة العربية
final_invoice_form = f"""
import React, {{ useState }} from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";

const arialBase64 = `{font_base64}`;

export default function InvoiceFormArabic() {{
  const [invoiceNumber, setInvoiceNumber] = useState("011010");
  const [clientName, setClientName] = useState("أسامة");
  const [clientPhone, setClientPhone] = useState("771234567");
  const [clientEmail, setClientEmail] = useState("client@email.com");
  const [branch, setBranch] = useState("صنعاء");
  const [invoiceDate, setInvoiceDate] = useState(new Date().toISOString().split("T")[0]);

  const items = [
    {{
      service: "تذكرة",
      name: "علي أحمد",
      date: "2025-04-07",
      description: "صنعاء - عمّان",
      ref: "635-21787217878",
      amount: "666"
    }},
    {{
      service: "تأشيرة",
      name: "أحمد علي",
      date: "2025-04-07",
      description: "مصر",
      ref: "SECEG03",
      amount: "320"
    }}
  ];

  const generatePDF = () => {{
    const doc = new jsPDF();
    doc.setR2L(true);
    doc.addFileToVFS("arial.ttf", arialBase64);
    doc.addFont("arial.ttf", "arial", "normal");
    doc.setFont("arial");
    doc.setFontSize(12);

    doc.text("اذكى هوليديز للخدمات التجارية والسفر", 190, 20, {{ align: "right" }});
    doc.text("فاتورة مبيعات", 190, 30, {{ align: "right" }});
    doc.text(`رقم الفاتورة: ${{invoiceNumber}}`, 190, 40, {{ align: "right" }});
    doc.text(`التاريخ: ${{invoiceDate}}`, 190, 48, {{ align: "right" }});
    doc.text(`الفرع: ${{branch}}`, 190, 56, {{ align: "right" }});
    doc.text(`العميل: ${{clientName}}`, 190, 64, {{ align: "right" }});
    doc.text(`الهاتف: ${{clientPhone}}`, 190, 72, {{ align: "right" }});
    doc.text(`البريد الإلكتروني: ${{clientEmail}}`, 190, 80, {{ align: "right" }});

    const rows = items.map(item => [
      item.amount,
      item.ref,
      item.description,
      item.date,
      item.name,
      item.service
    ]);

    const headers = [["المبلغ", "المرجع", "الوصف", "التاريخ", "اسم المسافر", "الخدمة"]];

    doc.autoTable({{
      startY: 90,
      head: headers,
      body: rows,
      styles: {{
        font: "arial",
        fontSize: 10,
        halign: "right"
      }},
      headStyles: {{
        fillColor: [220, 220, 220],
        textColor: 20,
        fontStyle: "bold",
        halign: "right"
      }},
      margin: {{ right: 10, left: 10 }}
    }});

    doc.save(`فاتورة-${{invoiceNumber}}.pdf`);
  }};

  return (
    <div className="max-w-3xl p-4 border rounded bg-white shadow-md">
      <h2 className="text-xl font-bold mb-4 text-right">إنشاء فاتورة جديدة</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <input value={{clientName}} onChange={{e => setClientName(e.target.value)}} placeholder="اسم العميل" className="border p-2" />
        <input value={{clientPhone}} onChange={{e => setClientPhone(e.target.value)}} placeholder="رقم الهاتف" className="border p-2" />
        <input value={{clientEmail}} onChange={{e => setClientEmail(e.target.value)}} placeholder="البريد الإلكتروني" className="border p-2" />
        <select value={{branch}} onChange={{e => setBranch(e.target.value)}} className="border p-2">
          <option value="صنعاء">صنعاء</option>
          <option value="عدن">عدن</option>
          <option value="الأصبحي">الأصبحي</option>
        </select>
      </div>
      <button onClick={{generatePDF}} className="bg-green-600 text-white px-4 py-2 rounded">
        تحميل الفاتورة PDF (عربي)
      </button>
    </div>
  );
}}
"""

# حفظ الملف
with open(final_file_path, "w", encoding="utf-8") as f:
    f.write(final_invoice_form)

final_file_path
