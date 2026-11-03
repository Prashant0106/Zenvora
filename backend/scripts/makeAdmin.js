
require('dotenv').config()

const mongoose = require('mongoose')
const User = require('../models/User')

const makeAdmin = async()=>{
  try{
    await mongoose.connect(process.env.MONGO_URI)

    const user = await User.findOne({name: 'admin' })

    if(!user){
      console.log("Admin account not found")
      return
    }
    user.role = 'admin'
    await user.save()
    console.log('Admin role assigned successfully.')
    console.log(`Admin account: ${user.email}`)
  }
  catch(error){
    console.error('Error assigning admin role', error.message)
  }
  finally{
    await mongoose.disconnect()
  }
}
makeAdmin()