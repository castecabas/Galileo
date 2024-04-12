import { Request, Response } from 'express';
import { prisma } from '../Libs/prisma';
import { clientes,prestamos ,multas,motivos} from '@prisma/client'

export const ConsultarClientes = async (req: Request, res: Response) => {

    try {
        let lista_clientes : clientes[] = await prisma.clientes.findMany(
            {
                include:
                {
                    Rel_prestamo:true,
                    multas:true
                }
            }
        )

        if(lista_clientes.length > 0){
            return res.status(200).json(lista_clientes);
        }
        else{
            return res.status(404).json({mensaje:"No se ha encontrado lista de clientes"});
        }
    } catch (e) {
        console.log('Error', e)
        return res.status(500).json({ message: `Se ha producido un error , error=> ${e}` })
    }
}

export const ConsultarClientePorID = async (req: Request, res: Response) => {
    try {
        const ID = parseInt(req.params.id);

        let cliente = await prisma.clientes.findFirst({
            where: {
                id:ID
            }
        })

        if(cliente != null){
            return res.status(200).json(cliente);
        }
        else {
            return res.status(404).json({ message: "Cliente no encontrado" });
        }
    } catch (e) {
        console.log('Error', e)
        return res.status(500).json({ message: `Se ha producido un error , error=> ${e}` })
    }
}

export const CrearCliente = async (req: Request, res: Response) => {
    
    try {
        const {nombre,apellido,direccion,telefono,idPrestamo} = req.body
        if(idPrestamo == null){
            console.log("El id prestamo no posee dato involucrado , se retomará como nulo")
        }

        //si cumplen , crear
        let Rta = await prisma.clientes.create({
            data:{
                nombre:nombre,
                apellido:apellido,
                direccion:direccion,
                telefono:telefono,
                idPrestamo:idPrestamo
            }
        })
        console.log(Rta);
        return res.status(200).json({ mensaje: "Se ha creado el cliente correctamente" });
    
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

export const ModificarClientePorID = async (req: Request, res: Response) => {
    
    try {
        const {nombre,apellido,direccion,telefono,idPrestamo} = req.body
        const ID = parseInt(req.params.id);
        let Rta = await prisma.clientes.update({
            where:{
                id:ID
            },
            data:{
                nombre:nombre,
                apellido:apellido,
                direccion:direccion,
                telefono:telefono,
                idPrestamo:idPrestamo
            }
        })
        console.log(Rta);
        return res.status(200).json({ mensaje: "Se ha actualizado el cliente correctamente" });

    } catch (e) {
        return res.status(500).json({ message: `Se ha producido un error , error=> ${e}` })
    }
}

export const EliminarClientePorID = async (req: Request, res: Response) => {
    try {
        const ID = parseInt(req.params.id);

        let cliente = await prisma.clientes.delete({
            where: {
                id:ID
            }
        })
        if (cliente != null) {
            return res.status(200).json({ message: "Cliente Eliminado con Exito" });
        }
        else {
            return res.status(404).json({ message: "Cliente no encontrado" });
        }
    } catch (e) {
        console.log('Error', e)
        return res.status(500).json({ message: `Se ha producido un error , error=> ${e}` })
    }
}
