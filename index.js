Root = require('./lib/root')

module.exports = function(secret_key, environment='sandbox') {
  return new Root(secret_key, environment)
}
