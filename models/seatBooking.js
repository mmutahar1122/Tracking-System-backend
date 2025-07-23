const mongoose = require('mongoose');

const seatBookingSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phoneNo: {
    type: String,
    required: true
},
cnic: {
    type: String,
    required: true
},
    date: {
        type: Date,
        required: true
    },
    from: {
        type: String,
        required: true
    },
    to: {
        type: String,
        required: true
    },
    busNo: {
        type: String, // ✅ changed to String for alphanumeric values
        required: true
    },
    seatSelected: {
    type: [Number], // array of seat numbers
    required: true
},
    totalPrice: {
        type: Number,
        required: true
    }
});

const SeatBook = mongoose.model('ReservedSeats', seatBookingSchema);

module.exports = SeatBook;
