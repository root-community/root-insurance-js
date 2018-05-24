var {InputError} = require('../errors')

application = {
  async createApplication({policyholder_id, quote_package_id, monthly_premium, serial_number, spouse_id, children_ids, extended_famliy_ids}) {
    if (serial_number && (spouse_id || children_ids || extended_famliy_ids)) {
      throw new InputError("'serial_number' and any of 'spouse_is', 'children_ids' and 'extended_famliy_ids' can not be used in the same application")
    }

    const data = {
      policyholder_id: policyholder_id,
      quote_package_id: quote_package_id,
      monthly_premium: monthly_premium,
      serial_number: serial_number,
      spouse_id: spouse_id,
      children_ids: children_ids,
      extended_famliy_ids: extended_famliy_ids
    }

    return this.post('applications', data)
  }
}

module.exports = application
