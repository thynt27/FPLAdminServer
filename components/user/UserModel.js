const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;


const userSchema = new Schema({
    id: { type: ObjectId },
    name: { type: String },
    email: { type: String , default: "", unique: true },
    password: { type: String },
    role: { type: Number },
    image: { type: String },
    isLogin:{type:Boolean,default:false},
    isActive: { type: Boolean, default: true },
    //1:user,100:admin,1000:system
    //1,2
    //or xor and not
});

module.exports = mongoose.models.user || mongoose.model('user', userSchema);