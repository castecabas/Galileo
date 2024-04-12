import { Request, Response } from 'express';
import { prisma } from '../Libs/prisma';
import { prestamos } from '@prisma/client'

// METODOS

export const ConsultarPrestamos = async (req: Request, res: Response) => {
    try {

        let lista_prestamos: prestamos[] = await prisma.prestamos.findMany(
            {
                include:
                {
                    Rel_libros: true,
                    clientes: true
                }
            }
        )

        if (lista_prestamos.length > 0) {
            return res.status(200).json(lista_prestamos)
        }
        else {
            return res.status(500).json({ mensaje: "No se ha encontrado lista de prestamos" });
        }

    } catch (e) {
        return res.status(500).json({ message: `Se ha producido un error , error=> ${e}` })
    }
}

export const ConsultarPrestamoPorID = async (req: Request, res: Response) => {
    try {
        const ID = parseInt(req.params.id)
        let prestamo = await prisma.prestamos.findFirst({
            where: {
                id: ID
            }
        })

        if (prestamo) {
            return res.status(200).json(prestamo);
        }
        else {
            return res.status(404).json({ message: "Prestamo no encontrado" });
        }

    } catch (e) {
        return res.status(500).json({ message: `Se ha producido un error , error=> ${e}` })
    }
}

export const CrearPrestamo = async (req: Request, res: Response) => {
    const { fecha_inicial, fecha_entrega, idLibro } = req.body;
    try {
        //verificar Id Libro existe
        const libroExistente = await verificarLibroExistente(idLibro);
        if (!libroExistente) {
            return res.status(500).json({ mensaje: "El ID del libro no existe para asignarlo" });
        }
        let Rta = await prisma.prestamos.create({
            data: {
                fecha_inicial: fecha_inicial,
                fecha_entrega: fecha_entrega,
                idLibro: idLibro
            }
        })
        console.log(Rta);
        return res.status(200).json({ mensaje: "Se ha creado el prestamo correctamente" });

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

export const ModificarPrestamoPorID = async (req: Request, res: Response) => {
    try {

        const { fecha_inicial, fecha_entrega, idLibro } = req.body;
        const ID = parseInt(req.params.id);

        //verificar Id Libro existe
        const libroExistente = await verificarLibroExistente(idLibro);
        if (!libroExistente) {
            return res.status(500).json({ mensaje: "El ID del libro no existe para asignarlo" });
        }
        //si cumplen , crear:
        let Rta = await prisma.prestamos.update({
            where: {
                id: ID
            },
            data: {
                fecha_inicial: fecha_inicial,
                fecha_entrega: fecha_entrega,
                idLibro: idLibro
            }
        })
        console.log(Rta);
        return res.status(200).json({ mensaje: "Se ha actualizado el prestamo correctamente" });

    } catch (e) {
        return res.status(500).json({ message: `Se ha producido un error , error=> ${e}` });
    }
}

export const EliminarPrestamoPorID = async (req: Request, res: Response) => {
    try {

        const ID = parseInt(req.params.id);

        let prestamo = await prisma.prestamos.delete({
            where: {
                id: ID
            }
        })

        if (prestamo != null) {
            return res.status(200).json({ message: "Prestamo Eliminado con Exito" });
        }
        else {
            return res.status(404).json({ message: "Prestamo no encontrado" });
        }

    } catch (e) {
        return res.status(500).json({ message: `Se ha producido un error , error=> ${e}` });
    }
}





const verificarLibroExistente = async (idLibro: number) => {
    try {
        const libroExistente = await prisma.libros.findUnique({
            where: {
                isbn: idLibro
            }
        });
        return libroExistente !== null;
    } catch (error) {
        console.error("Error al verificar el libro existente:", error);
        return false;
    }
};