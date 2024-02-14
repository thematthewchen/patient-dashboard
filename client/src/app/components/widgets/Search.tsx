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

export default function Search() {
  const [fieldSelection, setFieldSelection] = useState('firstName'); 
  const [sliderValue, setSliderValue] = useState([25, 75]);
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

  const searchAgeRange = () => {
    dispatch(
      dashboardActions.getPatientRange({
        "key": fieldSelection,
        "gte": sliderValue[0],
        "lte": sliderValue[1]
      })
    );
  }
  let searchBarContent = <></>;
  if (fieldSelection === 'age') {
    searchBarContent = 
    (<RangeSlider
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
    </RangeSlider>)
  } else if (fieldSelection === 'status') {
    searchBarContent = (
    <Select placeholder='Select status' onChange={lookupProfile}>
      <option value='INQUIRY'>INQUIRY</option>
      <option value='ONBOARDING'>ONBOARDING</option>
      <option value='ACTIVE'>ACTIVE</option>
      <option value='CHURNED'>CHURNED</option>
    </Select>)
  } else {
    searchBarContent = (<Input 
            placeholder='Search for patient profile' 
            onChange={lookupProfile} />)
  }

  return (
    <Stack spacing={4} direction='row' align='center'>
      <InputGroup>
          <InputLeftAddon paddingX="0">
            <Select borderRightRadius="0" onChange={selectKey}>
                <option value='firstName'>First Name</option>
                <option value='lastName'>Last Name</option>
                <option value='age'>Age Range</option>
                <option value='city'>City</option>
                <option value='status'>Status</option>
            </Select>
          </InputLeftAddon>
          {searchBarContent}
      </InputGroup>
    </Stack>
)
}