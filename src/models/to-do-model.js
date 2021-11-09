const { model, Schema } = require("mongoose");

const toDoSchema = new Schema({
    title: {
        type: Schema.Types.String,
        required: true,
    },
    description: {
        type: Schema.Types.String,
        required: true,
    },
    dateCreate: {
        type: Schema.Types.Date,
        required: true,
        default: new Date()
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user',
    }
})

const toDoModel = model('to-do', toDoSchema);

module.exports = {
    toDoSchema,
    toDoModel
};