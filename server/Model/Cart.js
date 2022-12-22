const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "Users"},
    bookId: { type: mongoose.Schema.Types.ObjectId, ref: "Book"}
})

const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;