const {InputError} = require('../errors')
const fs = require('fs')
const filepath = require('path')
const mime = require('mime-types')

claim = {
  async listClaims({status, approval}={}) {
    const query = { status, approval }

    return this.get('claims', query)
  },
  async getClaim(id) {
    return this.get(`claims/${id}`)
  },
  async openClaim({policy_id, policyholder_id, incident_type, incident_cause, incident_date, app_data, claimant, requested_amount}={}) {
    const data = {
      policy_id,
      policyholder_id,
      incident_type,
      incident_cause,
      incident_date,
      app_data,
      claimant,
      requested_amount
    }

    return this.post('claims', data)
  },
  async updateClaim({id, incident_type, incident_date, incident_cause, app_data, requested_amount}) {
    if(id === undefined) {
      throw new InputError('id required')
    }

    const data = {
      incident_type,
      incident_date,
      incident_cause,
      app_data,
      requested_amount
    }
    return this.patch(`claims/${id}`, data)
  },
  async linkPolicyToClaim({claim_id, policy_id}){
    return this.post(`claims/${claim_id}/policy`, {policy_id})
  },
  async linkPolicyholderToClaim({claim_id, policyholder_id}) {
    return this.post(`claims/${claim_id}/policyholder`, {policyholder_id})
  },
  async listClaimEvents(id) {
    return this.get(`claims/${id}/events`)
  },
  async createClaimAttachment({id, path, description, base64, file_name, file_type}) {
    var attachment_data = null
    if (path) {
      attachment_data = this.attachmentFromPath(path, description)
    } else if (base64) {
      attachment_data = this.attachmentFromBase64(base64, description, file_name, file_type)
    }

    return this.post(`claims/${id}/attachments`, attachment_data)
  },

  attachmentFromPath(path, description) {
    const buffer = new Buffer(fs.readFileSync(path))
    const base64_data = buffer.toString('base64')
    return {
      file_base64: base64_data,
      file_name:   filepath.parse(path).base,
      file_type:   mime.lookup(path),
      description: description
    }
  },
  attachmentFromBase64(base64, description, file_name, file_type) {
    return {
      file_base64: base64,
      file_name:   file_name,
      file_type:   file_type,
      description: description
    }
  }

}

module.exports = claim
