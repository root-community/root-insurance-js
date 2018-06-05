const nock = require('nock')
fs = require('fs')

const {base_url} = require('../helpers')
const {app_secret} = require('../helpers')

var {InputError} = require('../../lib/errors')

const root = require('../../index')(app_secret)

const claim_id = 'd3d13c48-4dc3-4816-8d01-de321587822'

describe('Claims', () => {

  describe('listClaims', () => {
    it('gets from the correct url', async () => {
      const scope = nock(base_url)
        .get('/claims')
        .reply(200, [])

      await root.listClaims()

      expect(scope.isDone()).toEqual(true)
    })

    describe('with a query', () => {
      it('passes the given status', async () => {
        const scope = nock(base_url)
          .get('/claims')
          .query({status: 'open'})
          .reply(200, [])

        await root.listClaims({status: 'open'})

        expect(scope.isDone()).toEqual(true)
      })
    })
  })

  describe('getClaim', () => {
    it('gets from the correct url', async () => {
      const scope = nock(base_url)
        .get(`/claims/${claim_id}`)
        .reply(200, [])

      await root.getClaim(claim_id)

      expect(scope.isDone()).toEqual(true)
    })
  })

  describe('openClaim', () => {
    describe('without arguments', () => {
      it('posts to the correct url', async () => {
        const scope = nock(base_url)
          .post(`/claims`)
          .reply(200, [])

        await root.openClaim()

        expect(scope.isDone()).toEqual(true)
      })
    })

    describe('given a policy id', () => {
      const policy_id = '8349345c-a6c5-4bf9-8ebb-6bbfc1628715'
      it('posts the correct data', async () => {
        const scope = nock(base_url)
          .post(`/claims`, {policy_id: policy_id})
          .reply(200, [])

        await root.openClaim({policy_id: policy_id})

        expect(scope.isDone()).toEqual(true)
      })
    })

    describe('given a policy holder id', () => {
      const policyholder_id = '8349345c-a6c5-4bf9-8ebb-6bbfc1628715'
      it('posts the correct data', async () => {
        const scope = nock(base_url)
          .post(`/claims`, {policyholder_id: policyholder_id})
          .reply(200, [])

        await root.openClaim({policyholder_id: policyholder_id})

        expect(scope.isDone()).toEqual(true)
      })
    })
  })

  describe('updateClaim', () => {
    const incident_type = 'Theft'
    const incident_date = '2017-10-16T10:12:02.872Z'
    const incident_cause = 'Device stolen during burglary'
    const app_data = {key3: 'valuen 3'}
    const requested_amount = 13000000

    const patch_data = {
      incident_type,
      incident_date,
      incident_cause,
      app_data,
      requested_amount
    }

    it('patches the correct url with the correct data', async () => {
      const scope = nock(base_url)
        .patch(`/claims/${claim_id}`, patch_data)
        .reply(200, [])

      await root.updateClaim({id: claim_id, ...patch_data})

      expect(scope.isDone()).toEqual(true)
    })

    it('raises an InputError of the if the id is not supplied', () => {
      root.updateClaim(patch_data)
        .then((data) => expect(false).toEqual(true))
        .catch((error) => { expect(error.message).toEqual('id required') })
    })
  })

  describe('linkPolicyToClaim', () => {
    const policy_id = '8349345c-a6c5-4bf9-8ebb-6bbfc1628715'

    it('posts to the correct url', async () => {
      const scope = nock(base_url)
          .post(`/claims/${claim_id}/policy`, {policy_id: policy_id})
          .reply(200, [])

        await root.linkPolicyToClaim({claim_id, policy_id})

        expect(scope.isDone()).toEqual(true)
    })
  })

  describe('linkPolicyholderToClaim', () => {
    const policyholder_id = '8349345c-a6c5-4bf9-8ebb-6bbfc1628715'

    it('posts to the correct url', async () => {
      const scope = nock(base_url)
          .post(`/claims/${claim_id}/policyholder`, {policyholder_id: policyholder_id})
          .reply(200, [])

        await root.linkPolicyholderToClaim({claim_id, policyholder_id})

        expect(scope.isDone()).toEqual(true)
    })
  })

  describe('listClaimEvents', () => {
    it('gets from the correct url', async () => {
      const scope = nock(base_url)
        .get(`/claims/${claim_id}/events`)
        .reply(200, [])

      await root.listClaimEvents(claim_id)

      expect(scope.isDone()).toEqual(true)
    })
  })

  describe('createClaimAttachment', () => {
    const file_path = './spec/support/unicorn.png'
    const buffer = new Buffer(fs.readFileSync(file_path))
    const base64_data = buffer.toString('base64')

    const description = "A description"

    const expected_data = {
      file_base64: base64_data,
      file_name:   'unicorn.png',
      file_type:   'image/png',
      description: description
    }

    describe('given a file path', () => {
      it('posts the correct data', async () => {
        const scope = nock(base_url)
          .post(`/claims/${claim_id}/attachments`, expected_data)
          .reply(200, [])

        await root.createClaimAttachment({id: claim_id, path: file_path, description: description})

        expect(scope.isDone()).toEqual(true)
      })
    })

    describe('given a base64 encoded string', () => {
      it('posts the correct data', async () => {
        const scope = nock(base_url)
          .post(`/claims/${claim_id}/attachments`, expected_data)
          .reply(200, [])

        await root.createClaimAttachment({id: claim_id, base64: base64_data, file_name: 'unicorn.png', file_type: 'image/png', description: description})

        expect(scope.isDone()).toEqual(true)
      })
    })


  })

})

