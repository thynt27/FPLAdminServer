
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const reportSchema = new Schema({
    id: { type: ObjectId },
    room: { type: String },
    image: { type: String },
    rating:
    {
        rating_description: String,
        rating_date: { type: Date, default: Date.now }
    },
    status_report:{type:String},
    description: { type: String },
    date: { type: Date, default: Date.now },
    incident: {type: ObjectId, ref: 'incident'}, //khoá ngoại
    User_id:{type: ObjectId, ref: 'user'}, //khoá ngoại


});

module.exports = mongoose.models.report || mongoose.model('report', reportSchema);