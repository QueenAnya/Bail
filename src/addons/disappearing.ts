import { Boom } from '@hapi/boom'

/** Seconds in one day. */
const DAY = 86400

/**
 * Shorthand values accepted by `sock.updateDefaultDisappearingMode` / `updateDefaultDisappearing` /
 * `updateDisappearingDuration`:
 *
 * | value   | meaning                | seconds   |
 * | ------- | ---------------------- | --------- |
 * | `0`     | off                    | `0`       |
 * | `1`/`24`| 24 hours (1 day)       | `86400`   |
 * | `7`     | 7 days                 | `604800`  |
 * | `30`    | 30 days                | `2592000` |
 * | `90`    | 90 days                | `7776000` |
 *
 * Any other number is taken as a number of seconds (so `86400`, `604800`, ... keep working as before).
 */
export const DISAPPEARING_SHORTHANDS: Readonly<Record<number, number>> = {
	0: 0,
	1: DAY,
	24: DAY,
	7: 7 * DAY,
	30: 30 * DAY,
	90: 90 * DAY
}

/** Converts `24` / `1` / `7` / `30` / `90` (hours / days) to seconds; every other value is returned as seconds. */
export const normalizeDisappearingDuration = (duration: number | string): number => {
	const value = typeof duration === 'string' ? Number(duration.trim()) : duration
	if (typeof value !== 'number' || !Number.isFinite(value) || value < 0 || !Number.isInteger(value)) {
		throw new Boom(`Invalid disappearing duration: ${String(duration)}`, { statusCode: 400 })
	}

	return DISAPPEARING_SHORTHANDS[value] ?? value
}
