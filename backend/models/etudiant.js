const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const etudiantSchema = new Schema({
    prenom : {type:String, required: true},
    nom : {type:String, required: true},
    courriel: {type: String, required: true, unique:true},
    adresse: {type:String, required:true, unique:true},
    motDePasse: {type: String, required: true},
    telephone: {type:String, required:true, unique: true},
    postulations: [
        {
          stage: { type: mongoose.Types.ObjectId, required:true, ref: "Stage" },
          datePostulation: { type: String, required:true }
        }
      ]
})

module.exports = mongoose.model("Etudiant", etudiantSchema);