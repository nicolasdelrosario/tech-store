import { connection } from '../database/database.js'

// Obtener todas las categorias
const getCategories = async (req, res) => {
	try {
		const [results] = await connection.query('SELECT * FROM categories')
		res.status(200).json(results)
	} catch (err) {
		res.status(500).send(err)
	}
}

// Obtener una categoria
const getCategory = async (req, res) => {
	const { id } = req.params
	try {
		const [results] = await connection.query(
			'SELECT * FROM categories WHERE id = ?',
			[id]
		)
		if (results.length === 0) {
			return res.status(404).send('Category not found')
		}
		res.status(200).json(results[0])
	} catch (err) {
		res.status(500).send(err)
	}
}

// Crear una categoria
const createCategory = async (req, res) => {
	const { name, description } = req.body
	try {
		const [results] = await connection.query(
			'INSERT INTO categories (name, description) VALUES (?, ?)',
			[name, description]
		)
		res.status(201).send(`Category created with ID: ${results.insertId}`)
	} catch (error) {
		res.status(500).send(error)
	}
}

// Actualizar una categoria
const updateCategory = async (req, res) => {
	const { id } = req.params
	const { name, description } = req.body
	try {
		const [results] = await connection.query(
			'UPDATE categories SET name = ?, description = ? WHERE id = ?',
			[name, description, id]
		)
		if (results.affectedRows === 0) {
			return res.status(404).send('Category not found')
		}
		res.status(200).send('Category updated')
	} catch (error) {
		res.status(500).send(error)
	}
}

// Eliminar una categoria
const deleteCategory = async (req, res) => {
	const { id } = req.params
	try {
		const [results] = await connection.query(
			'DELETE FROM categories WHERE id = ?',
			[id]
		)
		if (results.affectedRows === 0) {
			return res.status(404).send('Category not found')
		}
		res.status(200).send('Category deleted')
	} catch (error) {
		res.status(500).send(error)
	}
}

export const method = {
	getCategories,
	getCategory,
	createCategory,
	updateCategory,
	deleteCategory,
}
