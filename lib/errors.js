class RootError extends Error {
  constructor(message, details) {
    super(message)
    this.details = details
  }
}

class AuthenticationError extends RootError {}
class InputError extends RootError {}

module.exports = { AuthenticationError, InputError }
