const express = require('express')
const router = express.Router()
const Product = require('../models/products')
const mongoose = require('mongoose')

// GET all data 
router.get('/', (req, res) => {
    Product.find()
        .select('bookname bookauthor bookdescription bookimage bookcategory bookcount bookprice _id')
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                product: docs
            }
            if (docs.length > 0) {
                res.status(200).json({ response })
            } else {
                res.status(404).json({ message: 'No Data are found in Database' })
            }
        })
        .catch(err => {
            res.status(404).json({ error: err })
        })
})

// ADD all Data
router.post('/', (req, res) => {
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        bookname: req.body.bookname,
        bookauthor: req.body.bookauthor,
        bookdescription: req.body.bookdescription,
        bookcategory: req.body.bookcategory,
        bookimage: req.body.bookimage,
        bookcount: req.body.bookcount,
        bookprice: req.body.bookprice
    })
    product.save().then(result => {
        console.log(result)
        res.status(200).json({
            message: "Insert  products  here",
            createdProduct: result
        })
    }).catch(err => {
        console.log(err)
    })

})

//UPDATE Data
router.patch('/:productId', (req, res) => {
    const id = req.params.productId
    let updateOps = req.body
    Product.update({ _id: id }, { $set: updateOps })
        .exec()
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => {
            res.status(500).json({ error: err })
        })
})

//GET Specific Data
router.get('/:productId', (req, res) => {
    const id = req.params.productId;
    Product.findById(id)
        .exec()
        .then(doc => {
            console.log(doc)
            if (doc) {
                res.status(200).json({ doc })
            } else {
                res.status(404).json({ nessage: 'No data found given ID' })
            }

        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ error: err })
        })
})

//DELETE Data
router.delete('/:productId', (req, res) => {
    const id = req.params.productId

    Product.remove({ _id: id })
        .exec()
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => {
            res.status(500).json({ error: err })
        })
})




module.exports = router
