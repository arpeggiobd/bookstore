const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const bookSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    createdBy: {
        type: String,
        required: true
    },
    image: {
        type: String,
    },
    review: {
        type: String
    }
});

const Book = mongoose.model("Book", bookSchema);

module.exports = Book

