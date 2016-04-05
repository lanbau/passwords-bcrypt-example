const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const UserSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String, required: true, unique: true},
  password: { type: String, required: true}
})

// next is mongoose's callback
UserSchema.pre('save', function(next) {
  const user = this

  // generate a salt
  bcrypt.genSalt(5, function(err, salt) {
    if (err) return next(err)

    // use generated salt
    // hash is produced with generated salt
    bcrypt.hash(user.password, salt, function(err, hash) {
      if (err) return next(err)

      // replace the password with encrypted
      user.password = hash
      next()
    })
  })
})

UserSchema.methods.authenticate = function(password, callback) {
  bcrypt.compare(password, this.password, function(err, isMatch) {
    callback(err, isMatch)
  })
}

module.exports = mongoose.model('User', UserSchema)
