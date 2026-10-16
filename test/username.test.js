import { test } from 'node:test';
import assert from 'node:assert/strict';
import { USyncQuery } from '../src/WAUSync/USyncQuery.js';
import { USyncUser } from '../src/WAUSync/USyncUser.js';
import { USyncUsernameProtocol } from '../src/WAUSync/Protocols/USyncUsernameProtocol.js';
import { validateUsername, isUsernamePin, displayUsername, stripUsernamePrefix } from '../src/Utils/username.js';

test('usync-username-query-nodes', () => {
    const q = new USyncQuery().withUsernameProtocol();
    q.withUser(new USyncUser().withId('628123@s.whatsapp.net'));
    const proto = q.protocols[0];
    assert.ok(proto instanceof USyncUsernameProtocol);
    assert.deepEqual(proto.getQueryElement(), { tag: 'username', attrs: {} });
    assert.equal(proto.getUserElement(q.users[0]), null);
});

test('usync-username-reverse-parse', () => {
    const q = new USyncQuery().withUsernameProtocol();
    q.withUser(new USyncUser().withId('628123@s.whatsapp.net'));
    q.withUser(new USyncUser().withId('628999@s.whatsapp.net'));
    const result = {
        tag: 'iq',
        attrs: { type: 'result' },
        content: [{ tag: 'usync', attrs: {}, content: [{ tag: 'list', attrs: {}, content: [
            { tag: 'user', attrs: { jid: '628123@s.whatsapp.net' }, content: [{ tag: 'username', attrs: {}, content: 'rexx' }] },
            { tag: 'user', attrs: { jid: '628999@s.whatsapp.net' }, content: [{ tag: 'username', attrs: {}, content: 'elaina' }] }
        ] }] }]
    };
    const parsed = q.parseUSyncQueryResult(result);
    const mapped = parsed.list
        .filter(a => typeof a.username === 'string' && a.username.length > 0)
        .map(({ username, id }) => ({ jid: id, username }));
    assert.deepEqual(mapped, [
        { jid: '628123@s.whatsapp.net', username: 'rexx' },
        { jid: '628999@s.whatsapp.net', username: 'elaina' }
    ]);
});

test('usync-contact-username-nodes', () => {
    const q = new USyncQuery().withContactProtocol();
    q.withUser(new USyncUser().withUsername('rexx').withUsernameKey('1234'));
    q.withUser(new USyncUser().withUsername('elaina'));
    const proto = q.protocols[0];
    assert.deepEqual(proto.getUserElement(q.users[0]), { tag: 'contact', attrs: { username: 'rexx', pin: '1234' } });
    assert.deepEqual(proto.getUserElement(q.users[1]), { tag: 'contact', attrs: { username: 'elaina' } });
});

test('username-validation', () => {
    assert.equal(validateUsername('rexx').isValid, true);
    assert.equal(validateUsername('@rexx').isValid, true);
    assert.equal(validateUsername('ab').isValid, false);
    assert.equal(validateUsername('1234').isValid, false);
    assert.equal(validateUsername('.rexx').isValid, false);
    assert.equal(validateUsername('www.rexx').isValid, false);
    assert.equal(validateUsername('rexx.com').isValid, false);
    assert.equal(validateUsername('whatsapp1').isValid, false);
    assert.equal(isUsernamePin('1234'), true);
    assert.equal(isUsernamePin('12'), false);
    assert.equal(displayUsername('rexx'), '@rexx');
    assert.equal(stripUsernamePrefix('@rexx'), 'rexx');
});
