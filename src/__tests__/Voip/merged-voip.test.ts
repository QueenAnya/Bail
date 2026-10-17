import { jest } from '@jest/globals'
import * as publicVoip from '../../Voip'
import * as ported from '../../ported'

describe('unified VoIP public API', () => {
  it('exports one client without separate Voip2 aliases', () => {
    expect(typeof publicVoip.makeVoipClient).toBe('function')
    expect(typeof publicVoip.MergedVoipClient).toBe('function')
    expect(publicVoip.CallState.Idle).toBe(0)
    expect('makeVoipClient2' in ported).toBe(false)
    expect('VoipClient2' in ported).toBe(false)
    expect('ActiveCall2' in ported).toBe(false)
  })

  it('routes Anya multi-call methods automatically without a backend option', async () => {
    const single = { callId: 'single' }
    const batch = [{ callId: 'batch' }]
    const socket = {
      ws: {},
      initiateCall: jest.fn(async () => single),
      initiateCalls: jest.fn(async () => batch),
      getActiveCallCount: jest.fn(async () => 0),
      disconnectVoip: jest.fn()
    }
    const client = new publicVoip.MergedVoipClient({ socket })
    await client.connect()
    await expect(client.initiateCall('1234567890')).resolves.toBe(single)
    await expect(client.initiateCalls([{ jid: '1234567890' }])).resolves.toBe(batch)
    expect(socket.initiateCall).toHaveBeenCalledWith('1234567890', {})
    expect(socket.initiateCalls).toHaveBeenCalledWith([{ jid: '1234567890' }])
    client.disconnect()
    expect(socket.disconnectVoip).toHaveBeenCalledTimes(1)
  })

  it('selects the media engine from call() and does not require backend config', async () => {
    const client = new publicVoip.MergedVoipClient({ socket: { ws: {}, getActiveCallCount: async () => 0 } })
    const error = new Error('test media engine setup')
    const ensure = jest.fn(async () => { throw error })
    ;(client as any)._ensureEngineKind = ensure
    await expect(client.call('1234567890')).rejects.toBe(error)
    expect(ensure).toHaveBeenCalledWith('elaina')
  })

  it('prevents switching engines while socket-managed calls are active', async () => {
    const socket = {
      ws: {},
      initiateCall: jest.fn(),
      getActiveCallCount: jest.fn(async () => 1)
    }
    const client = new publicVoip.MergedVoipClient({ socket })
    await expect(client.call('1234567890')).rejects.toThrow(/active socket-managed calls/i)
  })
})
