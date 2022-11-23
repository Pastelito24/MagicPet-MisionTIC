const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MascotasSchema = new Schema({
    nombre:{type: String, required: true, max:60},
    nombre_provisional:{type: String, required: true, max:40},
    raza:{type: String, required: true, max:40},
    peso:{type: Number, required: true, max:40},
    vacunas:{type: String, required: false, max:70},
    esterilizado:{type: String, required: false, max:150}
});

module.exports = mongoose.model("mascotas", MascotasSchema); 