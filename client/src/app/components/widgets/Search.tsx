import React, { useState } from 'react';
import {
  Stack,
  InputGroup,
  InputLeftAddon,
  Input,
  Select,
  Button,
  RangeSlider,
  RangeSliderTrack,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  RangeSliderMark
} from '@chakra-ui/react'
import { useDispatch } from 'react-redux';
import { dashboardActions } from '../../state/ducks/patient-dashboard';
import { useHistory } from "react-router-dom";

export default function Search() {
  const [fieldSelection, setFieldSelection] = useState('firstName'); 
  const [sliderValue, setSliderValue] = useState([25, 75]);
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

  const searchAgeRange = () => {
    dispatch(
      dashboardActions.getPatientRange({
        "key": fieldSelection,
        "gte": sliderValue[0],
        "lte": sliderValue[1]
      })
    );
  }

  return (
    <Stack spacing={4} direction='row' align='center'>
      <Button colorScheme='teal' size='lg' onClick={createNewPatient}>New Patient</Button>
      <InputGroup>
          <InputLeftAddon paddingX="0">
            <Select borderRightRadius="0" onChange={selectKey}>
                <option value='firstName'>First Name</option>
                <option value='lastName'>Last Name</option>
                <option value='age'>Age Range</option>
                <option value='city'>City</option>
            </Select>
          </InputLeftAddon>
          {fieldSelection === 'age' ? 
          <RangeSlider
            marginLeft='2'
            aria-label={['min', 'max']}
            min={0} 
            max={100}
            colorScheme='teal'
            onChange={(val) => setSliderValue(val)}
            onChangeEnd={searchAgeRange}
          >
            <RangeSliderMark
              value={sliderValue[0]}
              textAlign='center'
              bg='teal.500'
              color='white'
              mt='-5'
              ml='-6'
              w='12'
            >
              {sliderValue[0]}
            </RangeSliderMark>
            <RangeSliderMark
              value={sliderValue[1]}
              textAlign='center'
              bg='teal.500'
              color='white'
              mt='-5'
              ml='-6'
              w='12'
            >
              {sliderValue[1]}
            </RangeSliderMark>
            <RangeSliderTrack>
              <RangeSliderFilledTrack />
            </RangeSliderTrack>
            <RangeSliderThumb index={0} />
            <RangeSliderThumb index={1} />
          </RangeSlider>
          :
          <Input 
            placeholder='Search for patient profile' 
            onChange={lookupProfile} /> 
          }
      </InputGroup>
    </Stack>
)
}