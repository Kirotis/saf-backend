const { Schema, model } = require("mongoose");

const userSchema = new Schema({
    email: {
        type: Schema.Types.String,
        required: true
    },
    password: {
        type: Schema.Types.String,
        required: true
    },
    toDoList: [{
        type: Schema.Types.ObjectId,
        ref: 'to-do',
    }],
    dateCreate: Schema.Types.Date,
    isConfirm: Schema.Types.Boolean
})

const userModel = new model('user', userSchema);

module.exports = {
    userSchema,
    userModel
}