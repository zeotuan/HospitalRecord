import express from 'express'
import diagnosisService from '../services/diagnosisService' 

const router = express.Router()

router.get('/', async (_req,res) => {
    res.send(await diagnosisService.getAllDiagnoses())
})

export default router