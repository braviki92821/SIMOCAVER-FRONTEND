export interface Bitacora {
    _id: string
    accion: string
    fecha: string
    usuario: {
        email: string
        nombre: string
    }
}