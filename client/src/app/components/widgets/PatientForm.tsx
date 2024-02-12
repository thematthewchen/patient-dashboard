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
    status: Status.ACTIVE,
    addresses: [''],
  } : {
    firstName: dashboardState.selectedProfile.firstName,
    middleName: dashboardState.selectedProfile.middleName,
    lastName: dashboardState.selectedProfile.lastName,
    dateOfBirth: dashboardState.selectedProfile.dateOfBirth,
    status: dashboardState.selectedProfile.status,
    addresses: dashboardState.selectedProfile.addresses,
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
          ...values,
          id: props.newPatient ? undefined : dashboardState.selectedProfile.id,
          addresses: ['TODO']
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
        <FormLabel paddingTop='5' htmlFor='addresses'>City of Residence</FormLabel>
        <Input
          id='addresses'
          placeholder='Enter city of residence'
          onChange={formik.handleChange}
          value={formik.values.addresses}
        />
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