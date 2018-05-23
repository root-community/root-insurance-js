axios = require('axios');

var {AuthenticationError} = require('./errors')
var {InputError} = require('./errors')

class Client {
  constructor(base_url, auth) {
    this.client = axios.create({
      auth: auth,
      baseURL: base_url,
      timeout: 10000,
      headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
    });
  }

  post(entity, data) {
    return this.client.post(entity, data)
      .then(response => response.data)
      .catch(error => this.handleError(error))
  }

  get(entity, query={}) {
    return this.client.get(entity)
      .then(response => response.data)
      .catch(error => this.handleError(error))
  }

  put(entity, data) {
    return this.client.put(entity, data)
      .then(response => response.data)
      .catch(error => this.handleError(error))
  }

  patch(entity, data) {
    return this.client.patch(data)
      .then(response => response.data)
      .catch(error => this.handleError(error))
  }

  handleError(error) {
    const status = error.response.status
    const data = error.response.data
    const error_message = this.errorMessage(data, status)

    switch(status){
      case 400: throw new InputError(error_message)
      case 401: throw new AuthenticationError(error_message)
      case 403: throw new AuthenticationError(error_message)
      default: throw new Error(error_message)
    }
  }

  errorMessage(data, status) {
    return data.error || data.message || `Request failed with status ${status}`
  }

}


module.exports = Client
