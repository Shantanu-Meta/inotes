const mongoose = require('mongoose')
const { Schema } = mongoose;

const NoteSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    title: {
        type: String, 
        require: true,
    },
    description:{
        type: String, 
        require: true, 
    },
    tag:{
        type: String, 
        default: 'general',
    },
    date:{
        type: Date, 
        default: Date.now()
    }
})

module.exports = mongoose.model('note', NoteSchema)