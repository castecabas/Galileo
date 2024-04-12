import { Request, Response } from 'express';
import { prisma } from '../Libs/prisma';
import { motivos} from '@prisma/client'

export const ConsultarMotivos = async (req:Request,res:Response)=>{
    try {
        let lista_motivos: motivos[] = await prisma.motivos.findMany()

        if(lista_motivos.length > 0){
            return res.status(200).json(lista_motivos);
        }
        else{
            return res.status(404).json({mensaje:"No hay datos en la lista de motivos"});
        }
    } catch (e) {
        return res.status(500).json({ message: `Se ha producido un error , error=> ${e}` })
    }
}

export const CrearMotivo = async (req:Request,res:Response)=>{
    try {
        const {nombre,descripcion} = req.body;

        let motivo = await prisma.motivos.create({
            data:{
                nombre:nombre,
                descripcion:descripcion
            }
        })

        return res.status(200).json({mensaje:"Se ha creado el motivo correctamente"});
    } catch (error: unknown) {
        if (error instanceof Error && 'code' in error && 'sqlMessage' in error) {
            if (error.code == "ER_DUP_ENTRY") {
                return res.status(500).json({ mensaje: "Estudiante ya existe" });
            } else {
                return res.status(500).json({ mensaje: error.sqlMessage });
            }
        } else {
            console.log("Unknown error:", error);
            return res.status(500).json({ mensaje: "Ocurrió un error desconocido" });
        }
    }
}

export const ModificarMotivoPorID = async (req:Request,res:Response)=>{
    try {
        const {nombre,descripcion} = req.body;
        const ID = parseInt(req.params.id);

        let Rta = await prisma.motivos.update({
            where:{
                id:ID
            },
            data:{
                nombre:nombre,
                descripcion:descripcion
            }
        })

        return res.status(200).json({ mensaje: "Se ha actualizado el motivo correctamente" });

    } catch (e) {
        console.log('Error', e)
        return res.status(500).json({ message: `Se ha producido un error , error=> ${e}` })
    }
}

export const EliminarMotivoPorID = async (req:Request,res:Response)=>{
    try {
        const ID = parseInt(req.params.id);

        let motivo = await prisma.motivos.delete({
            where:{
                id:ID
            }
        })

        if (motivo != null) {
            return res.status(200).json({ message: "Motivo Eliminado con Exito" });
        }
        else {
            return res.status(404).json({ message: "Motivo no encontrado" });
        }

    } catch (e) {
        console.log('Error', e)
        return res.status(500).json({ message: `Se ha producido un error , error=> ${e}` })
    }
}