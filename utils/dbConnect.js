import mongoose from 'mongoose'

const connection = {}
let db;

// check if there is already a connection to our db
async function dbConnect() {
  if (connection.isConnected) {
    return
  }

  db = await mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })

  // readyState = 'we are connected'
  connection.isConnected = db.connections[0].readyState
}

export default dbConnect
// exports dbConnect
// exports db
