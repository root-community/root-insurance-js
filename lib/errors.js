class RootError extends Error {
  constructor(message, details) {
    this.details = details
    super(message)
  }
}

class AuthenticationError extends RootError {}
class InputError extends RootError {}

module.exports = { AuthenticationError, InputError }
