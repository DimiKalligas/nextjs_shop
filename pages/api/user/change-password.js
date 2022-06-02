import { getSession } from 'next-auth/client'
import { hashPassword, verifyPassword } from '../../../lib/auth'
import { connectToDatabase } from '../../../lib/db'

// παίρνει τον user από το JWT του cookie, και τσεκάρει στη βάση αν ισχύει το pwd
// αν οκ, το αλλάζει
async function handler(req, res) {
  // async, as getSession returns a promise
  if (req.method !== 'PATCH') {
    return
  }

  // getSession will check req (cookie) for JWT, validate & extract it
  const session = await getSession({ req: req })

  // protect this route against non-authenticated access
  if (!session) {
    // 401: authentication missing
    res.status(401).json({ message: 'Not authenticated..' })
    return
  }

  // [...nextauth].js returns user.email, so that is inserted into the token
  // ..therefore is part of the session - so, we have the user's email
  const userEmail = session.user.email
  // req.body has the email & pwd
  const oldPassword = req.body.oldPassword
  const newPassword = req.body.newPassword

  const client = await connectToDatabase()
  const usersCollection = client.db().collection('users')

  // check for user in db
  const user = await usersCollection.findOne({ email: userEmail })
  console.log('found user', user)
  if (!user) {
    res.status(404).json({ message: 'User not found..' })
    client.close()
    return
  }

  const currentPassword = user.password // get existing pwd from db
  const passwordsAreEqual = await verifyPassword(oldPassword, currentPassword)

  // δεν μπαίνει εδώ...
  if (!passwordsAreEqual) {
    res.status(403).json({ message: 'Invalid password...' }) // authenticated, but not authorized! or, 422 mis-typed password
    client.close()
    return
  }

  const hashedPassword = await hashPassword(newPassword)

  // although we don't need result here
  const result = await usersCollection.updateOne(
    { email: userEmail },
    { $set: { password: hashedPassword } }
  )

  client.close()
  res.status(200).json({ message: 'Password updated!' })
}

export default handler
