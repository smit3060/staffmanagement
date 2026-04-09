import {
    createStaff,
    getStaff,
    updateStaff,
    deleteStaff,
    getSpecificStaff
} from "../service/staffService.ts";


export const addStaff = async (req: any, res: any) => {
    try {
        const data = req.body;
        const staff = await createStaff(data);
        res.status(200).json({ success: true, message: "staff created", staff });
    } catch (error: any) {
        console.error(error);
        res.status(400).json({ success: false, message: error.message }); // ✅ sends "Department not found"
    }
};

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

export const takeSpecificStaff = async(req:any,res:any) =>{
    try {
        const id = Number(req.params.id);
        const staff = await getSpecificStaff(id);
        res.status(200).json({
            success : true,
            message : "specific staff taken ",
            staff
        })
    } catch (error) {
        console.error(error);
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