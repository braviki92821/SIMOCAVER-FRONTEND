export interface Usuario {
    _id: string
    email: string
    nombre: string
    password?: string
    tipoUsuario: string
    estado: string
}