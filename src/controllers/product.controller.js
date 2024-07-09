import { connection } from '../database/database.js'

// Obtener todos los productos
const getProducts = async (req, res) => {
	try {
		const [results] = await connection.query('SELECT * FROM products')
		res.status(200).json(results)
	} catch (err) {
		res.status(500).send(err)
	}
}

// Obtener un producto por ID
const getProduct = async (req, res) => {
	const { id } = req.params
	try {
		const [results] = await connection.query(
			'SELECT * FROM products WHERE id = ?',
			[id]
		)
		if (results.length === 0) {
			return res.status(404).send('Product not found')
		}
		res.status(200).json(results[0])
	} catch (err) {
		res.status(500).send(err)
	}
}

// Crear un producto
const createProduct = async (req, res) => {
	const { name, description, price, stock_quantity, category_id } = req.body
	try {
		const [results] = await connection.query(
			'INSERT INTO products (name, description, price, stock_quantity, category_id) VALUES (?, ?, ?, ?, ?)',
			[name, description, price, stock_quantity, category_id]
		)
		res.status(201).send(`Product created with ID: ${results.insertId}`)
	} catch (error) {
		res.status(500).send(error)
	}
}

// Actualizar un producto
const updateProduct = async (req, res) => {
	const { id } = req.params
	const { name, description, price, stock_quantity, category_id } = req.body
	try {
		const [results] = await connection.query(
			'UPDATE products SET name = ?, description = ?, price = ?, stock_quantity = ?, category_id = ? WHERE id = ?',
			[name, description, price, stock_quantity, category_id, id]
		)
		if (results.affectedRows === 0) {
			return res.status(404).send('Product not found')
		}
		res.status(200).send('Product updated')
	} catch (error) {
		res.status(500).send(error)
	}
}

// Eliminar un producto
const deleteProduct = async (req, res) => {
	const { id } = req.params
	try {
		const [results] = await connection.query(
			'DELETE FROM products WHERE id = ?',
			[id]
		)
		if (results.affectedRows === 0) {
			return res.status(404).send('Product not found')
		}
		res.status(200).send('Product deleted')
	} catch (error) {
		res.status(500).send(error)
	}
}

export const method = {
	getProducts,
	getProduct,
	createProduct,
	updateProduct,
	deleteProduct,
}
