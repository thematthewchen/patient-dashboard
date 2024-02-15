import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../state/store';
import { useDispatch } from 'react-redux';
import { dashboardActions } from '../../state/ducks/patient-dashboard';
import { Status } from '../../state/ducks/patient-dashboard/types';
import DeleteProfile from './DeleteProfile';
import {
  FormLabel,
  FormControl,
  Box,
  Input,
  Button,
  Select,
  Flex,
  useToast,
  CloseButton,
  Spacer,
  Center,
  Textarea
} from '@chakra-ui/react';
import { useHistory } from "react-router-dom";
import { Urls } from '../../../shared/urls';
import { Constants } from '../../../shared/constants';

export interface PatientFormProps {
  newPatient: boolean;
}

/**
 * This component renders the patient form used to create and update patient data.
 *
 * @param {PatientFormProps} props Props identifying if this form is used for a new or existing patient
 * @returns {ReactNode} A React element that renders the patient form
 */
export default function PatientForm(props: PatientFormProps) {
  const { newPatient } = props;
  const dispatch = useDispatch();
  const history = useHistory();
  const toast = useToast();
  const dashboardState = useSelector((state: RootState) => state.dashboardState);
  const [firstName, setFirstName] = useState(dashboardState.selectedProfile.firstName);
  const [middleName, setMiddleName] = useState(dashboardState.selectedProfile.middleName);
  const [lastName, setLastName] = useState(dashboardState.selectedProfile.lastName);
  const [dateOfBirth, setDateOfBirth] = useState(dashboardState.selectedProfile.dateOfBirth);
  const [status, setStatus] = useState(dashboardState.selectedProfile.status);
  const [streetAddresses, setStreetAddresses] = useState(dashboardState.selectedProfile.streetAddress);
  const [cities, setCities] = useState(dashboardState.selectedProfile.city);
  const [zipcodes, setZipcodes] = useState(dashboardState.selectedProfile.zipCode);
  const [fieldKeys, setFieldKeys] = useState(dashboardState.selectedProfile.fieldKeys);
  const [fieldValues, setFieldValues] = useState(dashboardState.selectedProfile.fieldValues);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const validationError = {
    FIRST_NAME: 'INVALID_FIRST_NAME',
    LAST_NAME: 'INVALID_LAST_NAME',
    DATE_OF_BIRTH: 'INVALID_DATE_OF_BIRTH',
    STATUS: 'INVALID_STATUS'
  }

  /**
   * addAddress appends empty address values to the state values to display an additional address form.
   */
  const addAddress = () => {
    setStreetAddresses([...streetAddresses, ""]);
    setCities([...cities, ""]);
    setZipcodes([...zipcodes, ""]);
  }

  /**
   * removeAddress removes an address in the state values at a given index
   * @param {number} index the index of the address to remove
   */
  const removeAddress = (index: number) => {
    setStreetAddresses([...streetAddresses.slice(0, index), ...streetAddresses.slice(index + 1)]);
    setCities([...cities.slice(0, index), ...cities.slice(index + 1)]);
    setZipcodes([...zipcodes.slice(0, index), ...cities.slice(index + 1)]);
  }

  /**
   * addField appends an empty field in the state values to display an additional field form
   */
  const addField = () => {
    setFieldKeys([...fieldKeys, ""]);
    setFieldValues([...fieldValues, ""]);
  }

  /**
   * removeField removes an field in the state values at a given index
   * @param {number} index the index of the field to remove
   */
  const removeField = (index: number) => {
    setFieldKeys([...fieldKeys.slice(0, index), ...fieldKeys.slice(index + 1)]);
    setFieldValues([...fieldValues.slice(0, index), ...fieldValues.slice(index + 1)]);
  }

  /**
   * getAge takes a given date of birth and calculates the age based on the current year
   *
   * @param {string} dateOfBirth the dateOfBirth to calculate the age
   * @returns {number} age based on current year
   */
  const getAge = (dateOfBirth: string) => {
    return (new Date()).getFullYear() - Number(dateOfBirth.split("-")[0]);
  }

  /**
   * addValidationErrors performs input validation on required fields. If criteria is not met,
   * a validation error will be added to the validationErrors state.
   */
  const addValidationErrors = () => {
    if (firstName.length === 0) {
      validationErrors.push(validationError.FIRST_NAME);
    }
    if (lastName.length === 0) {
      validationErrors.push(validationError.LAST_NAME);
    }
    if (dateOfBirth === "" || getAge(dateOfBirth) < 0 || getAge(dateOfBirth) > 100) {
      validationErrors.push(validationError.DATE_OF_BIRTH);
    }
    if (status === Status.UNSELECTED) {
      validationErrors.push(validationError.STATUS);
    }
    setValidationErrors([...validationErrors]);
  }

  /**
   * removeValidationError removes a given validation from the validationErrors state
   *
   * @param {string} validationToRemove A string the validation to remove
   * @returns {string[]} The validationErrors array without the validationToRemove
   */
  const removeValidationError = (validationToRemove: string) => {
    return validationErrors.filter((error) => error !== validationToRemove)
  }

  /**
   * submitValues collects all of the user inputted fields, checks for validation errors
   * and dispatches a createOrUpdatePatient action. Additionally a message is shown to the user
   * and the user is redirected to the dashboard.
   */
  const submitValues = () => {
    addValidationErrors();
    if (validationErrors.length == 0) {
      dispatch(
        dashboardActions.createOrUpdatePatient({
          id: newPatient ? undefined : dashboardState.selectedProfile.id,
          firstName: firstName,
          middleName: middleName,
          lastName: lastName,
          dateOfBirth: dateOfBirth,
          age: getAge(dateOfBirth),
          status: status as Status,
          streetAddress: streetAddresses,
          city: cities,
          zipCode: zipcodes,
          fieldKeys: fieldKeys,
          fieldValues: fieldValues
        })
      );
      toast(newPatient ? {
        title: 'Profile Created',
        description: "We've created this profile for you.",
        status: 'success',
        duration: 3000,
        isClosable: true,
      } : {
        title: 'Profile Updated',
        description: "We've updated this profile for you.",
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      history.push(Urls.DASHBOARD_ROUTE_URL);
    }
  }

  const addressFormData = cities != undefined && cities.map((city, index) => {
    const addressIndex = 'address[' + index + "]";
    return (
      <div key={addressIndex}>
        <FormLabel paddingTop='5' htmlFor={Constants.cityKey}>Address</FormLabel>
        <Flex>
          <Box>
            <Input
              placeholder='Enter street address'
              onChange={(event) => setStreetAddresses(streetAddresses.map((element, mapIndex) => mapIndex === index ? event.target.value: element))}
              value={streetAddresses[index]}
            />
            <Input
              placeholder='Enter city'
              onChange={(event) => setCities(cities.map((element, mapIndex) => mapIndex === index ? event.target.value: element))}
              value={city}
            />
            <Input
              placeholder='Enter zipcode'
              onChange={(event) => setZipcodes(zipcodes.map((element, mapIndex) => mapIndex === index ? event.target.value: element))}
              value={zipcodes[index]}
              maxLength={5}
              type="number"
            />
          </Box>
          <CloseButton onClick={() => removeAddress(index)}/>
        </Flex>
      </div>
    )
  });

  const additionalFormData = fieldKeys != undefined && fieldKeys.map((fieldKey, index) => {
    const fieldKeyId = 'fieldKeys[' + index + "]";
    const fieldValueId = 'fieldValues[' + index + "]";
    return (
      <Flex key={fieldKeyId} marginTop='5'>
        <Box>
          <Input
            id={fieldKeyId}
            placeholder='Enter the title of a new field'
            onChange={(event) => setFieldKeys(fieldKeys.map((element, mapIndex) => mapIndex === index ? event.target.value: element))}
            value={fieldKey}
          />
          <Textarea 
            id={fieldValueId}
            placeholder='Enter the value of a new field'
            onChange={(event) => setFieldValues(fieldValues.map((element, mapIndex) => mapIndex === index ? event.target.value: element))}
            value={fieldValues[index]}
          />
        </Box>
        <CloseButton onClick={() => removeField(index)}/>
      </Flex>
    )
  });

  return (
    <>
        <FormControl isRequired isInvalid={validationErrors.includes(validationError.FIRST_NAME)}>
          <FormLabel paddingTop='5' htmlFor={Constants.firstNameKey}>First Name</FormLabel>
          <Input
            id={Constants.firstNameKey}
            placeholder='Enter first name'
            onChange={(event) => {
              setValidationErrors(removeValidationError(validationError.FIRST_NAME));
              setFirstName(event.target.value);
            }}
            value={firstName}
          />
        </FormControl>
        <FormLabel paddingTop='5' htmlFor={Constants.middleNameKey}>Middle Name</FormLabel>
        <Input
          id={Constants.middleNameKey}
          placeholder='Enter middle name'
          onChange={(event) => setMiddleName(event.target.value)}
          value={middleName}
        />
        <FormControl isRequired isInvalid={validationErrors.includes(validationError.LAST_NAME)}>
          <FormLabel paddingTop='5' htmlFor={Constants.lasteNameKey}>Last Name</FormLabel>
          <Input
            id={Constants.lasteNameKey}
            placeholder='Enter last name'
            onChange={(event) => {
              setValidationErrors(removeValidationError(validationError.LAST_NAME));
              setLastName(event.target.value);
            }}
            value={lastName}
          />
        </FormControl>
        <FormControl isRequired isInvalid={validationErrors.includes(validationError.DATE_OF_BIRTH)}>
          <FormLabel paddingTop='5' htmlFor={Constants.dateOfBirthKey}>Date Of Birth</FormLabel>
          <Input
            id={Constants.dateOfBirthKey}
            type='date'
            onChange={(event) => {
              setValidationErrors(removeValidationError(validationError.DATE_OF_BIRTH));
              setDateOfBirth(event.target.value);
            }}
            value={dateOfBirth}
          />
        </FormControl>
        <FormControl isRequired isInvalid={validationErrors.includes(validationError.STATUS)}>
        <FormLabel paddingTop='5' htmlFor={Constants.statusKey}>Status</FormLabel>
          <Select 
            id={Constants.statusKey}
            onChange={(event) => {
              setValidationErrors(removeValidationError(validationError.STATUS));
              setStatus(event.target.value as Status);
            }}
            value={status}
          >
              <option value=''></option>
              <option value={Status.INQUIRY}>INQUIRY</option>
              <option value={Status.ONBOARDING}>ONBOARDING</option>
              <option value={Status.ACTIVE}>ACTIVE</option>
              <option value={Status.CHURNED}>CHURNED</option>
          </Select>
        </FormControl>
        {addressFormData}
        {fieldKeys != undefined && fieldKeys.length > 0 && 
          <FormLabel paddingTop='5'>Additional Fields</FormLabel>}
        {additionalFormData}
        <Center>
          <Button margin='5' variant='outline' onClick={addAddress}>Add Address</Button>
          <Button margin='5' variant='outline' onClick={addField}>Add Custom Field</Button>
        </Center>
        {newPatient ?
          <Box>
            <Button colorScheme='teal' marginTop='5' onClick={submitValues}>Create Profile</Button>
          </Box>
        :
          <Flex>
            <Button colorScheme='teal' marginTop='5' onClick={submitValues}>Update Profile</Button>
            <Spacer/> 
            <DeleteProfile/>
          </Flex>}
    </>
  )
}