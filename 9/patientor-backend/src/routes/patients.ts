import express from 'express';
import patientService from '../services/patientService';
import toNewPatientEntry from '../utilities';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getNonSensitiveEntires());
});

router.post('/', (req, res) => {
  try{
    const newPatientEntry = toNewPatientEntry(req.body);

    const addedEntry = patientService.addEntry(newPatientEntry);

    res.json(addedEntry);
  } catch(e) {
      res.status(400).send(e.message);
  }
});

export default router;