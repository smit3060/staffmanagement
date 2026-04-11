"use client";

const invoiceData = {
    invoiceNumber: "INV-2024-0042",
    date: "April 10, 2026",
    dueDate: "April 25, 2026",
    status: "Unpaid",
    company: {
        name: "StaffMS Solutions",
        address: "42 Business Park, Rajkot",
        state: "Gujarat, India — 360001",
        email: "billing@staffms.com",
        phone: "+91 98765 43210",
    },
    customer: {
        name: "Nexus Technologies Pvt. Ltd.",
        phone: "+91 91234 56789",
        address: "17 Tech Avenue, Ahmedabad, Gujarat — 380015",
    },
    items: [
        { id: 1, description: "Staff Management Software License", qty: 1, rate: 12000 },
        { id: 2, description: "Department Module Setup & Configuration", qty: 2, rate: 3500 },
        { id: 3, description: "API Integration Service", qty: 1, rate: 8000 },
        { id: 4, description: "Annual Support & Maintenance", qty: 1, rate: 5000 },
        { id: 5, description: "User Training Sessions (per session)", qty: 3, rate: 2000 },
    ],
    taxRate: 18,
    notes: "Payment due within 15 days. Include the invoice number in your payment reference. Bank transfer details sent separately.",
};

function Invoice() {
    const subtotal = invoiceData.items.reduce((sum, item) => sum + item.qty * item.rate, 0);
    const tax = (subtotal * invoiceData.taxRate) / 100;
    const total = subtotal + tax;

    const formatCurrency = (amount: number) =>
        new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(amount);

    return (
        <div className="min-h-screen bg-gray-100 flex items-start justify-center py-10 px-4">
            <div className="w-full max-w-2xl bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100">

                {/* Top accent bar */}
                <div className="h-1 w-full bg-blue-500" />

                {/* Header: Company + Invoice Info */}
                <div className="px-8 pt-7 pb-5 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-5">
                    {/* Company */}
                    <div>
                        <p className="text-lg font-semibold text-gray-800 mb-1">{invoiceData.company.name}</p>
                        <p className="text-xs text-gray-400 leading-relaxed">
                            {invoiceData.company.address}<br />
                            {invoiceData.company.state}<br />
                            {invoiceData.company.email} · {invoiceData.company.phone}
                        </p>
                    </div>

                    {/* Invoice meta */}
                    <div className="sm:text-right">
                        <p className="text-xs uppercase tracking-widest text-gray-400 mb-1">Invoice</p>
                        <p className="text-sm font-semibold text-blue-500 mb-2">{invoiceData.invoiceNumber}</p>
                        <p className="text-xs text-gray-400">Issue: <span className="text-gray-600">{invoiceData.date}</span></p>
                        <p className="text-xs text-gray-400">Due: <span className="text-gray-600">{invoiceData.dueDate}</span></p>
                        <span className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-medium
                            ${invoiceData.status === "Paid"
                                ? "bg-green-100 text-green-600"
                                : invoiceData.status === "Unpaid"
                                ? "bg-red-100 text-red-500"
                                : "bg-yellow-100 text-yellow-600"
                            }`}>
                            {invoiceData.status}
                        </span>
                    </div>
                </div>

                <div className="mx-8 border-t border-gray-100" />

                {/* Customer Details */}
                <div className="px-8 py-5 grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                        <p className="text-xs uppercase tracking-widest text-gray-400 mb-1">Customer name</p>
                        <p className="text-sm font-semibold text-gray-800">{invoiceData.customer.name}</p>
                    </div>
                    <div>
                        <p className="text-xs uppercase tracking-widest text-gray-400 mb-1">Phone</p>
                        <p className="text-sm font-semibold text-gray-800">{invoiceData.customer.phone}</p>
                    </div>
                    <div>
                        <p className="text-xs uppercase tracking-widest text-gray-400 mb-1">Address</p>
                        <p className="text-xs text-gray-500 leading-relaxed">{invoiceData.customer.address}</p>
                    </div>
                </div>

                <div className="mx-8 border-t border-gray-100" />

                {/* Items Table */}
                <div className="px-8 py-4">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="bg-gray-50 text-gray-400 text-xs uppercase tracking-wider">
                                <th className="px-3 py-2.5 text-left font-medium w-8">#</th>
                                <th className="px-3 py-2.5 text-left font-medium">Description</th>
                                <th className="px-3 py-2.5 text-center font-medium w-10">Qty</th>
                                <th className="px-3 py-2.5 text-right font-medium w-24">Rate</th>
                                <th className="px-3 py-2.5 text-right font-medium w-24">Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {invoiceData.items.map((item) => (
                                <tr key={item.id} className="border-t border-gray-50">
                                    <td className="px-3 py-3 text-gray-400">{item.id}</td>
                                    <td className="px-3 py-3 text-gray-700">{item.description}</td>
                                    <td className="px-3 py-3 text-center text-gray-500">{item.qty}</td>
                                    <td className="px-3 py-3 text-right text-gray-500">{formatCurrency(item.rate)}</td>
                                    <td className="px-3 py-3 text-right font-semibold text-gray-700">
                                        {formatCurrency(item.qty * item.rate)}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Totals */}
                <div className="px-8 py-3 flex justify-end">
                    <div className="w-60 space-y-1.5">
                        <div className="flex justify-between text-sm text-gray-500">
                            <span>Subtotal</span>
                            <span className="font-medium text-gray-700">{formatCurrency(subtotal)}</span>
                        </div>
                        <div className="flex justify-between text-sm text-gray-500">
                            <span>GST ({invoiceData.taxRate}%)</span>
                            <span className="font-medium text-gray-700">{formatCurrency(tax)}</span>
                        </div>
                        <div className="border-t border-gray-200 pt-2 flex justify-between">
                            <span className="font-semibold text-gray-800">Total due</span>
                            <span className="font-bold text-blue-500 text-base">{formatCurrency(total)}</span>
                        </div>
                    </div>
                </div>

                {/* Notes */}
                <div className="mx-8 mb-7 mt-3 bg-blue-50 rounded-xl px-4 py-3.5 border border-blue-100">
                    <p className="text-xs font-semibold text-blue-400 uppercase tracking-widest mb-1">Note</p>
                    <p className="text-xs text-blue-700 leading-relaxed">{invoiceData.notes}</p>
                </div>

                {/* Footer */}
                <div className="px-8 py-4 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-1">
                    <p className="text-xs text-gray-400">Thank you for your business!</p>
                    <p className="text-xs text-gray-400">{invoiceData.invoiceNumber} · {invoiceData.date}</p>
                </div>

            </div>
        </div>
    );
}

export default Invoice;