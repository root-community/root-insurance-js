const nock = require('nock')

const {base_url} = require('../helpers')
const {app_secret} = require('../helpers')

const root = require('../../index')(app_secret)

const call_id = '0ac6dffb-bd15-4829-b96d-e2c1abe61d3a'

describe('Calls', () => {

  describe('listCalls', () => {
    beforeEach(() => {
      scope = nock(base_url)
        .get('/calls')
        .reply(200, [])
    })

    it('gets from the correct url', async () => {
      await root.listCalls()

      expect(scope.isDone()).toEqual(true)
    })
  })

  describe('getCall', () => {
    beforeEach(() => {
      scope = nock(base_url)
        .get(`/calls/${call_id}`)
        .reply(200, [])
    })

    it('gets from the correct url', async () => {
      await root.getCall(call_id)

      expect(scope.isDone()).toEqual(true)
    })
  })

  describe('getCallEvents', () => {
    beforeEach(() => {
      scope = nock(base_url)
        .get(`/calls/${call_id}/events`)
        .reply(200, [])
    })

    it('gets from the correct url', async () => {
      await root.listCallEvents(call_id)

      expect(scope.isDone()).toEqual(true)
    })
  })

})
