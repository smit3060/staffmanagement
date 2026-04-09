"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar";

function DepartmentPage() {
    const router = useRouter();
    const [list, setList] = useState<any[]>([]);
    const [showDialog, setShowDialog] = useState(false);
    const [deptName, setDeptName] = useState("");
    const [editId, setEditId] = useState<number | null>(null);

    const getList = async () => {
        try {
            const res = await axios.get(`http://localhost:3000/api/staff/department/`);
            setList(Array.isArray(res.data.department) ? res.data.department : []);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => { getList(); }, []);

    const openAddDialog = () => {
        setEditId(null);
        setDeptName("");
        setShowDialog(true);
    };

    const openEditDialog = (dept: any) => {
        setEditId(dept.id);
        setDeptName(dept.name);
        setShowDialog(true);
    };

    const closeDialog = () => {
        setShowDialog(false);
        setDeptName("");
        setEditId(null);
    };

    const handleSubmit = async () => {
        if (!deptName.trim()) return;
        try {
            if (editId) {
                await axios.put(`http://localhost:3000/api/staff/department/${editId}`, { name: deptName });
            } else {
                await axios.post(`http://localhost:3000/api/staff/department/add`, { name: deptName });
            }
            closeDialog();
            getList();
        } catch (error) {
            console.error(error);
        }
    };

    const handleDelete = async (id: number) => {
        try {
            await axios.delete(`http://localhost:3000/api/staff/department/${id}`);
            getList();
        } catch (error) {
            console.error(error);
        }
    };

    return (
       <div className="min-h-screen bg-gray-50 flex flex-col">
    <Navbar />

    <main className="flex-1 px-4 md:px-8 py-10">

        {/* Page Header */}
        <div className="max-w-4xl mx-auto mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
      
                <h1 className="text-2xl font-bold text-gray-800">Departments</h1>
                <p className="text-gray-400 text-sm mt-1">{list.length} departments found</p>
            </div>
            <button
                onClick={openAddDialog}
                className="px-5 py-2.5 bg-blue-500 text-white text-sm font-semibold rounded-xl hover:bg-blue-600 transition shadow-md self-start sm:self-auto"
            >
                + Add Department
            </button>
        </div>

        {/* Table */}
        <div className="max-w-4xl mx-auto bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">

            {/* Desktop Table */}
            <div className="hidden sm:block overflow-x-auto">
                <table className="w-full text-left text-sm">
                    <thead>
                        <tr className="bg-gray-50 text-gray-500 border-b border-gray-100">
                            <th className="px-5 py-4 font-medium">#</th>
                            <th className="px-5 py-4 font-medium">Department Name</th>
                            <th className="px-5 py-4 font-medium text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {list.length === 0 ? (
                            <tr>
                                <td colSpan={3} className="px-5 py-12 text-center text-gray-400">
                                    <div className="flex flex-col items-center gap-2">
                                        <svg className="w-10 h-10 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                        </svg>
                                        <p className="text-sm">No departments yet</p>
                                        <button
                                            onClick={openAddDialog}
                                            className="mt-2 px-4 py-2 bg-blue-500 text-white text-xs rounded-xl hover:bg-blue-600 transition"
                                        >
                                            + Add First Department
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ) : (
                            list.map((dept: any, index: number) => (
                                <tr key={dept.id} className="border-t border-gray-50 hover:bg-gray-50 transition">
                                    <td className="px-5 py-4 text-gray-400">{index + 1}</td>
                                    <td className="px-5 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center font-semibold text-sm">
                                                {dept.name?.charAt(0).toUpperCase()}
                                            </div>
                                            <span className="font-medium text-gray-800">{dept.name}</span>
                                        </div>
                                    </td>
                                    <td className="px-5 py-4">
                                        <div className="flex gap-2 justify-center">
                                            <button
                                                onClick={() => openEditDialog(dept)}
                                                className="px-3 py-1.5 text-xs bg-yellow-400 text-white rounded-lg hover:bg-yellow-500 transition font-medium"
                                            >
                                                Update
                                            </button>
                                            <button
                                                onClick={() => handleDelete(dept.id)}
                                                className="px-3 py-1.5 text-xs bg-red-500 text-white rounded-lg hover:bg-red-600 transition font-medium"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Mobile Cards */}
            <div className="sm:hidden divide-y divide-gray-100">
                {list.length === 0 ? (
                    <div className="px-5 py-12 text-center text-gray-400 text-sm">No departments yet</div>
                ) : (
                    list.map((dept: any, index: number) => (
                        <div key={dept.id} className="p-4 flex items-center justify-between gap-4">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-green-100 text-green-600 rounded-full flex items-center justify-center font-bold text-sm shrink-0">
                                    {dept.name?.charAt(0).toUpperCase()}
                                </div>
                                <div>
                                    <p className="font-semibold text-gray-800 text-sm">{dept.name}</p>
                                    <p className="text-gray-400 text-xs">Department #{index + 1}</p>
                                </div>
                            </div>
                            <div className="flex flex-col gap-1.5 shrink-0">
                                <button
                                    onClick={() => openEditDialog(dept)}
                                    className="px-3 py-1 text-xs bg-yellow-400 text-white rounded-lg hover:bg-yellow-500 transition"
                                >
                                    Update
                                </button>
                                <button
                                    onClick={() => handleDelete(dept.id)}
                                    className="px-3 py-1 text-xs bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    </main>


    {/* Dialog */}
    {showDialog && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 px-4">
            <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-sm border border-gray-100">

                {/* Dialog Header */}
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                        <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                    </div>
                    <div>
                        <h2 className="text-base font-bold text-gray-800">
                            {editId ? "Update Department" : "Add Department"}
                        </h2>
                        <p className="text-xs text-gray-400">
                            {editId ? "Edit the department name below." : "Enter a name for the new department."}
                        </p>
                    </div>
                </div>

                <div className="mb-5">
                    <label className="block text-sm font-medium text-gray-600 mb-1.5">
                        Department Name
                    </label>
                    <input
                        type="text"
                        value={deptName}
                        onChange={(e) => setDeptName(e.target.value)}
                        placeholder="e.g. Engineering"
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm text-gray-800 bg-gray-50"
                    />
                </div>

                <div className="flex gap-2">
                    <button
                        onClick={closeDialog}
                        className="flex-1 py-2.5 text-sm border border-gray-200 rounded-xl hover:bg-gray-50 transition text-gray-600 font-medium"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSubmit}
                        className={`flex-1 py-2.5 text-sm text-white rounded-xl transition font-semibold shadow-md ${
                            editId
                                ? "bg-yellow-500 hover:bg-yellow-600"
                                : "bg-blue-500 hover:bg-blue-600"
                        }`}
                    >
                        {editId ? "Update" : "Add"}
                    </button>
                </div>

            </div>
        </div>
    )}
</div>
    );
}

export default DepartmentPage;