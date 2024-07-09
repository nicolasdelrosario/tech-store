import { Router } from 'express'
import { method as orderController } from '../controllers/order.controller.js'

export const router = Router()

router.get('/orders', orderController.getOrders)
router.get('/orders/:id', orderController.getOrder)
router.post('/orders', orderController.createOrder)
router.put('/orders/:id', orderController.updateOrder)
router.delete('/orders/:id', orderController.deleteOrder)
