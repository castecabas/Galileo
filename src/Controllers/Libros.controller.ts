// #region IMPORTS
import { Request, Response } from 'express';
import { prisma } from "../Libs/prisma"
import { libros ,autores,generos} from '@prisma/client';

// #region GET-ALL
export const ConsultarLibros = async (req: Request, res: Response) => {
    try {
        let lista_libros: libros[] = await prisma.libros.findMany(
            {
                include:
                {
                    Rel_generos: true,
                    Rel_autores: true,
                }
            })

        if (lista_libros.length > 0) {

            /* IMPRIMIRLO EN LA CONSOLA
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
            console.log("lista de libros : Correcto" , datos)
            */

            return res.status(200).json(lista_libros);
        }
        else{
            return res.status(500).json({mensaje:"No se ha encontrado lista de libros"});
        }
    }
    catch (e) {
        console.log('Error', e)
        return res.status(500).json({ message: `Se ha producido un error , error=> ${e}` })
    }
}

// #region GET-ID
export const ConsultarLibroPorID = async (req: Request, res: Response) => {
    try {
        const ID = parseInt(req.params.id);

        let libro = await prisma.libros.findUnique({
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

// #region POST
export const CrearLibro = async (req: Request, res: Response) => {

    const { titulo, categoria, publicacion, paginas, idioma, editorial, idGenero, idAutor } = req.body;
    try {
        
        // validacion de ID foraneas
        const autorExistente = await verificarAutorExistente(idAutor);
        const generoExistente = await verificarGeneroExistente(idGenero);
        if (!autorExistente) {
            return res.status(500).json({ mensaje: "El ID del autor no existe para asignarlo" });
        }
        if (!generoExistente) {
            return res.status(500).json({ mensaje: "El ID del género no existe para asignarlo" });
        }
        //si cumplen , crear:
        let Rta = await prisma.libros.create({
            data: {
                titulo: titulo,
                categoria: categoria,
                publicacion: publicacion,
                paginas: paginas,
                idioma: idioma,
                editorial: editorial,
                idGenero: idGenero,
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

// #region PUT
export const ModificarLibroPorID = async (req: Request, res: Response) => {
    try {
        const{titulo,categoria,publicacion,paginas,idioma,editorial,idGenero,idAutor} = req.body;
        const ID = parseInt(req.params.id);
        let Rta = await prisma.libros.update({
            where:{
                isbn:ID
            },
            data:{
                titulo:titulo,
                categoria:categoria,
                publicacion:publicacion,
                paginas:paginas,
                idioma:idioma,
                editorial:editorial,
                idGenero:idGenero,
                idAutor:idAutor 
            }
        })
        console.log(Rta);
        return res.status(200).json({ mensaje: "Se ha actualizado el libro correctamente" });
    } catch (e) {
        return res.status(500).json({ message: `Se ha producido un error , error=> ${e}` })
    }
}
// #region DELETE
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


// #region Verificaciones
const verificarAutorExistente = async (idAutor: number) => {
    try {
        const autorExistente = await prisma.autores.findUnique({
            where: {
                id: idAutor
            }
        });
        return autorExistente !== null; 
    } catch (error) {
        console.error("Error al verificar el autor existente:", error);
        return false; 
    }
};

const verificarGeneroExistente = async (idGenero: number) => {
    try {
        const generoExistente = await prisma.generos.findUnique({
            where: {
                id: idGenero
            }
        });
        return generoExistente !== null;
    } catch (error) {
        console.error("Error al verificar el género existente:", error);
        return false; 
    }
};