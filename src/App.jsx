import React, { useState, useEffect } from 'react';

const LOCAL_STORAGE_KEYS = {
  CUSTOMERS: 'customers',
  INVOICES: 'invoices',
  LAST_INVOICE_NUMBER: 'lastInvoiceNumber',
};

const App = () => {
  const [customers, setCustomers] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const [selectedCustomerId, setSelectedCustomerId] = useState(null);
  const [invoiceNumber, setInvoiceNumber] = useState(11010);

  useEffect(() => {
    const savedCustomers = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEYS.CUSTOMERS)) || [];
    const savedInvoices = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEYS.INVOICES)) || [];
    const lastNumber = parseInt(localStorage.getItem(LOCAL_STORAGE_KEYS.LAST_INVOICE_NUMBER)) || 11010;

    setCustomers(savedCustomers);
    setInvoices(savedInvoices);
    setInvoiceNumber(lastNumber);
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEYS.CUSTOMERS, JSON.stringify(customers));
    localStorage.setItem(LOCAL_STORAGE_KEYS.INVOICES, JSON.stringify(invoices));
    localStorage.setItem(LOCAL_STORAGE_KEYS.LAST_INVOICE_NUMBER, invoiceNumber.toString());
  }, [customers, invoices, invoiceNumber]);

  const addCustomer = (customer) => {
    const newCustomer = { ...customer, id: Date.now() };
    setCustomers([...customers, newCustomer]);
  };

  const createInvoice = (customerId, branch) => {
    const newInvoice = {
      id: Date.now(),
      number: invoiceNumber.toString().padStart(6, '0'),
      date: new Date().toISOString().split('T')[0],
      branch,
      customerId
    };
    setInvoices([...invoices, newInvoice]);
    setInvoiceNumber(prev => prev + 1);
  };

  const getInvoicesForCustomer = (id) => {
    return invoices.filter(inv => inv.customerId === id);
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">نظام إدارة العملاء والفواتير</h1>
      <CustomerList customers={customers} onSelect={setSelectedCustomerId} />
      <CustomerForm onAdd={addCustomer} />

      {selectedCustomerId && (
        <CustomerDetails
          customer={customers.find(c => c.id === selectedCustomerId)}
          invoices={getInvoicesForCustomer(selectedCustomerId)}
          onCreateInvoice={createInvoice}
        />
      )}
    </div>
  );
};

const CustomerList = ({ customers, onSelect }) => (
  <div className="mb-4">
    <h2 className="font-semibold">قائمة العملاء</h2>
    <ul className="space-y-1">
      {customers.map((c) => (
        <li key={c.id}>
          <button
            className="text-blue-600 hover:underline"
            onClick={() => onSelect(c.id)}
          >
            {c.name} - {c.phone}
          </button>
        </li>
      ))}
    </ul>
  </div>
);

const CustomerForm = ({ onAdd }) => {
  const [form, setForm] = useState({ name: '', phone: '', email: '', address: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.name && form.phone) {
      onAdd(form);
      setForm({ name: '', phone: '', email: '', address: '' });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 space-y-2">
      <input placeholder="اسم العميل" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="border px-2 py-1 w-full" />
      <input placeholder="رقم الهاتف" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="border px-2 py-1 w-full" />
      <input placeholder="البريد الإلكتروني" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="border px-2 py-1 w-full" />
      <input placeholder="العنوان" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} className="border px-2 py-1 w-full" />
      <button type="submit" className="bg-green-600 text-white py-1 px-4 rounded">إضافة عميل</button>
    </form>
  );
};

const CustomerDetails = ({ customer, invoices, onCreateInvoice }) => {
  const [branch, setBranch] = useState('');
  return (
    <div className="border-t pt-4">
      <h3 className="text-lg font-semibold">تفاصيل العميل</h3>
      <p><strong>الاسم:</strong> {customer.name}</p>
      <p><strong>الهاتف:</strong> {customer.phone}</p>
      <p><strong>الإيميل:</strong> {customer.email}</p>
      <p><strong>العنوان:</strong> {customer.address}</p>

      <div className="mt-4">
        <h4 className="font-semibold">فواتير العميل</h4>
        <ul className="list-disc pl-5">
          {invoices.map(inv => (
            <li key={inv.id}>
              رقم: {inv.number}, التاريخ: {inv.date}, الفرع: {inv.branch}
            </li>
          ))}
        </ul>

        <div className="mt-2">
          <select value={branch} onChange={(e) => setBranch(e.target.value)} className="border px-2 py-1">
            <option value="">-- اختر الفرع --</option>
            <option value="صنعاء">صنعاء</option>
            <option value="عدن">عدن</option>
            <option value="الأصبحي">الأصبحي</option>
          </select>
          <button
            onClick={() => branch && onCreateInvoice(customer.id, branch)}
            className="ml-2 bg-blue-600 text-white py-1 px-4 rounded"
          >
            إصدار فاتورة جديدة
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
