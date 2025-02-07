const {
    Schema, 
    model
} = require('mongoose')

const urlSchema = new Schema({
    URL:{
        type: String,
        required: true,
    },
    customURL:{
        type: String,
        unique: true,
    }
}, { timestamps: true });

const urlModel = model('url-shortner', urlSchema);

module.exports = urlModel;