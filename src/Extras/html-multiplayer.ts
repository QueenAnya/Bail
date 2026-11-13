/**
 * Ported from @rexxhayanasi/elaina-baileys 1.4.x (MIT) - Utils/html-multiplayer.js
 * Copied as-is (JS -> TS); only import paths and parameter types were adapted for tb2.
 * Re-checked against elaina-baileys 1.4.7: the exported surface matches; see PORTED_FROM below.
 */

const escapeForScript = (value: unknown) => JSON.stringify(value).replace(/</g, '\\u003c').replace(/>/g, '\\u003e')

export interface HtmlMultiplayerOptions {
	url?: string
	room?: string
	seat?: string | number | null
	reconnectMs?: number
	maxReconnectMs?: number
}

export const htmlMultiplayerPrelude = ({
	url,
	room,
	seat,
	reconnectMs = 1500,
	maxReconnectMs = 15000
}: HtmlMultiplayerOptions = {}) => {
	if (typeof url !== 'string' || !url.startsWith('wss://')) {
		throw new TypeError('htmlMultiplayerPrelude requires a wss:// url, since the page is not a secure context')
	}

	if (typeof room !== 'string' || room.trim() === '') {
		throw new TypeError('htmlMultiplayerPrelude requires a non-empty room id')
	}

	const config = escapeForScript({ url, room, seat: seat ?? null, reconnectMs, maxReconnectMs })

	return `<script>
(function () {
  var cfg = ${config};
  var listeners = [];
  var queue = [];
  var sock = null;
  var backoff = cfg.reconnectMs;
  var closed = false;

  var api = {
    room: cfg.room,
    seat: cfg.seat,
    connected: false,
    send: function (payload) {
      var frame = JSON.stringify({ room: cfg.room, seat: cfg.seat, data: payload });
      if (sock && sock.readyState === 1) sock.send(frame); else queue.push(frame);
    },
    on: function (fn) { listeners.push(fn); return function () { listeners = listeners.filter(function (f) { return f !== fn }) } },
    close: function () { closed = true; if (sock) try { sock.close() } catch (e) {} }
  };

  function emit(kind, detail) {
    for (var i = 0; i < listeners.length; i++) {
      try { listeners[i](kind, detail) } catch (e) {}
    }
  }

  function open() {
    if (closed || (sock && (sock.readyState === 0 || sock.readyState === 1))) return;
    try { sock = new WebSocket(cfg.url) } catch (e) { emit('error', e); return schedule() }

    sock.onopen = function () {
      backoff = cfg.reconnectMs;
      api.connected = true;
      sock.send(JSON.stringify({ join: cfg.room, seat: cfg.seat }));
      while (queue.length && sock.readyState === 1) sock.send(queue.shift());
      emit('open', null);
    };
    sock.onmessage = function (event) {
      var parsed = event.data;
      try { parsed = JSON.parse(event.data) } catch (e) {}
      emit('message', parsed);
    };
    sock.onclose = function (event) {
      api.connected = false;
      emit('close', event.code);
      schedule();
    };
    sock.onerror = function () { api.connected = false };
  }

  function schedule() {
    if (closed || document.hidden) return;
    setTimeout(open, backoff);
    backoff = Math.min(backoff * 2, cfg.maxReconnectMs);
  }

  document.addEventListener('visibilitychange', function () {
    if (document.hidden) {
      if (sock) try { sock.close() } catch (e) {}
    } else if (!closed) {
      backoff = cfg.reconnectMs;
      open();
    }
  });

  window.addEventListener('pagehide', function () { api.close() });

  window.room = api;
  open();
})();
</script>
`
}

export const withHtmlMultiplayer = (html: string, options?: HtmlMultiplayerOptions) => {
	if (typeof html !== 'string' || html.trim() === '') {
		throw new TypeError('withHtmlMultiplayer requires an HTML string')
	}

	return htmlMultiplayerPrelude(options) + html
}
