const categories = [
  {upperLimit: 15, category: "Very severely underweight"},
  {upperLimit: 16, category: "Severely underweight"},
  {upperLimit: 18.5, category: "Underweight"},
  {upperLimit: 25, category: "Normal (healthy weight)"},
  {upperLimit: 30, category: "Overweight"},
  {upperLimit: 35, category: "Obese Class I (Moderately obese)"},
  {upperLimit: 40, category: "Obese Class II (Severely obese)"},
  {upperLimit: 100, category: "Obese Class III (Very severely obese)"}
];

const calculateBMI = ( height:number, weight: number ) : string => {
  const BMI = (weight)/(height/100*height/100);
  for (const element of categories){
    if( BMI <= element.upperLimit){
      return element.category;
    }
  }
  return categories[categories.length - 1].category;
};

const h  = Number(process.argv[2]);
const w  = Number(process.argv[3]);
console.log(calculateBMI(h, w));

export { calculateBMI };