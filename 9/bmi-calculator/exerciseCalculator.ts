interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

interface Rating {
  rating: number;
  ratingDescription: string;
}

const calculateAverage = (data: Array<number>) : number => {
  let sum = 0;
  for (const dataPoint of data){
    sum += dataPoint;
  }
  return sum/data.length;
}

const getTrainingDays = (data: Array<number>) : number => {
  let vacationDays = 0;
  for (const dataPoint of data){
    if(dataPoint === 0){
      vacationDays += 1;
    } 
  }
  return data.length - vacationDays
}

const getRating = (data: Array<number>, average: number, goal: number, trainingDays: number) : Rating => {
  if( average < goal ) {
    if ( average * 1.5 < goal) {
      return {
        rating: 0,
        ratingDescription: "You're not trying hard enough!"
      }
    }
    else {
      return {
        rating: 1,
        ratingDescription: "Almost there!"
      }
    }
  }
  if(trainingDays/data.length > 0.85){ // Check if exercise is regular
    return {
      rating: 3,
      ratingDescription: "Great job! You're reaching your goal with balanced exercise schedule!"
    }
  }
  return {
    rating: 2,
    ratingDescription: "Good job! You're reaching your goal but try to exercise more regularly."
  }
}

const calculateExercises = ( data: Array<number>, goal: number ) : Result => {
  const average = calculateAverage(data)
  const trainingDays = getTrainingDays(data)
  const {rating, ratingDescription} = getRating(data, average, goal, trainingDays)
  return {
    periodLength: data.length,              // Done
    trainingDays: trainingDays,             // Done 
    success: (average >= goal),             // Done
    rating: rating,                         // Not Done
    ratingDescription: ratingDescription,   // Not Done
    target: goal,                           // Done
    average: average                        // Done
  }
}


let data : Array<number> = []
for(let i = 3; i < process.argv.length; i++){
  data.push(Number(process.argv[i]))
}

const goal : number = Number(process.argv[2]);
console.log(calculateExercises(data, goal))