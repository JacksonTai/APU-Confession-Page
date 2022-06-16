const mongoose = require('mongoose');
const { Schema } = mongoose;

const ConfessionSchema = new Schema({
    _id: {
        type: Number,
    },
    time: {
        type: Date,
        default: Date.now
    },
    media: {
        type: String
    },
    content: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['Pending', 'Blacklisted'],
        default: 'Pending',
        required: true
    },
}, { _id: false });

ConfessionSchema.virtual('timestamp').get(function () {
    let timestamp = this.time.toISOString().replace('T', '-').split('-');
    let time = this.time.toString().split(' ')[4];
    return `${timestamp[2]}-${timestamp[1]}-${timestamp[0]} ${time}`;
})

ConfessionSchema.virtual('apucpId').get(function () {
    const zeroDigit = 5 - this._id.toString().length;
    let zero = '0'
    return `#APUCP${zero.repeat(zeroDigit) + this._id}`;
})

module.exports = mongoose.model('Confession', ConfessionSchema);