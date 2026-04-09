import {
    getAllDepartments,
    addDepartment,
    updateDepartment,
    deleteDepartment
} from "../service/departmentService.ts";

export const getAll = async (req: any, res: any) => {
    try {
        const department = await getAllDepartments();
        res.status(200).json({
            success: true,
            message: "departments fetched",
            department
        });
    } catch (error) {
        console.error(error);
    }
};

export const add = async (req: any, res: any) => {
    try {
        const { name } = req.body;
        const department = await addDepartment(name);
        res.status(200).json({
            success: true,
            message: "department added",
            department
        });
    } catch (error) {
        console.error(error);
    }
};

export const update = async (req: any, res: any) => {
    try {
        const id = Number(req.params.id);
        const { name } = req.body;
        const department = await updateDepartment(id, name);
        res.status(200).json({
            success: true,
            message: "department updated",
            department
        });
    } catch (error) {
        console.error(error);
    }
};

export const remove = async (req: any, res: any) => {
    try {
        const id = Number(req.params.id);
        await deleteDepartment(id);
        res.status(200).json({
            success: true,
            message: "department deleted"
        });
    } catch (error) {
        console.error(error);
    }
};