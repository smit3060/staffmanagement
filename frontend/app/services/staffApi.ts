import { axiosIns } from "./api";

export const addStaff = async(staff:any) =>{
    try {
        const res = await axiosIns.post(`/api/staff/staff/add`, staff);
        return res.data
    } catch (error) {
        console.error(error);
    }
}

export const getStaff = async (setStaff : any) =>{
    try {
        const res = await axiosIns.get(`/api/staff/staff/`);
        const s = res.data.staff;
        setStaff({
            name : s.name,
            email : s.email,
            department : s.swpartment?.name ?? ""
        })
        return res.data
    } catch (error) {
        console.error(error);
    }
}

export const getSpecificStaff = async (setStaff: any, editId?: string | null) => {
    try {
        const res = await axiosIns.get(`/api/staff/staff/${editId}`);
        const s = res.data.staff;
        setStaff({
            name: s.name ?? "",
            email: s.email ?? "",
            department: s.department?.name ?? ""
        });
        return res.data;
    } catch (error) {
        console.error(error);
    }
};

export const editStaff = async(editId: any, staff: any) =>{
    try {
        const res = await axiosIns.put(`/api/staff/staff/${editId}`, staff)
        return res.data;
    } catch (error) {
        console.error(error);
    }
}

export const removeStaff = async(editId:number) =>{
    try {
        const res = await axiosIns.delete(`/api/staff/staff/${editId}`);
        return res.data
    } catch (error) {
        console.error(error);
    }
}