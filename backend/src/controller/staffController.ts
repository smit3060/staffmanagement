import {
    createStaff,
    getStaff,
    updateStaff,
    deleteStaff
} from "../service/staffService.ts";


export const addStaff = async (req:any,res:any) =>{
    try {
        const data = req.body;
        const staff = await createStaff(data);
        console.log(data)
        console.log(data);
        res.status(200).json({
            success : true,
            message : "staff created",
            staff
        })
    } catch (error) {
        console.error(error);
    }
}

export const takeStaff = async(req:any,res:any) =>{
    try {
        const staff = await getStaff()
        res.status(200).json({
            success : true,
            message : "staff taken",
            staff
        })
    } catch (error) {
        console.error(error)
    }
}


export const editStaff = async(req:any,res:any) =>{
    try {
        const id = Number(req.params.id);
        const data = req.body
        const staff = await updateStaff(id,data);
        res.status(200).json({
            success : true,
            message : "staff edited",
            staff
        })
    } catch (error) {
        console.error(error);
    }
}

export const removeStaff = async(req:any,res:any) =>{
    try {
        const id = Number(req.params.id);
        const staff = await deleteStaff(id);
        res.status(200).json({
            success : true,
            message : "staff deleted",
            staff
        })
    } catch (error) {
        console.error(error);
    }
}