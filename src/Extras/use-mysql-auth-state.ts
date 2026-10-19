/**
 * Ported from @rexxhayanasi/elaina-baileys (MIT) - Utils/use-mysql-auth-state.js, rewritten in TypeScript.
 *
 * Stores the auth state in MySQL / MariaDB (`mysql2`, a runtime dependency).
 */
import { type AuthStore, type DatabaseAuthState, loadOptionalModule, makeAuthStateFromStore } from './auth-store'

export interface MySQLAuthStateOptions {
	/** an existing `mysql2/promise` pool (it is NOT closed by `close()`) */
	pool?: any
	/** connection URI, used when no pool is given */
	uri?: string
	/** `mysql2` pool config, used when no pool is given */
	config?: any
	/** table name (plain identifier), default `baileys_auth` */
	table?: string
	/** session name, lets several bots share one table, default `default` */
	session?: string
}

const quoteIdentifier = (name: string): string => {
	if (!/^[A-Za-z_][A-Za-z0-9_]*$/.test(name)) {
		throw new Error(`table name must be a plain identifier, got ${JSON.stringify(name)}`)
	}

	return `\`${name}\``
}

export async function useMySQLAuthState(opts: MySQLAuthStateOptions = {}): Promise<DatabaseAuthState> {
	const table = quoteIdentifier(opts.table ?? 'baileys_auth')
	const session = opts.session ?? 'default'
	let pool = opts.pool
	let owned = false

	if (!pool) {
		if (!opts.uri && !opts.config) {
			throw new Error('useMySQLAuthState needs a pool, a uri, or a config')
		}

		const mysql = await loadOptionalModule('mysql2/promise', 'useMySQLAuthState')
		pool = mysql.createPool(opts.config ?? opts.uri)
		owned = true
	}

	await pool.query(`CREATE TABLE IF NOT EXISTS ${table} (
		session VARCHAR(128) NOT NULL,
		type VARCHAR(128) NOT NULL,
		id VARCHAR(255) NOT NULL,
		value LONGTEXT NOT NULL,
		PRIMARY KEY (session, type, id)
	) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4`)

	const upsert = `INSERT INTO ${table} (session, type, id, value) VALUES (?, ?, ?, ?)
		ON DUPLICATE KEY UPDATE value = VALUES(value)`

	const store: AuthStore = {
		read: async (type, id) => {
			const [rows] = await pool.query(`SELECT value FROM ${table} WHERE session = ? AND type = ? AND id = ?`, [
				session,
				type,
				id
			])
			return rows[0]?.value ?? null
		},
		readMany: async (type, ids) => {
			if (!ids.length) {
				return {}
			}

			const [rows] = await pool.query(`SELECT id, value FROM ${table} WHERE session = ? AND type = ? AND id IN (?)`, [
				session,
				type,
				ids
			])
			const found: Record<string, string> = {}
			for (const row of rows) {
				found[row.id] = row.value
			}

			return found
		},
		write: async (type, id, value) => {
			await pool.query(upsert, [session, type, id, value])
		},
		apply: async (writes, removals) => {
			const connection = await pool.getConnection()
			try {
				await connection.beginTransaction()
				for (const entry of writes) {
					await connection.query(upsert, [session, entry.type, entry.id, entry.value])
				}

				for (const entry of removals) {
					await connection.query(`DELETE FROM ${table} WHERE session = ? AND type = ? AND id = ?`, [
						session,
						entry.type,
						entry.id
					])
				}

				await connection.commit()
			} catch (err) {
				await connection.rollback()
				throw err
			} finally {
				connection.release()
			}
		},
		clear: async () => {
			await pool.query(`DELETE FROM ${table} WHERE session = ?`, [session])
		},
		close: async () => {
			if (owned) {
				await pool.end()
			}
		}
	}

	return makeAuthStateFromStore(store)
}
