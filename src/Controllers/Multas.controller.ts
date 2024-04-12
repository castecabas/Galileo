import { Request , Response } from "express";
import { prisma } from "../Libs/prisma";
import { multas ,motivos } from "@prisma/client";

export const ConsultarMultas = async (req:Request,res:Response)=> {
    try {
        
        let lista_multas:multas[] = await prisma.multas.findMany({
            include:{
                Rel_motivo:true
            }
        })

        if(lista_multas.length > 0){
            return res.status(200).json(lista_multas);
        }
        else{
            return res.status(404).json({mensaje:"No hay datos en la lista de multas"});
        }

    } catch (e) {
        return res.status(500).json({ message: `Se ha producido un error , error=> ${e}` })
    }
}

export const CrearMulta = async (req:Request,res:Response)=> {
    try {
        
        const {monto,idCliente,idMotivo} = req.body;

        //validacion de ID foraneas
        const clienteExistente = await verificarClienteExistente(idCliente);
        const motivoExistente = await verificarMotivoExistente(idMotivo);

        if(!clienteExistente){
            return res.status(500).json ({mensaje: "El ID del cliente no existe para asignarlo"});
        }
        if(!motivoExistente){
            return res.status(500).json ({mensaje: "El ID del motivo no existe para asignarlo"});
        }

        //si cumplen ,crear:
        let Rta = await prisma.multas.create({
            data:{
                monto:monto,
                idCliente:idCliente,
                idMotivo:idMotivo
            }
        })

        return res.status(200).json({ mensaje: "Se ha creado la multa correctamente" });

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

export const ModificarMultaPorID = async (req:Request,res:Response)=> {
    try {
        const {monto,idCliente,idMotivo} = req.body;
        const ID = parseInt(req.params.id);

        const clienteExistente = await verificarClienteExistente(idCliente);
        const motivoExistente = await verificarMotivoExistente(idMotivo);

        if(!clienteExistente){
            return res.status(500).json ({mensaje: "El ID del cliente no existe para asignarlo"});
        }
        if(!motivoExistente){
            return res.status(500).json ({mensaje: "El ID del motivo no existe para asignarlo"});
        }

        //si cumplen ,crear:
        let Rta = await prisma.multas.update({
            where:{
                id:ID
            },
            data:{
                monto:monto,
                idCliente:idCliente,
                idMotivo:idMotivo
            }
        })

        if (Rta) {
            return res.status(200).json({ mensaje: "Se ha actualizado la multa correctamente" });
        } else {
            return res.status(404).json({ message: "Multa no encontrado" });
        }

    } catch (e) {
        return res.status(500).json({ message: `Se ha producido un error , error=> ${e}` })
    }
}

export const EliminarMultaPorID = async (req:Request,res:Response)=> {
    try {
        const ID = parseInt(req.params.id);

        let multa = await prisma.multas.delete({
            where:{
                id:ID
            }
        })

        if (multa != null) {
            return res.status(200).json({ message: "Multa Eliminado con Exito" });
        }
        else {
            return res.status(404).json({ message: "Multa no encontrado" });
        }

    } catch (e) {
        console.log('Error', e)
        return res.status(500).json({ message: `Se ha producido un error , error=> ${e}` })
    }
}


const verificarClienteExistente = async (idCliente:number)=>{
    try {
        
        const clienteExistente = await prisma.clientes.findUnique({
            where: {
                id:idCliente
            }
        })
        return clienteExistente !== null;

    } catch (error) {
        console.error("Error al verificar el cliente existente:", error);
        return false; 
    }
}

const verificarMotivoExistente = async (idMotivo:number)=>{
    try {
        
        const motivoExistente = await prisma.motivos.findUnique({
            where: {
                id:idMotivo
            }
        })
        return motivoExistente !== null;

    } catch (error) {
        console.error("Error al verificar el motivo existente:", error);
        return false; 
    }
}