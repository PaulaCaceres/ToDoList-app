const mongoose = require ('mongoose');

const PostSchema = mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    done: {
        type: Boolean,
        require: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Post', PostSchema);