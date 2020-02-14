const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    bookname: String,
    bookauthor: String,
    bookdescription:String,
    bookcategory:String,
    bookimage:String,
    bookcount: Number,
    bookprice: Number
})

module.exports = mongoose.model('Product', productSchema )
