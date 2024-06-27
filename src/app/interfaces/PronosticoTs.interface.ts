export interface PronosticoTs {
    _id: string
    fecha: string
    propiedades: [{ 
        variable: string
        hora: number
        archivo: string
    }]
    graficas: [{
        variable: string,
        archivo: string
    }]
}