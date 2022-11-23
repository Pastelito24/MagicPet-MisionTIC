const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FundacionesSchema = new Schema({
    nombre:{type: String, required: true, max:60},
    email:{type: String, required: true, max:40},
    nit:{type: Number, required: true, max:40},
});

module.exports = mongoose.model("fundaciones", FundacionesSchema); 