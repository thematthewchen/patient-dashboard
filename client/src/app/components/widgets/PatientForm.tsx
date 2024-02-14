import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../state/store';
import { useDispatch } from 'react-redux';
import { dashboardActions } from '../../state/ducks/patient-dashboard';
import { Status } from '../../state/ducks/patient-dashboard/types';
import {
  FormLabel,
  FormControl,
  Box,
  Input,
  Button,
  Select,
  Spacer,
  Flex,
  Popover,
  PopoverTrigger,
  Portal,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverBody,
  Center,
  Alert,
  AlertIcon,
  useToast,
  CloseButton
} from '@chakra-ui/react';
import { useHistory } from "react-router-dom";

export interface PatientFormProps {
  newPatient: boolean;
}

export default function PatientForm(props: PatientFormProps) {
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

  const addAddress = () => {
    setStreetAddresses([...streetAddresses, ""]);
    setCities([...cities, ""]);
    setZipcodes([...zipcodes, ""]);
  }

  const addField = () => {
    setFieldKeys([...fieldKeys, ""]);
    setFieldValues([...fieldValues, ""]);
  }

  const deleteProfile = () => {
    dispatch(dashboardActions.deletePatient(dashboardState.selectedProfile.id));
    toast({
      title: 'Profile Deleted',
      description: "We've deleted this profile for you.",
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
    history.push('/dashboard');
  }

  const getAge = (dateOfBirth: string) => {
    return (new Date()).getFullYear() - Number(dateOfBirth.split("-")[0]);
  }

  const removeField = (index: number) => {
    setFieldKeys([...fieldKeys.slice(0, index), ...fieldKeys.slice(index + 1)]);
    setFieldValues([...fieldValues.slice(0, index), ...fieldValues.slice(index + 1)]);
  }

  const removeAddress = (index: number) => {
    setCities([...cities.slice(0, index), ...cities.slice(index + 1)]);
  }

  const handleValidationErrors = () => {
    if (firstName.length === 0) {
      validationErrors.push('INVALID_FIRST_NAME');
    }
    if (lastName.length === 0) {
      validationErrors.push('INVALID_LAST_NAME');
    }
    if (dateOfBirth === "") {
      validationErrors.push('INVALID_DATE_OF_BIRTH');
    }
    if (status === Status.UNSELECTED) {
      validationErrors.push('INVALID_STATUS');
    }
    setValidationErrors([...validationErrors]);
  }

  const submitValues = () => {
    handleValidationErrors();
    if (validationErrors.length == 0) {
      dispatch(
        dashboardActions.createOrUpdatePatient({
          id: props.newPatient ? undefined : dashboardState.selectedProfile.id,
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
      toast(props.newPatient ? {
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
      history.push('/dashboard');
    }
  }

  const addressFormData = cities != undefined ? cities.map((city, index) => {
    const addressIndex = 'address[' + index + "]";
    return (
      <div key={addressIndex}>
        <FormLabel paddingTop='5' htmlFor='cities'>Address</FormLabel>
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
            type="number"
          />
          </Box>
          <CloseButton onClick={() => removeAddress(index)}/>
        </Flex>
      </div>
    )
  }) : <></>;

  const additionalFormData = fieldKeys != undefined ? fieldKeys.map((fieldKey, index) => {
    const fieldKeyId = 'fieldKeys[' + index + "]";
    const fieldValueId = 'fieldValues[' + index + "]";
    return (
      <Flex key={fieldKeyId}>
        <Input
          id={fieldKeyId}
          placeholder='Enter the title of a new field'
          onChange={(event) => setFieldKeys(fieldKeys.map((element, mapIndex) => mapIndex === index ? event.target.value: element))}
          value={fieldKey}
        />
        <Input
          id={fieldValueId}
          placeholder='Enter the value of a new field'
          onChange={(event) => setFieldValues(fieldKeys.map((element, mapIndex) => mapIndex === index ? event.target.value: element))}
          value={fieldValues[index]}
        />
        <CloseButton onClick={() => removeField(index)}/>
      </Flex>
    )
  }) : <></>;

  return (
    <>
        <FormControl isRequired isInvalid={validationErrors.includes('INVALID_FIRST_NAME')}>
          <FormLabel paddingTop='5' htmlFor='firstName'>First Name</FormLabel>
          <Input
            id='firstName'
            placeholder='Enter first name'
            onChange={(event) => {
              setValidationErrors(validationErrors.filter((error) => error !== 'INVALID_FIRST_NAME'));
              setFirstName(event.target.value);
            }}
            value={firstName}
          />
        </FormControl>
        <FormLabel paddingTop='5' htmlFor='middleName'>Middle Name</FormLabel>
        <Input
          id='middleName'
          placeholder='Enter middle name'
          onChange={(event) => setMiddleName(event.target.value)}
          value={middleName}
        />
        <FormControl isRequired isInvalid={validationErrors.includes('INVALID_LAST_NAME')}>
          <FormLabel paddingTop='5' htmlFor='lastName'>Last Name</FormLabel>
          <Input
            id='lastName'
            placeholder='Enter last name'
            onChange={(event) => {
              setValidationErrors(validationErrors.filter((error) => error !== 'INVALID_LAST_NAME'));
              setLastName(event.target.value);
            }}
            value={lastName}
          />
        </FormControl>
        <FormControl isRequired isInvalid={validationErrors.includes('INVALID_DATE_OF_BIRTH')}>
          <FormLabel paddingTop='5' htmlFor='dateOfBirth'>Date Of Birth</FormLabel>
          <Input
            id='dateOfBirth'
            type='date'
            onChange={(event) => {
              setValidationErrors(validationErrors.filter((error) => error !== 'INVALID_DATE_OF_BIRTH'));
              setDateOfBirth(event.target.value);
            }}
            value={dateOfBirth}
          />
        </FormControl>
        <FormControl isRequired isInvalid={validationErrors.includes('INVALID_STATUS')}>
        <FormLabel paddingTop='5' htmlFor='status'>Status</FormLabel>
          <Select 
            id='status'
            onChange={(event) => {
              setValidationErrors(validationErrors.filter((error) => error !== 'INVALID_STATUS'));
              setStatus(event.target.value as Status);
            }}
            value={status}
          >
              <option value=''></option>
              <option value='INQUIRY'>INQUIRY</option>
              <option value='ONBOARDING'>ONBOARDING</option>
              <option value='ACTIVE'>ACTIVE</option>
              <option value='CHURNED'>CHURNED</option>
          </Select>
        </FormControl>
        {addressFormData}
        {fieldKeys != undefined && fieldKeys.length > 0 ? <FormLabel paddingTop='5' htmlFor='status'>Additional Fields</FormLabel>: <></>}
        {additionalFormData}
        <Button margin='5' variant='outline' onClick={addAddress}>Add Another Address</Button>
        <Button margin='5' variant='outline' onClick={addField}>Add Another Custom Field</Button>
        {props.newPatient ?
          <Button colorScheme='teal' marginTop='5' onClick={submitValues}>Create Profile</Button>
        :
        <Flex>
          <Button colorScheme='teal' marginTop='5' onClick={submitValues}>Update Profile</Button>
          <Spacer/>
          <Popover>
            <PopoverTrigger>
              <Button marginTop='5'>Delete Profile</Button>
            </PopoverTrigger>
            <Portal>
              <PopoverContent>
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverBody>
                  <Alert status='warning' marginTop='5'>
                    <AlertIcon />
                    Are you sure you want to delete this profile? This action cannot be undone.
                  </Alert>
                  <Center>
                    <Button margin='5' onClick={deleteProfile} variant='outline'>Continue</Button>
                  </Center>
                </PopoverBody>
              </PopoverContent>
            </Portal>
          </Popover>
        </Flex>}
    </>
  )
}