const axios = require('axios');

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
    return this.client.get(entity, {params: this.filterQuery(query)})
      .then(response => response.data)
      .catch(error => this.handleError(error))
  }

  put(entity, data) {
    return this.client.put(entity, data)
      .then(response => response.data)
      .catch(error => this.handleError(error))
  }

  patch(entity, data) {
    return this.client.patch(entity, data)
      .then(response => response.data)
      .catch(error => this.handleError(error))
  }

  handleError(error) {
    if (error.response) {
      this.handleResponseError(error)
    } else {
      throw error
    }
  }

  handleResponseError(error) {
    const status = error.response.status
    const data = error.response.data
    const error_message = this.errorMessage(data, status)
    const error_details = this.errorDetails(data)

    switch(status){
      case 400: throw new InputError(error_message, error_details)
      case 401: throw new AuthenticationError(error_message, error_details)
      case 403: throw new AuthenticationError(error_message, error_details)
      default: throw new Error(error_message)
    }
  }

  errorMessage(data, status) {
    return data.error || data.message || `Request failed with status ${status}`
  }

  errorDetails(data) {
    return data.details
  }

  filterQuery(query) {
    const valid_keys = Object.keys(query)
      .filter(key => query[key])

    const cleaned = valid_keys.reduce((result, key) => {
      result[key] = query[key]
      return result
    }, {})

    return cleaned
  }
}


module.exports = Client
