Client = require('./client');

class Root extends Client {
  constructor(secret_key, environment) {
    const subdomain = environment === 'production' ? 'api' : 'sandbox'
    const base_url = `https://${subdomain}.root.co.za/v1/insurance`
    const auth = {username: secret_key, password: ''}

    super(base_url, auth)
  }

}

Object.assign(Root.prototype,
  require('./api/call'),
  require('./api/application'),
  require('./api/quote')
)

module.exports = Root
