export const usersStubGenerator = count =>
  Array(count)
    .fill(null)
    .map((_, i) => ({ nickname: 'user' + i, passwordHash: '123', publicKey: 'pub' }))
