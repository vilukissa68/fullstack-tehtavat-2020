import patientData from '../../data/patients.json';

import { PatientEntry, NewPatientEntry } from '../../types';

const patients: Array<PatientEntry> = patientData as Array<PatientEntry>;

const getEntries = (): Array<PatientEntry> => {
  return patients;
};

const getNonSensitiveEntires = 
  (): Array<Pick<PatientEntry, 'id' | 'name' | 'dateOfBirth' | 'gender' | 'occupation'>> => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
      id,
      name,
      dateOfBirth,
      gender,
      occupation
    }));
  };

const addEntry = ( entry: NewPatientEntry ): PatientEntry => {
    const newPatientEntry = {
      id: String(Math.max(...patients.map(p => Number(p.id))) + 1),
      ...entry
    };
    patients.push(newPatientEntry);
    return newPatientEntry;
  };



export default {
  getEntries,
  getNonSensitiveEntires,
  addEntry
};