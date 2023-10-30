
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const reportSchema = new Schema({
    id: { type: ObjectId },
    room: { type: String },
    image: { type: String },
    verificationToken: String,
    rating: 
    
        {
            rating_description: String,
            rating_date: { type: Date, default: Date.now }
        },
    
    status_report: { type: ObjectId,ref:'status'},
    description: { type: String },
    date: { type: Date, default: Date.now },
    receiver:{type:String},
    incident: { type: ObjectId, ref: 'incident' }, //khoá ngoại
    user: { type: ObjectId, ref: 'user' }, //khoá ngoại


});

module.exports = mongoose.models.report || mongoose.model('report', reportSchema);