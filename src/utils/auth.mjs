import { User } from '../resources/user/user.model.mjs'
import jwt from 'jsonwebtoken'
const env = process.env.NODE_ENV

// given a user object, new JWOT based on user id
// user in token out
export const newToken = (user) => {
  env
  // encoding id: user.id data
  return jwt.sign(
    { id: user.id },
    // the server side code private key
    process.env.JWT_KEY,
    {
      expiresIn: '1hr',
    }
  )
}

// given a token, verify it was created and return payload/user
// token in user out
export const verifyToken = (token) =>
  new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_KEY, (err, payload) => {
      if (err) return reject(err)
      resolve(payload)
    })
  })

// new user controller
export const signup = async (req, res) => {
  // require email and password on the body, then create new user
  if (!req.body.email || !req.body.password) {
    return res.status(400).send({ message: 'Please enter email and password.' })
  }
  try {
    const user = await User.create(req.body)
    const token = newToken(user)
    res.send({ token })
  } catch (e) {
    console.error(e)
    return res.status(400).end('Email already exists, please use another.')
  }
}

// signin controller
export const signin = async (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).send({ message: 'Please enter email and password.' })
  }
  const user = await User.findOne({ email: req.body.email }).exec()

  if (!user) {
    return res.status(401).send({ message: 'Email not found.' })
  }
  try {
    const match = await user.checkPassword(req.body.password)
    if (!match) {
      return res.status(401).send({ message: 'Password not found.' })
    }
    const token = newToken(user)
    return res.status(200).send({ token })
  } catch (e) {
    console.error(e)
    return res.status(401).send({ message: 'Not authorized.' })
  }
}

// protected middleware to lock API routes
// check for valid token and block if not
export const protect = async (req, res, next) => {
  const bearer = req.headers.authorization

  if (!bearer || !bearer.startsWith('Bearer ')) {
    return res.status(401).send({ message: 'Issue with Bearer.' })
  }

  let token = bearer.split('Bearer ')[1].trim()

  let payload
  try {
    payload = await verifyToken(token, process.env.JWT_KEY)
  } catch (e) {
    return res.status(401).send({ message: 'Token not verified.' })
  }

  const user = await User.findById(payload.id).select('-password').lean().exec()

  if (!user) {
    return res.status(401).send({ message: 'User not found' })
  }

  req.user = user
  next()
}

export const userControllers = () => ({
  signup: signup,
  signin: signin,
  protect: protect,
})
