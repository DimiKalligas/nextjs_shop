import { hashPassword } from '../../../lib/auth'
import { connectToDatabase } from '../../../lib/db'

async function handler(req, res) {
  if (req.method !== 'POST') {
    return
  }
  const data = req.body

  const { email, pwd } = data
  console.log(email, pwd)

  // validation
  if (!email || !email.includes('@') || !pwd || pwd.trim().length < 7) {
    res.status(422).json({ message: 'Invalid input..' })
    return
  }

  const client = await connectToDatabase()

  const db = client.db()

  const existingUser = await db.collection('users').findOne({ email: email })
  if (existingUser) {
    res.status(422).json({ message: 'Hey! This user already exists..' })
    client.close()
    return
  }

  // αν δεν βάλουμε το await, θα μπει το promise στη database???...
  // = το password αντί για string θα είναι object
  const hashedPassword = await hashPassword(pwd)

  // result gives us access to generated user_id
  const result = await db.collection('users').insertOne({
    email: email,
    password: hashedPassword
  })

  res.status(201).json({ message: 'Created user!' })
  client.close()
}

export default handler
