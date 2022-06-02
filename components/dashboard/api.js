export const getUserData = () => {
  return new Promise((resolve, reject) => {
    const data = {
      namename: 'User',
      category: 'Usersson',
      description: 'OlaKala'
    }
    setTimeout(() => resolve(data), 10)
  })
}
