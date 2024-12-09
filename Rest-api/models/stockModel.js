const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const stockSchema = new mongoose.Schema({
    stockName: {
        type: String,
        required: true
    },
    stockTicker: {
        type: String,
        required: true
    },
    sharePrice: {
        type: Number,
        required: true
    },
    stockDescription: {
        type: String,
        required: true
    },
    stockLogoLink: {
        type: String,
        required: true
    },
    watchers: [{
        type: ObjectId,
        ref: "User"
    }],
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
}, { timestamps: { createdAt: 'created_at' } });

module.exports = mongoose.model('Stock', stockSchema);
