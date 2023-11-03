
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
        rating_date: { type: Date, default: Date.now},
    },

    status_report: { type: ObjectId, default: "653b8409900c3796a66d6640", ref: 'status' },
    description: { type: String },
    date: { type: Date, default: Date.now },
    // report_date: { type: Date, default: Date.now, get: formatDate },
    // report_time: { type: String, get: formatTime },
    receiver: { type: String },
    incident: { type: ObjectId, ref: 'incident' }, //khoá ngoại
    user: { type: ObjectId, ref: 'user' }, //khoá ngoại


});

// function formatDateTime(date) {
//     const options = {
//         year: 'numeric',
//         month: '2-digit',
//         day: '2-digit',
//         hour: '2-digit',
//         minute: '2-digit'
//     };
//     return date.toLocaleString('en-US', options);
// }

// function formatDate(date) {
//     const options = {
//         year: 'numeric',
//         month: '2-digit',
//         day: '2-digit'
//     };
//     return date.toLocaleString('en-US', options);
// }

// function formatTime(date) {
//     return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
// }
module.exports = mongoose.models.report || mongoose.model('report', reportSchema);