import { connection } from '../database/database.js'

// Obtener todas las órdenes
const getOrders = async (req, res) => {
	try {
		const [results] = await connection.query('SELECT * FROM orders')
		res.status(200).json(results)
	} catch (err) {
		res.status(500).send(err)
	}
}

// Obtener una orden por ID
const getOrder = async (req, res) => {
	const { id } = req.params
	try {
		const [results] = await connection.query(
			'SELECT * FROM orders WHERE id = ?',
			[id]
		)
		if (results.length === 0) {
			return res.status(404).send('Order not found')
		}
		res.status(200).json(results[0])
	} catch (err) {
		res.status(500).send(err)
	}
}

// Crear una orden
const createOrder = async (req, res) => {
	const { client_id, products, total } = req.body
	const orderData = {
		client_id,
		status: 'pending',
		total,
	}
	try {
		const [results] = await connection.query(
			'INSERT INTO orders SET ?',
			orderData
		)
		const orderId = results.insertId
		const orderItems = products.map(product => [
			orderId,
			product.id,
			product.quantity,
			product.price,
		])
		await connection.query(
			'INSERT INTO order_items (order_id, product_id, quantity, price) VALUES ?',
			[orderItems]
		)
		res.status(201).send(`Order created with ID: ${orderId}`)
	} catch (error) {
		res.status(500).send(error)
	}
}

// Actualizar el estado de una orden
const updateOrder = async (req, res) => {
	const { id } = req.params
	const { status } = req.body
	try {
		const [results] = await connection.query(
			'UPDATE orders SET status = ? WHERE id = ?',
			[status, id]
		)
		if (results.affectedRows === 0) {
			return res.status(404).send('Order not found')
		}
		res.status(200).send('Order status updated')
	} catch (error) {
		res.status(500).send(error)
	}
}

// Eliminar una orden
const deleteOrder = async (req, res) => {
	const { id } = req.params
	try {
		const [results] = await connection.query(
			'DELETE FROM orders WHERE id = ?',
			[id]
		)
		if (results.affectedRows === 0) {
			return res.status(404).send('Order not found')
		}
		res.status(200).send('Order deleted')
	} catch (error) {
		res.status(500).send(error)
	}
}

export const method = {
	getOrders,
	getOrder,
	createOrder,
	updateOrder,
	deleteOrder,
}
