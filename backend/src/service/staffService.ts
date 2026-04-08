import { prisma } from "../config/prisma.ts"

export const createStaff = async(data:any) =>{
    return await prisma.staff.create({data});
}

export const getStaff = async() =>{
    return await prisma.staff.findMany();
}

export const updateStaff = async(id:number,res:any) =>{
    return await prisma.staff.update({
        where : {id},
        data : res
    })
}

export const deleteStaff = async(id:number)=>{
    return await prisma.staff.delete({
        where : {id}
    })
}