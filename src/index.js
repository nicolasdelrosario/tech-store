import express from 'express'
import bodyParser from 'body-parser'
import { connection } from './database/database.js'
import { router as categoryRouter } from './routes/category.routes.js'
import { router as clientRouter } from './routes/client.routes.js'
import { router as orderRouter } from './routes/order.routes.js'
import { router as productRouter } from './routes/product.routes.js'

const PORT = 3000
const app = express()

// Middlewares
app.use(bodyParser.json())

// Routes
app.use('/api', categoryRouter)
app.use('/api', clientRouter)
app.use('/api', orderRouter)
app.use('/api', productRouter)

// Nos aseguramos que la base de datos esté conectada
connection
	.query('SELECT 1')
	.then(() => {
		console.log('Database connection successful')
		app.listen(PORT, () => {
			console.log(`Server running on port ${PORT}`)
		})
	})
	.catch(err => {
		console.error('Database connection error', err)
	})
