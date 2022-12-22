const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
    username: {
        type: String,
    },
    review: {
        type: String,
    },
    idToken: {
        type: String
    },
    bookId: { type: mongoose.Schema.Types.ObjectId, ref: "Book"}
})

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;