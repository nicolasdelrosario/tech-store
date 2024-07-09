import { Router } from 'express'
import { method as clientController } from '../controllers/client.controller.js'

export const router = Router()

router.get('/clients', clientController.getClients)
router.get('/clients/:id', clientController.getClient)
router.post('/clients', clientController.createClient)
router.put('/clients/:id', clientController.updateClient)
router.delete('/clients/:id', clientController.deleteClient)
