
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const moment = require('moment');



const reportSchema = new Schema({
    id: { type: ObjectId },
    room: { type: String },
    image: [{type: String}],
    verificationToken: String,
    rating: 
    
        {
            rating_description: {type:String},
            rating_date: { type: Date, default: Date.now },
            star:{type:Number,default:0}
        },
    
    status_report: { type: ObjectId,default:"653b8409900c3796a66d6640",ref:'status'},
    description: { type: String },
    date: { type: Date, default: Date.now },
    receiver: { type: String },
    incident: { type: ObjectId, ref: 'incident' }, //khoá ngoại
    user: { type: ObjectId, ref: 'user' }, //khoá ngoại


});

reportSchema.virtual('formattedDate').get(function() {
    return moment(this.date).format('DD/MM/YYYY');
});

reportSchema.virtual('formattedTime').get(function() {
    return moment(this.date).format('HH:mm');
});

module.exports = mongoose.models.report || mongoose.model('report', reportSchema);