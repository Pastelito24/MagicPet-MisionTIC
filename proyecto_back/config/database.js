// Conección con la Base de Datos
const mongoose = require ("mongoose"); 

const host = "localhost";  //Nombre del Host
const port = "27017";   //Puerto usado para la conexión
const db = "magic_pet";    //Nombre de la base de datos    


//Proceso de conección con la base de datos
exports.mongoConnect = () => {
    const mongoStringConnection = `mongodb://${host}:${port}/${db}`;
    mongoose.connect(mongoStringConnection);
    mongoose.Promise = global.Promise;
    const dbConnection = mongoose.connection;
    dbConnection.on("error", console.error.bind(console,"Mongodb connection error"))
}       