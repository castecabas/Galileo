import { Request, Response } from 'express';
import { prisma } from "../Libs/prisma"
import { categorias } from '@prisma/client';

export const ConsultarCategorias = async (req:Request,res:Response)=>{
    try {
        
        let lista_categorias = await prisma.categorias.findMany();

        if(lista_categorias.length > 0){
            res.status(200).json(lista_categorias);
        }
        else{
            res.status(200).json({mensaje:"No se ha encontrado datos"})
        }

    } catch (e) {
        console.log('Error', e)
        return res.status(500).json({ message: `Se ha producido un error , error=> ${e}` })
    }
}

export const CrearCategoria = async (req: Request, res: Response) => {

    console.log(req.body);
    // asignar variable rapidamente del Body
    const { id,nombre,descripcion} = req.body;
    try {

        let Rta = await prisma.categorias.create({
            data: {
                id:id,
                nombre:nombre,
                descripcion:descripcion
            }
        })
        console.log(Rta);
        return res.status(200).json({ mensaje: "Se ha creado la categoria correctamente" });

    } catch (error: unknown) {
        if (error instanceof Error && 'code' in error && 'sqlMessage' in error) {
            if (error.code == "ER_DUP_ENTRY") {
                return res.status(500).json({ mensaje: "Categoria_ID ya existe" });
            } else {
                return res.status(500).json({ mensaje: error.sqlMessage });
            }
        } else {
            console.log("Unknown error:", error);
            return res.status(500).json({ mensaje: "Ocurrió un error desconocido" });
        }
    }
}

export const EliminarCategoriaoPorID = async (req: Request, res: Response) => {
    try {
        const ID = parseInt(req.params.id);

        let libro = await prisma.categorias.delete({
            where: {
                id:ID
            }
        })

        if (libro != null) {
            return res.status(200).json({message:"Categoria Eliminado con Exito"});
        }
        else{
            return res.status(404).json({message:"Categoria no encontrado"});
        }

    } catch (e) {
        console.log('Error', e)
        return res.status(500).json({ message: `Se ha producido un error , error=> ${e}` })
    }
}