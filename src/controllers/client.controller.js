import { connection } from '../database/database.js'

// Obtener todos los clientes
const getClients = async (req, res) => {
	try {
		const [results] = await connection.query('SELECT * FROM clients')
		res.status(200).json(results)
	} catch (err) {
		res.status(500).send(err)
	}
}

// Obtener un cliente por ID
const getClient = async (req, res) => {
	const { id } = req.params
	try {
		const [results] = await connection.query(
			'SELECT * FROM clients WHERE id = ?',
			[id]
		)
		if (results.length === 0) {
			return res.status(404).send('Client not found')
		}
		res.status(200).json(results[0])
	} catch (err) {
		res.status(500).send(err)
	}
}

// Crear un cliente
const createClient = async (req, res) => {
	const { name, email, phone, shipping_address } = req.body
	try {
		const [results] = await connection.query(
			'INSERT INTO clients (name, email, phone, shipping_address) VALUES (?, ?, ?, ?)',
			[name, email, phone, shipping_address]
		)
		res.status(201).send(`Client created with ID: ${results.insertId}`)
	} catch (error) {
		res.status(500).send(error)
	}
}

// Actualizar un cliente
const updateClient = async (req, res) => {
	const { id } = req.params
	const { name, email, phone, shipping_address } = req.body
	try {
		const [results] = await connection.query(
			'UPDATE clients SET name = ?, email = ?, phone = ?, shipping_address = ? WHERE id = ?',
			[name, email, phone, shipping_address, id]
		)
		if (results.affectedRows === 0) {
			return res.status(404).send('Client not found')
		}
		res.status(200).send('Client updated')
	} catch (error) {
		res.status(500).send(error)
	}
}

// Eliminar un cliente
const deleteClient = async (req, res) => {
	const { id } = req.params
	try {
		const [results] = await connection.query(
			'DELETE FROM clients WHERE id = ?',
			[id]
		)
		if (results.affectedRows === 0) {
			return res.status(404).send('Client not found')
		}
		res.status(200).send('Client deleted')
	} catch (error) {
		res.status(500).send(error)
	}
}

export const method = {
	getClients,
	getClient,
	createClient,
	updateClient,
	deleteClient,
}
