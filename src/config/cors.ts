import {CorsOptions} from 'cors'

export const corsConfig : CorsOptions = {
    // origin me va a indicar quien esta queriendo conectarse a mi servidor
    origin: function (origin, callback ){

        const whiteList = [process.env.FRONTEND_URL]

        //process es un objeto global de node que nos da informacion sobre el proceso que esta corriendo
        //en el package.json se puede ver que se esta pasando un script que se llama "dev:api" : "nodemon src/index.ts --api",
        //por lo que si se corre el comando npm run dev:api se va a correr el archivo src/index.ts y se va a pasar el argumento --api
        //por lo que process.argv[2] va a ser igual a --api si se corre el comando npm run dev:api 
        if(process.argv[2] === '--api'){
            //Si se esta corriendo el servidor de la API se agrega undefined a la lista de whiteList 
            // para que no haya problemas con el CORS 
            whiteList.push(undefined);
        }
        //callback funciona para redireccionar al usuario si es permitido o no el acceso a la API 
        //Su primer parametro es un error, si no hay error se pasa null y 
        // el segundo parametro es un booleano que indica si se permite o no el acceso a la API 
        if(whiteList.includes(origin)){
            callback(null, true);
        }else {
            callback(new Error('Error CORS'));
        }
    }
}