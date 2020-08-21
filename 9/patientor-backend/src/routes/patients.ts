import express from 'express';
import patientService from '../services/patientService';
import toNewPatientEntry from '../utilities';

const router = express.Router();


router.post('/', (req, res) => {
  try{
    const newPatientEntry = toNewPatientEntry(req.body);

    const addedEntry = patientService.addEntry(newPatientEntry);

    res.json(addedEntry);
  } catch(e) {
      res.status(400).send(e.message);
  }
});

router.get('/:id', (req, res) => {
  console.log("Find by id");
  try {
    const id = req.params.id;
    res.send(patientService.getById(id));
    
  } catch(e) {
    res.status(400).send(e.message);
  }
});

router.get('/', (_req, res) => {
  console.log("Find all");
  res.send(patientService.getNonSensitiveEntires());
});


export default router;