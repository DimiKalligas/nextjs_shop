import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import { verifyPassword } from '../../../lib/auth'
import { connectToDatabase } from '../../../lib/db'

export default NextAuth({
  // (), so that we execute it - it then returns a handler function

  // to make sure JWT is included, we provide session ->
  session: {
    jwt: true
  },
  providers: [
    Providers.Credentials({
      // τον ψάχνουμε στη βάση, και κάνουμε match (verifyPassword), αν οκ επιστρέφουμε το email
      async authorize(credentials) {
        const client = await connectToDatabase()

        const usersCollection = client.db().collection('users')

        const user = await usersCollection.findOne({ email: credentials.email })

        if (!user) {
          // when throwing an error inside authorize, promise will be rejected by authorize
          // and, by default will redirect the client to another page
          client.close()
          throw new Error('No user found..')
        }

        const isValid = await verifyPassword(
          credentials.password,
          user.password
        )

        if (!isValid) {
          client.close()
          throw new Error('Could not log you in..')
        }

        client.close()

        // if we return an object inside of authorize, then we let NextAuth know that authorization succeeded!
        // this object will be encoded inside JWT
        return { email: user.email }
      }
    })
    // ,
    // Providers.GitHub({
    //   clientId: '',
    //   clientSecret: '',
    // }),
    // Providers.Email({
    //   server: {
    //     host: '',
    //     port: '',
    //     auth: {
    //         user: '',
    //         pass: '',
    //      }
    //   },
    // from: '',
    // })
  ]
})
