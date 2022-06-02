import { hash, compare } from 'bcryptjs'

export async function hashPassword(pwd) {
  const hashedPasword = await hash(pwd, 12)
  return hashedPasword
}

// checks if plain-text password could match hashed password
export async function verifyPassword(password, hashedPassword) {
  const isValid = await compare(password, hashedPassword)
  return isValid
}
