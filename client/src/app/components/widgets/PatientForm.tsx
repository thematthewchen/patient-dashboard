import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../state/store';
import { useDispatch } from 'react-redux';
import { dashboardActions } from '../../state/ducks/patient-dashboard';
import { Status } from '../../state/ducks/patient-dashboard/types';
import {
  FormLabel,
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
  useToast
} from '@chakra-ui/react';
import { useFormik } from 'formik';
import { useHistory } from "react-router-dom";

export interface PatientFormProps {
  newPatient: boolean;
}

export default function PatientForm(props: PatientFormProps) {
  const dispatch = useDispatch();
  const history = useHistory();
  const toast = useToast();
  const dashboardState = useSelector((state: RootState) => state.dashboardState);

  const initialValues = props.newPatient ? {
    firstName: '',
    middleName: '',
    lastName: '',
    dateOfBirth: '',
    status: "ACTIVE",
    addresses: [],
    city: [],
    fieldKeys: [],
    fieldValues: []
  } : {
    ...dashboardState.selectedProfile
  }

  const addAddress = () => {
    dispatch(dashboardActions.addAddressAction(""));
  }

  const addField = () => {
    dispatch(dashboardActions.addFieldAction({"key": "", "value": ""}));
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
    dispatch(dashboardActions.clearSearchResultsAction());
    history.push('/');
  }

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: (values) => {
      dispatch(
        dashboardActions.createOrUpdatePatient({
          id: props.newPatient ? undefined : dashboardState.selectedProfile.id,
          firstName: values.firstName,
          middleName: values.middleName,
          lastName: values.lastName,
          dateOfBirth: values.dateOfBirth,
          status: values.status as Status,
          addresses: values.addresses,
          city: values.city,
          fieldKeys: values.fieldKeys,
          fieldValues: values.fieldValues
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
      dispatch(dashboardActions.clearSearchResultsAction());
      history.push('/');
    },
  })

  const addressFormData = dashboardState.selectedProfile.city != undefined ? dashboardState.selectedProfile.city.map((city, index) => {
    const addressIndex = 'city[' + index + "]";
    return (
      <>
        <FormLabel paddingTop='5' htmlFor='addresses'>City of Residence</FormLabel>
        <Input
          id={addressIndex}
          placeholder='Enter city of residence'
          onChange={formik.handleChange}
          value={formik.values.city[index]}
        />
      </>
    )
  }) : <></>;

  const additionalFormData = dashboardState.selectedProfile.fieldKeys != undefined ? dashboardState.selectedProfile.fieldKeys.map((fieldKey, index) => {
    const fieldKeyId = 'fieldKeys[' + index + "]";
    const fieldValueId = 'fieldValues[' + index + "]";
    return (
      <Flex>
        <Input
          id={fieldKeyId}
          placeholder='Enter the title of a new field'
          onChange={formik.handleChange}
          value={formik.values.fieldKeys[index]}
        />
        <Input
          id={fieldValueId}
          placeholder='Enter the value of a new field'
          onChange={formik.handleChange}
          value={formik.values.fieldValues[index]}
        />
      </Flex>
    )
  }) : <></>;

  return (
    <form onSubmit={formik.handleSubmit}>
        <FormLabel paddingTop='5' htmlFor='firstName'>First Name</FormLabel>
        <Input
          id='firstName'
          placeholder='Enter first name'
          onChange={formik.handleChange}
          value={formik.values.firstName}
        />
        <FormLabel paddingTop='5' htmlFor='middleName'>Middle Name</FormLabel>
        <Input
          id='middleName'
          placeholder='Enter middle name'
          onChange={formik.handleChange}
          value={formik.values.middleName}
        />
        <FormLabel paddingTop='5' htmlFor='lastName'>Last Name</FormLabel>
        <Input
          id='lastName'
          placeholder='Enter last name'
          onChange={formik.handleChange}
          value={formik.values.lastName}
        />
        <FormLabel paddingTop='5' htmlFor='dateOfBirth'>Date Of Birth</FormLabel>
        <Input
          id='dateOfBirth'
          type='date'
          onChange={formik.handleChange}
          value={formik.values.dateOfBirth}
        />
        <FormLabel paddingTop='5' htmlFor='status'>Status</FormLabel>
        <Select 
          id='status'
          onChange={formik.handleChange}
          value={formik.values.status}
        >
            <option value='INQUIRY'>INQUIRY</option>
            <option value='ONBOARDING'>ONBOARDING</option>
            <option value='ACTIVE'>ACTIVE</option>
            <option value='CHURNED'>CHURNED</option>
        </Select>
        {addressFormData}
        {dashboardState.selectedProfile.fieldKeys.length > 0 ? <FormLabel paddingTop='5' htmlFor='status'>Additional Fields</FormLabel>: <></>}
        {additionalFormData}
        <Button margin='5' variant='outline' onClick={addAddress}>Add Another Address</Button>
        <Button margin='5' variant='outline' onClick={addField}>Add Another Custom Field</Button>
        {props.newPatient ?
          <Button colorScheme='teal' marginTop='5' type='submit'>Create Profile</Button>
        :
        <Flex>
          <Button colorScheme='teal' marginTop='5' type='submit'>Update Profile</Button>
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
    </form>
  )
}