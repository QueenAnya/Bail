/**
 * Argument normalisation shared by the auth adapters.
 *
 * Every adapter accepts its arguments two ways, so callers never have to remember which style a given backend uses:
 *
 *   useXAuthState(a)              // one positional value
 *   useXAuthState(a, b, c)        // positional, in the order documented for that adapter
 *   useXAuthState({ a })          // one option
 *   useXAuthState({ a, b, c })    // the full option object
 *
 * `a` is where the data lives (filename, foldername, dbPath, url, uri, connectionString), `b` is the second level
 * (token, collection, table, connection name) and `c` is the session.
 */

/** True for a plain options object — not a class instance, client, pool or collection handle. */
export const isOptionsObject = (value: unknown): value is Record<string, unknown> => {
	if (!value || typeof value !== 'object' || Array.isArray(value)) {
		return false
	}

	const proto = Object.getPrototypeOf(value)
	return proto === Object.prototype || proto === null
}

/**
 * Turns the accepted call shapes into one options object.
 *
 * - `keys` are the positional names in order, e.g. `['folder', 'session']`.
 * - A plain object first argument is treated as the options object when it carries at least one of `keys`; anything
 *   else (a pool, a collection, a client) is the positional `a`.
 * - A positional slot whose value is a plain object is spread, so `(folder, { session })` still works.
 */
export const normalizeAuthArgs = <T extends object>(
	args: unknown[],
	keys: readonly string[],
	/** every key that marks an argument as an options bag (defaults to `keys`) */
	optionKeys: readonly string[] = keys
): T => {
	const out: Record<string, unknown> = {}
	const first = args[0]

	// An empty object is the options form (`useXAuthState({})` should fail on the missing value, not on a type).
	const firstIsOptions =
		isOptionsObject(first) &&
		(Object.keys(first as object).length === 0 || optionKeys.some(key => key in (first as object)))

	// `({ a }, b, c)`: the first object is only `a`, and b/c still arrive positionally after it.
	let start = 0
	if (firstIsOptions) {
		for (const [key, value] of Object.entries(first as object)) {
			if (value !== undefined) {
				out[key] = value
			}
		}

		start = 1
	}

	for (let i = start; i < args.length; i++) {
		const value = args[i]
		if (value === undefined) {
			continue
		}

		const key = keys[i]
		if (!key) {
			break
		}

		// A later slot may be an option bag — `(a, { b, c })`, `(a, { b }, c)`, `(a, b, { c })`. The first slot never
		// is: that one is the handle itself (a store, a collection, a pool, a path).
		if (i > start && isOptionsObject(value)) {
			for (const [k, v] of Object.entries(value)) {
				if (v !== undefined) {
					out[k] = v
				}
			}
		} else {
			out[key] = value
		}
	}

	return out as T
}

/** Normalises `a` when it may also arrive as `{ foldername }` / `{ filename }` / `{ dbpath }`. */
export const pickAlias = <T>(source: object, names: readonly string[]): T | undefined => {
	const record = source as Record<string, unknown>
	for (const name of names) {
		const value = record[name]
		if (value !== undefined && value !== null) {
			return value as T
		}
	}

	return undefined
}

/**
 * When a positional first argument is a live handle (a client, a pool, a collection, a database) it lands in the
 * "location" key, which expects a string. Move it to the key the adapter actually reads for that handle.
 */
export const promoteHandle = <T extends object>(
	opts: T,
	from: readonly string[],
	to: string,
	/** decides whether the value really is a live handle (a client, pool, collection, database) */
	looksLikeHandle: (value: unknown) => boolean = value => typeof value === 'object' && !isOptionsObject(value)
): T => {
	const record = opts as Record<string, unknown>
	for (const key of from) {
		const value = record[key]
		if (value !== undefined && value !== null && looksLikeHandle(value)) {
			record[to] = value
			delete record[key]
			return opts
		}
	}

	return opts
}
