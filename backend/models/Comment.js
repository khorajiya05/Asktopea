const mongoose = require('mongoose')
const commentSchema = new mongoose.Schema({
    question_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Question",
    },
    comment: String,
    created_at: {
        type: Date,
        default: Date.now()
    },
    user: Object,
});

module.exports = mongoose.model("Comment", commentSchema)