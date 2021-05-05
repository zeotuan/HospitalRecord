import express from 'express'
import diagnosisService from '../services/diagnosisService' 

const router = express.Router()

router.get('/', async (_req,res) => {
    res.send(await diagnosisService.getEntries())
})

export default router