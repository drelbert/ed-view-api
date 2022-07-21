import mongoose from 'mongoose'
const env = process.env.NODE_ENV

// function to connect to the cluster, calls then disconnects
async function main() {
  env
  const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.ilrml.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`

  mongoose
    .connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log('Connected to the DB.')
    })
    .catch((error) => {
      console.log('Db connection failed.')
      console.error(error)
      process.exit(1)
    })
}

export default main
