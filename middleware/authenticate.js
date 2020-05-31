const bcrypt = require('bcrypt')

const authenticate = async (passwd, hash) => {
  const isGood = bcrypt.compare(passwd, hash)

  return isGood
}

module.exports = authenticate
