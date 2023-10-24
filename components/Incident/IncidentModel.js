
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const reportSchema = new Schema({
    id: { type: ObjectId },
    name_incident: {type: String },
    
});

module.exports = mongoose.models.product || mongoose.model('incident', reportSchema);