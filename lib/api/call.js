call = {
  async listCalls() {
    return this.get('calls')
  },
  async getCall(id) {
    return this.get(`calls/${id}`)
  },
  async listCallEvents(id) {
    return this.get(`calls/${id}/events`)
  }
}

module.exports = call
