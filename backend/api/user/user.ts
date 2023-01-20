import { Request, Response, Router } from 'express'

const router = Router()

router.get('/', (request: Request, response: Response) => {
   return response.json({ msg: 'Felhasználók oldal' })
})

module.exports = router
