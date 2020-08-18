import patientData from '../../data/patients.json';

import { PatientEntry } from '../../types';

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

export default {
  getEntries,
  getNonSensitiveEntires
};