import { Request, Response } from 'express';
import { prisma } from "../Libs/prisma"
import { libros } from '@prisma/client';

// METODOS - LOGICA 

export const ConsultarLibros = async (req: Request, res: Response) => {
    try {
        let lista_libros: libros[] = await prisma.libros.findMany(
            {
                include:
                {
                    Rel_categorias: true,
                    Rel_autores: true,
                }
            })

        if (lista_libros.length > 0) {

            let datos = [["Isbn", "Titulo", "Genero", "Año", "Paginas", "Idioma", "Editorial", "Categoria", "Autores"]];

            lista_libros.forEach(libro => {
                datos.push([
                    libro.isbn,
                    libro.titulo,
                    libro.genero,
                    libro.publicacion,
                    libro.paginas,
                    libro.idioma,
                    libro.editorial,
                    (libro as any).Rel_categorias,
                    (libro as any).Rel_autores
                ])
            })

            console.log("lista de libros : Correcto")
            return res.status(200).json(lista_libros);
        }
    }
    catch (e) {
        console.log('Error', e)
        return res.status(500).json({ message: `Se ha producido un error , error=> ${e}` })
    }
}

export const ConsultarLibroPorID = async (req: Request, res: Response) => {
    try {
        const ID = parseInt(req.params.id);

        let libro = await prisma.libros.findFirst({
            where: {
                isbn: ID
            }
        })

        if (libro != null) {
            return res.status(200).json(libro);
        }
        else {
            return res.status(404).json({ message: "Libro no encontrado" });
        }

    } catch (e) {
        console.log('Error', e)
        return res.status(500).json({ message: `Se ha producido un error , error=> ${e}` })
    }
}

export const CrearLibro = async (req: Request, res: Response) => {

    //verificar body
    console.log(req.body);
    // asignar variable rapidamente del Body
    const { titulo, genero, publicacion, paginas, idioma, editorial, idCategoria, idAutor } = req.body;
    try {

        let Rta = await prisma.libros.create({
            data: {
                titulo: titulo,
                genero: genero,
                publicacion: publicacion,
                paginas: paginas,
                idioma: idioma,
                editorial: editorial,
                idCategoria: idCategoria,
                idAutor: idAutor,
            }
        })
        console.log(Rta);
        return res.status(200).json({ mensaje: "Se ha creado el libro correctamente" });

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

export const EliminarLibroPorID = async (req: Request, res: Response) => {
    try {
        const ID = parseInt(req.params.id);

        let libro = await prisma.libros.delete({
            where: {
                isbn: ID
            }
        })

        if (libro != null) {
            return res.status(200).json({ message: "Libro Eliminado con Exito" });
        }
        else {
            return res.status(404).json({ message: "Libro no encontrado" });
        }

    } catch (e) {
        console.log('Error', e)
        return res.status(500).json({ message: `Se ha producido un error , error=> ${e}` })
    }
}

