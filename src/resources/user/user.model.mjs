// everyting starts with a schema
import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const { Schema } = mongoose

const userSchema = new Schema(
  {
    firstName: { type: String, requied: true },
    lastName: { type: String, requied: true },
    email: { type: String, requied: true },
    password: { type: String, required: true },
    role: {
      type: String,
      required: true,
      enum: ['student', 'parent', 'caseManager', 'administrator'],
      default: 'caseManager',
    },
  },
  { timestamps: true }
)

userSchema.pre('save', function (next) {
  if (!this.isModified('password')) {
    return next()
  }

  bcrypt.hash(this.password, 8, (err, hash) => {
    if (err) {
      return next(err)
    }
    this.password = hash
    next()
  })
})

userSchema.methods.checkPassword = function (password) {
  const passwordHash = this.password
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, passwordHash, (err, same) => {
      if (err) {
        return reject(err)
      }
      resolve(same)
    })
  })
}
export const User = mongoose.model('user', userSchema)
