import {CorsOptions} from 'cors'

export const corsConfig : CorsOptions = {
    // origin me va a indicar quien esta queriendo conectarse a mi servidor
    origin: function (origin, callback ){
        if(origin === process.env.FRONTEND_URL){
            //callback funciona para redireccionar al usuario si es permitido o no el acceso a la API 
            //Su primer parametro es un error, si no hay error se pasa null y 
            // el segundo parametro es un booleano que indica si se permite o no el acceso a la API 
            callback(null, true);
        }else {
            callback(new Error('Error CORS'));
        }
    }
}