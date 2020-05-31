const bcrypt = require('bcrypt')

const rounds = 10

const hashPassword = async (passwd) => {
  const hashedPasswd = await bcrypt.hash(passwd, rounds)

  return hashedPasswd
}

module.exports = hashPassword
