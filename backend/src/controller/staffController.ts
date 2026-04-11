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
        res.status(400).json({ success: false, message: error.message });
    }
};

export const takeStaff = async(req:any,res:any) =>{
    try {
        const page = Number(req.query.page as string) || 1;
        const limit = Number(req.query.limit as string) || 10;
        const search = (req.query.search as string) || "";
        const department  = (req.query.department as string) || "";
        const {staff,total} = await getStaff(page, limit,search,department);

        res.status(200).json({
            staff,
            total,       
            page,
            limit
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