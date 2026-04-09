"use client";
import { useState, useEffect } from "react"
import axios from "axios"
import { useRouter, useSearchParams } from "next/navigation";
import Navbar from "../components/Navbar";

const API = "http://localhost:3000"; 

function StaffForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const editId = searchParams.get("id");

    const [staff, setStaff] = useState({ name: "", email: "", department: "" });
    const [departments, setDepartments] = useState<{ id: number; name: string }[]>([]);

    useEffect(() => {
        axios.get(`${API}/api/staff/department/`)
            .then(res => setDepartments(Array.isArray(res.data.department) ? res.data.department : []))
            .catch(console.error);
    }, []);

   useEffect(() => {
    if (editId) {
        axios.get(`${API}/api/staff/${editId}`)
            .then(res => {
                const s = res.data.staff;
                setStaff({
                    name: s.name,
                    email: s.email,
                    department: s.department?.name ?? ""
                });
            })
            .catch(console.error);
    } else {
        setStaff({ name: "", email: "", department: "" });
    }
}, [editId]);

    const handleChange = (e: any) => {
        setStaff({ ...staff, [e.target.name]: e.target.value });
    }

   const handleOnSubmit = async (e: any) => {
    e.preventDefault();
    try {
        if (editId) {
            await axios.put(`${API}/api/staff/${editId}`, staff);
        } else {
            await axios.post(`${API}/api/staff/add`, staff);
        }
        setStaff({ name: "", email: "", department: "" });
        router.push("/StaffList");
    } catch (error: any) {
        console.error(error);
        alert(error?.response?.data?.message ?? "Something went wrong");
    }
}

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
    <Navbar />

    <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md border border-gray-100">

            <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-14 h-14 bg-blue-100 rounded-2xl mb-4">
                    <svg className="w-7 h-7 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                </div>
                {/* <span className="inline-block bg-blue-100 text-blue-600 text-xs font-medium px-3 py-1 rounded-full mb-2">
                    {editId ? "Edit Mode" : "New Entry"}
                </span> */}
                <h2 className="text-2xl font-bold text-gray-800">
                    {editId ? "Update Staff" : "Add Staff"}
                </h2>
                <p className="text-gray-400 text-sm mt-1">
                    {editId ? "Update the staff member's details below." : "Fill in the details to add a new staff member."}
                </p>
            </div>

            <form onSubmit={handleOnSubmit} className="space-y-5">

                <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1.5">
                        Full Name
                    </label>
                    <input
                        type="text"
                        name="name"
                        value={staff.name}
                        placeholder="e.g. John Doe"
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder:text-gray-300 text-gray-800 text-sm bg-gray-50"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1.5">
                        Email Address
                    </label>
                    <input
                        type="email"
                        name="email"
                        value={staff.email}
                        placeholder="e.g. john@example.com"
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder:text-gray-300 text-gray-800 text-sm bg-gray-50"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1.5">
                        Department
                    </label>
                    <select
                        name="department"
                        value={staff.department}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-800 text-sm bg-gray-50"
                    >
                        <option value="">-- Select Department --</option>
                        {departments.map(dept => (
                            <option key={dept.id} value={dept.name}>
                                {dept.name}
                            </option>
                        ))}
                    </select>
                </div>

                <button
                    type="submit"
                    className={`w-full text-white py-2.5 rounded-xl transition font-semibold text-sm shadow-md mt-2 ${
                        editId
                            ? "bg-yellow-500 hover:bg-yellow-600"
                            : "bg-blue-500 hover:bg-blue-600"
                    }`}
                >
                    {editId ? "Update Staff" : "+ Add Staff"}
                </button>

                <button
                    type="button"
                    onClick={() => router.push('/StaffList')}
                    className="w-full py-2.5 rounded-xl border border-gray-200 text-gray-500 text-sm font-medium hover:bg-gray-50 transition"
                >
                    Cancel
                </button>

            </form>
        </div>
    </main>

</div>
    )
}

export default StaffForm