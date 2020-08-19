import {Gender, NewPatientEntry} from '../types';

const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};

/* eslint-disable @typescript-eslint/no-explicit-any */
const parseGender = (gender: any): Gender => {
  if (!gender || !isGender(gender)) {
    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
    throw new Error('Incorret or missing gender: ' + gender);
  }
  return gender;
};

const isString = (text: any): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseString = (text: any): string => {
  if (!text || !isString(text)) {
    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
    throw new Error('Incorrent of missing text information:' + text);
  }
  return text;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: any): string => {
  if (!date || !isString(date) || !isDate(date)) {
      // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
      throw new Error('Incorrect or missing date: ' + date);
  }
  return date;
};

/* eslint-disable @typescript-eslint/no-explicit-any */
const toNewPatientEntry = (object: any): NewPatientEntry => {
  return {
    name: parseString(object.name),
    dateOfBirth: parseDate(object.dateOfBirth),
    ssn: parseString(object.ssn),
    gender: parseGender(object.gender),
    occupation: parseString(object.occupation),
  };
};

export default toNewPatientEntry;