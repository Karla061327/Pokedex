
//Mapear las variables de entorno a un objeto de configuracion de variabes de entorno, validas las variables
export const EnvConfiduration = () => ({
    environment: process.env.NODE_ENV || 'dev',
    mongodb: process.env.MONGODB,
    port: process.env.PORT || 3001,
    defaultLimit: process.env.DEFAULT_LIMIT || 7,
})