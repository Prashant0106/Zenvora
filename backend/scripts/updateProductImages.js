const mongoose = require('mongoose')
require('dotenv').config()

const Product = require('../models/Product')

const updateProductImages = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log('MongoDB connected')

    const updates = [
      {
        name: 'Wireless Headphones',
        price: 1499,
        image: '/products/headphone.jpeg'
      },
      {
        name: 'Mechanical Keyboard',
        price: 2499,
        image: '/products/keyboard.jpeg'
      },
      {
        name: 'Mouse',
        price: 1299,
        image: '/products/mouse.jpeg'
      },
      {
        name: 'Wireless Mouse',
        price: 799,
        image: '/products/wireless_mouse.jpeg'
      }
    ]

    for (const item of updates) {
      const updatedProduct = await Product.findOneAndUpdate(
        {
          name: item.name,
          price: item.price
        },
        {
          image: item.image
        },
        {
          new: true
        },
        {
          returnDocument: 'after'
        }
      )
      if (updatedProduct) {
        console.log(`Updated image: ${updatedProduct.name} - ₹${updatedProduct.price}`)
      } else {
        console.log(`Product not found: ${item.name} - ₹${item.price}`)
      }
    }
  }
  catch (error) {
    console.error('Error updating product images:', error)
  } finally {
    await mongoose.disconnect()
    console.log('MongoDB disconnected')
  }
}
updateProductImages()