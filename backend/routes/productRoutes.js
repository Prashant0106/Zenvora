const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()

const Product = require('../models/Product')
const adminOnly = require('../middleware/adminMiddleware')
const protect = require('../middleware/authMiddleware')


//Get all products
router.get('/', async (req, res) => {

  try {
    const products = await Product.find()

    res.status(200).json({
      success: true,
      count: products.length, products
    })

  }
  catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch products"
    })
  }
})

router.post('/', protect, adminOnly, async (req, res) => {
  try {
    const { name, description, price, category, image, stock } = req.body

    const product = await Product.create({
      name, description, price, category, image, stock
    })
    res.status(201).json({
      success: true,
      message: "Product created successfully", product
    })

  }
  catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    })
  }
})

//PUT - Update a product(admin only)
router.put('/:id', protect, adminOnly, async (req, res) => {
  try {
    const { id } = req.params
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid product ID'
      })
    }
    const allowedFields = ['name', 'description', 'price', 'category', 'image', 'stock']

    const updates = {}
    for(const field of allowedFields){
      if(req.body[field] !== undefined){
        updates[field] = req.body[field]
      }
    }
    if(Object.keys(updates).length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No fields provided for update'
      })
    }
    const product = await Product.findByIdAndUpdate(
      id,
      { $set: updates },
      {
        new: true, runValidators: true
      }
    )
    if(!product){
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      })
    }
    res.status(200).json({
      success:true,
      message: 'Product updated successfully'
    })
  }
  catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    })
  }
})

//DELETE - Delete a product (admin only)
router.delete('/:id', protect, adminOnly, async (req, res)=>{
  try{
    const { id } = req.params 
    if(!mongoose.isValidObjectId(id)){
      return res.status(400).json({
        success: false,
        message: 'Invalid Product ID'
      })
    }

    const product = await Product.findByIdAndDelete(id)
    if(!product){
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      })
    }
    res.status(200).json({
      success:true,
      message:'Product deleted successfully',
      product
    })
  }
  catch(error){
    res.status(500).json({
      success: false,
      message: 'Failed to delete product'
    })
  }
})
module.exports = router