// η μαλακία από το amazona, πότε χρειάζεται η convertDocToObj?
import mongoose from 'mongoose'

const connection = {}

async function connect() {
  if (connection.isConnected) {
    console.log('already connected')
    return
  }
  if (mongoose.connections.length > 0) {
    connection.isConnected = mongoose.connections[0].readyState // [0] is current connection
    if (connection.isConnected === 1) {
      // 1 = connected
      console.log('using current connection')
      return
    }
    await mongoose.disconnect() // else disconnect
  }
  const db = await mongoose.connect(process.env.MONGODB_URI)
  console.log('new connection')
  connection.isConnected = db.connections[0].readyState
}

async function disconnect() {
  if (connection.isConnected) {
    // we don't use disconnect in development to avoid using resources
    if (process.env.NODE_ENV === 'production') {
      await mongoose.disconnect()
      connection.isConnected = false
    } else {
      console.log('in dev env, so not disconnected')
    }
  }
}

// doc object should contain onle primary data types
function convertDocToObj(doc) {
  doc._id = doc._id.toString()
  doc.createdAt = doc.createdAt.toString()
  doc.updatedAt = doc.updatedAt.toString()
  return doc
}

const db = { connect, disconnect, convertDocToObj }
export default db
