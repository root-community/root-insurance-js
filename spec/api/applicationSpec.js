const nock = require('nock')

const {base_url} = require('../helpers')
const {app_secret} = require('../helpers')

const root = require('../../index')(app_secret)

const policyholder_id = 'bf1ada91-eecb-4f47-9bfa-1258bb1e0055'
const quote_package_id = 'f4397823-db4a-4d6a-a06b-08e1a2a3172c'
const monthly_premium = 500 * 100
const serial_number = '1234567890'
const spouse_id = '1234567890'

describe('Applications', () => {

  describe('createApplication', () => {
    const application_data = {
      policyholder_id:  policyholder_id,
      quote_package_id: quote_package_id,
      monthly_premium:  50000
    }

    describe('using the gadgets module (supplying a serial number)', () => {
      const gadgets_application = {...application_data, serial_number: serial_number}

      beforeEach(() => {
        scope = nock(base_url)
          .post('/applications', gadgets_application)
          .reply(200, [])
      })

      it('posts the correct data to /applications', async () => {
        await root.createApplication({
          policyholder_id:  policyholder_id,
          quote_package_id: quote_package_id,
          monthly_premium:  50000,
          serial_number:    serial_number
        })

        expect(scope.isDone()).toEqual(true)
      })
    })

    describe('using the funeral cover module', () => {
      const funeral_application = {...application_data, spouse_id: spouse_id}

      beforeEach(() => {
        scope = nock(base_url)
          .post('/applications', funeral_application)
          .reply(200, [])
      })

      it('posts the correct data to /applications', async () => {
        await root.createApplication({
          policyholder_id:  policyholder_id,
          quote_package_id: quote_package_id,
          monthly_premium:  50000,
          spouse_id:        spouse_id
        })

        expect(scope.isDone()).toEqual(true)
      })
    })

    describe('using the term module', () => {
      const term_application = {...application_data}

      beforeEach(() => {
        scope = nock(base_url)
          .post('/applications', term_application)
          .reply(200, [])
      })

      it('posts the correct data to /applications', async () => {
        await root.createApplication({
          policyholder_id:  policyholder_id,
          quote_package_id: quote_package_id,
          monthly_premium:  50000,
        })

        expect(scope.isDone()).toEqual(true)
      })
    })

  })
})
