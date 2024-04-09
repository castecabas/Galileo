import { Request, Response } from 'express';
import { prisma } from "../Libs/prisma"
import { autores } from '@prisma/client';


export const ConsultarAutores= async (req:Request,res:Response)=>{
    try {
        
        let lista_autores = await prisma.autores.findMany();

        if(lista_autores.length > 0){
            res.status(200).json(lista_autores);
        }
        else{
            res.status(200).json({mensaje:"No se ha encontrado datos"})
        }

    } catch (e) {
        console.log('Error', e)
        return res.status(500).json({ message: `Se ha producido un error , error=> ${e}` })
    }
}

export const ConsultarAutorPorID= async (req:Request,res:Response)=>{
    try {
        const ID = parseInt(req.params.id);

        let autor = await prisma.autores.findFirst({
            where: {
                id: ID
            }
        })

        if (autor != null) {
            return res.status(200).json(autor);
        }
        else {
            return res.status(404).json({ message: "Autor no encontrado" });
        }

    } catch (e) {
        console.log('Error', e)
        return res.status(500).json({ message: `Se ha producido un error , error=> ${e}` })
    }
}

export const CrearAutor= async (req:Request,res:Response)=>{

    console.log(req.body);
    // asignar variable rapidamente del Body
    const { id,nombre,apellido,nacionalidad,fecha_nacimiento} = req.body;
    try {

        let Rta = await prisma.autores.create({
            data: {
                id:id,
                nombre:nombre,
                apellido:apellido,
                nacionalidad:nacionalidad,
                fecha_nacimiento:fecha_nacimiento
            }
        })
        console.log(Rta);
        return res.status(200).json({ mensaje: "Se ha creado el autor correctamente" });

    } catch (error: unknown) {
        if (error instanceof Error && 'code' in error && 'sqlMessage' in error) {
            if (error.code == "ER_DUP_ENTRY") {
                return res.status(500).json({ mensaje: "Autor_ID ya existe" });
            } else {
                return res.status(500).json({ mensaje: error.sqlMessage });
            }
        } else {
            console.log("Unknown error:", error);
            return res.status(500).json({ mensaje: "Ocurrió un error desconocido" });
        }
    }
}

export const ModificarAutorPorID =async (req:Request,res:Response)=>{
    try {
        const {nombre,apellido,nacionalidad,fecha_nacimiento} = req.body;
        const ID = parseInt(req.params.id);
        let Rta = await prisma.autores.update({
            where:{
                id:ID
            },
            data: {
                nombre:nombre,
                apellido:apellido,
                nacionalidad:nacionalidad,
                fecha_nacimiento:fecha_nacimiento
            }
        })
        console.log(Rta);
        return res.status(200).json({ mensaje: "Se ha actualizado el autor correctamente" });

    } catch (e) {
        console.log('Error', e)
        return res.status(500).json({ message: `Se ha producido un error , error=> ${e}` })
    }
}

export const EliminarAutorPorID= async (req:Request,res:Response)=>{
    try {
        const ID = parseInt(req.params.id);

        let libro = await prisma.autores.delete({
            where: {
                id: ID
            }
        })

        if (libro != null) {
            return res.status(200).json({ message: "Autor Eliminado con Exito" });
        }
        else {
            return res.status(404).json({ message: "Autor no encontrado" });
        }

    } catch (e) {
        console.log('Error', e)
        return res.status(500).json({ message: `Se ha producido un error , error=> ${e}` })
    }
}