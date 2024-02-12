import React, { useState } from 'react';
import {
  Stack,
  InputGroup,
  InputLeftAddon,
  Input,
  Select,
  Button,
} from '@chakra-ui/react'
import { useDispatch } from 'react-redux';
import { dashboardActions } from '../../state/ducks/patient-dashboard';
import { useHistory } from "react-router-dom";

export default function Search() {
  const [fieldSelection, setFieldSelection] = useState('firstName'); 
  const history = useHistory();
  const dispatch = useDispatch();
  const lookupProfile = (event) => {
    dispatch(
      dashboardActions.getPatient({
        "key": fieldSelection,
        "value": event.target.value,
      })
    );
  };

  const selectKey = (event) => {
    setFieldSelection(event.target.value);
  };
  
  const createNewPatient = () => {
    history.push('/new-profile');
  }

  return (
    <Stack spacing={4} direction='row' align='center'>
      <Button colorScheme='teal' size='lg' onClick={createNewPatient}>New Patient</Button>
      <InputGroup>
          <InputLeftAddon paddingX="0">
            <Select borderRightRadius="0" onChange={selectKey}>
                <option value='firstName'>First Name</option>
                <option value='lastName'>Last Name</option>
                <option value='ageRange'>Age Range</option>
                <option value='city'>City</option>
            </Select>
          </InputLeftAddon>
          <Input 
            placeholder='Search for patient profile' 
            onChange={lookupProfile} />
      </InputGroup>
    </Stack>
)
}