import express = require('express');
const app = express();
import { calculateBMI } from './bmiCalculator'

app.get('/hello', (_req, res) => {
  res.send("Hello world")
});

app.get('/bmi', (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);
  const bmi = calculateBMI(height, weight);
  const response = {
    weight: weight,
    height: height,
    bmi: bmi
  }
  res.json(response);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});