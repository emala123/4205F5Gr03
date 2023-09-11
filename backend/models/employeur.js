const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const employeurSchema = new Schema({
    nomEtreprise: {type:String, required: true},
    adresse: {type:String, required:true, unique:true},
    prenom : {type:String, required: true},
    nom : {type:String, required: true},
    telephone: {type:String, required:true, unique: true},
    posteTelephone: {type:String, required:true, unique:true},
    courriel: {type: String, required: true, unique:true},
    motDePasse: {type: String, required: true, minLength: 6},
    stages:[{type:mongoose.Types.ObjectId, required:true, ref:"Stage"}]
})

module.exports = mongoose.model("Employeur", employeurSchema);