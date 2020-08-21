import React from 'react';
import { useParams } from "react-router-dom";
import axios from "axios";
import { apiBaseUrl } from "../constants";
import { Patient } from '../types';
import { Icon } from 'semantic-ui-react';
import { useStateValue } from '../state';

const SinglePatientPage: React.FC = () => {
  const [{ patients, dispatch }] = useStateValue();
  const [patient, setPatient] = React.useState<Patient | undefined>();

  const { id } = useParams<{ id: string }>();

  if(!patient){
    const foundPatient: Patient = Object.values(patients).find(p => p.id === id) as Patient;
    if(foundPatient){
      console.log(foundPatient);
      setPatient(foundPatient);
      console.log("Set patient:", foundPatient.name);
    }
  }

  React.useEffect(() => {
  const getPatientInforamtion = async (id: string) => {
    console.log("Fetching patient:", id);
      try {
        const { data: foundPatient } = await axios.get(`${apiBaseUrl}/patients/${id}`);
        setPatient(foundPatient);
        dispatch({
          type: "UPDATE_PATIENT", payload: foundPatient
        });
        console.log("Set patient:", foundPatient.name);
      } catch (e) {
        console.log(e.response.data);
      }
  };
  getPatientInforamtion(id);
  },[id]);


  const getGenderIcon = (gender: string) => {
    if(gender === 'male'){
      return <Icon name='mars'></Icon>;
    }
    else if(gender === 'female'){
      return <Icon name='venus'></Icon>;
    }
    else {
      return <Icon name='transgender'></Icon>;
    }
  };

  if(!patient){
    return(
      <p>loading...</p>
    );
  }
  return(
    <>
    <h1>{patient.name} {getGenderIcon(patient.gender)}</h1>
    </>
  );
};


export default SinglePatientPage;