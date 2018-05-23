application = {
  async createApplication(options) {
    return this.post('applications', options)
  }
}

module.exports = application
