
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const statusSchema = new Schema({
    id: { type: ObjectId },
    name_status: {type: String },
    
});

module.exports = mongoose.models.product || mongoose.model('status', statusSchema);