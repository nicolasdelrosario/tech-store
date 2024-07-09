import { Router } from 'express'
import { method as productController } from '../controllers/product.controller.js'

export const router = Router()

router.get('/products', productController.getProducts)
router.get('/products/:id', productController.getProduct)
router.post('/products', productController.createProduct)
router.put('/products/:id', productController.updateProduct)
router.delete('/products/:id', productController.deleteProduct)
