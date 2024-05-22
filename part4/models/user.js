const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  username: {
        type: String,
        required: true,
        minLength: 3
    },
  password: String,
  name: String
})

UserSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.password
  }
})

module.exports = mongoose.model('User', UserSchema)