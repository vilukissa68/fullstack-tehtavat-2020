import express = require('express');
const app = express();
app.use(express.json());
import { calculateBMI } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

app.get('/hello', (_req, res) => {
  res.send("Hello world");
});

app.get('/bmi', (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);
  const bmi = calculateBMI(height, weight);
  const response = {
    weight: weight,
    height: height,
    bmi: bmi
  };
  res.json(response);
});

app.post('/exercises', (req, res) => {
  try{
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const body = req.body;
  const exerciseData = body.daily_exercises;
  const goal = body.target
  if(!exerciseData  || !goal){
    return res.status(500).json({ error: "parameters missing"});
  }
  return res.json(calculateExercises(exerciseData, goal));
  } catch(error) {
    return res.status(500).json({ error: "malformatted parameters"});
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});