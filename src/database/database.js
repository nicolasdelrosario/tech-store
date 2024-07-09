import mysql from 'mysql2/promise'
import config from '../config/config.js'

export const connection = mysql.createPool({
	host: config.host,
	port: config.port,
	database: config.database,
	user: config.user,
	password: config.password,
})
