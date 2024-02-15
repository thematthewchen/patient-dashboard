import React, { useState } from 'react';
import {
  Stack,
  InputGroup,
  InputLeftAddon,
  Input,
  Select,
  RangeSlider,
  RangeSliderTrack,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  RangeSliderMark
} from '@chakra-ui/react'
import { useDispatch } from 'react-redux';
import { dashboardActions } from '../../state/ducks/patient-dashboard';
import { Constants } from '../../../shared/constants';
import { Status } from '../../state/ducks/patient-dashboard/types';

/**
 * This component renders the search bar in the dashboard
 *
 * @returns {ReactNode} A React element that renders the search bar
 */
export default function Search() {
  const [fieldSelection, setFieldSelection] = useState(Constants.firstNameKey); 
  const [sliderValue, setSliderValue] = useState([25, 75]);
  const dispatch = useDispatch();

  /**
   * lookupProfile dispatches a getPatient action to find patients with a given key and value
   */
  const lookupProfile = (event) => {
    dispatch(
      dashboardActions.getPatient({
        key: fieldSelection,
        value: event.target.value,
      })
    );
  };

  /**
   * searchAgeRange dispatches a getPatientRange action to find patients within an age range
   */
  const searchAgeRange = () => {
    dispatch(
      dashboardActions.getPatientRange({
        key: fieldSelection,
        gte: sliderValue[0],
        lte: sliderValue[1]
      })
    );
  }

  // Based on the field selected, either show a search input, a slider, or a dropdown
  let searchBarContent = <></>;
  if (fieldSelection === Constants.ageKey) {
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
  } else if (fieldSelection === Constants.statusKey) {
    searchBarContent = 
    (<Select placeholder='Select status' onChange={lookupProfile} bg='white'>
      <option value={Status.INQUIRY}>INQUIRY</option>
      <option value={Status.ONBOARDING}>ONBOARDING</option>
      <option value={Status.ACTIVE}>ACTIVE</option>
      <option value={Status.CHURNED}>CHURNED</option>
    </Select>)
  } else {
    searchBarContent = 
    (<Input 
        placeholder='Search for patient profile' 
        onChange={lookupProfile} bg='white'/>)
  }

  return (
    <Stack spacing={4} direction='row' align='center' marginTop='10'>
      <InputGroup>
          <InputLeftAddon paddingX="0">
            <Select borderRightRadius="0" onChange={(event) => {setFieldSelection(event.target.value)}}>
                <option value={Constants.firstNameKey}>First Name</option>
                <option value={Constants.lasteNameKey}>Last Name</option>
                <option value={Constants.ageKey}>Age Range</option>
                <option value={Constants.cityKey}>City</option>
                <option value={Constants.statusKey}>Status</option>
            </Select>
          </InputLeftAddon>
          {searchBarContent}
      </InputGroup>
    </Stack>
  )
}