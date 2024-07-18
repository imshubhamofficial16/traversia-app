const mongoose =  require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: { type: String, required: true},
    username: { type: String, required: true, unique: true},
    password: { type: String, required: true},
    role: { 
        name: {type: String, required: true}, 
        permissions: [String]
    },
})

 module.exports = mongoose.model('Users', userSchema);
 