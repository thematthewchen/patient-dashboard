import React, { useEffect } from 'react';
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from '../../../firebase';
import { useDispatch } from 'react-redux';
import {
    Box,
    Flex,
    HStack,
    Button,
    useColorModeValue,
  } from '@chakra-ui/react'
  import { AddIcon } from '@chakra-ui/icons'
  import { useHistory } from "react-router-dom";
  import { dashboardActions } from '../../state/ducks/patient-dashboard';
  import { Urls } from '../../../shared/urls';
  
/**
 * This component consists of the Navigation Bar header at the top of the page and 
 * provides links for navigating
 *
 * @returns {ReactNode} A React node for the NavBar
 */
export default function NavBar() {
  const dispatch = useDispatch();
  const history = useHistory();

  /**
   * createNewPatient redirects the user to the Create Patient page
   */
  const createNewPatient = () => {
      dispatch(dashboardActions.clearSearchResultsAction());
      history.push(Urls.NEW_PATIENT_PROFILE_ROUTE_URL);
  }

  /**
   * navigateHome redirects the user to the Dashboard page
   */
  const navigateHome = () => {
      history.push(Urls.DASHBOARD_ROUTE_URL);
  }

  /**
   * handleLogout signs the user out of the Patient Management Dashboard
   */
  const handleLogout = () => {               
      signOut(auth).then(() => {
          history.push(Urls.SIGN_IN_ROUTE_URL);
      })
  }

  /**
   * If the user is not authenticated, redirect them to the sign in page. All pages should have the NavBar
   * component which enforces this authentication.
   */
  useEffect(()=>{
      onAuthStateChanged(auth, (user) => {
          if (!user) {
            history.push(Urls.SIGN_IN_ROUTE_URL);
          }
        });
  }, []);

  return (
    <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
      <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
        <HStack spacing={4} alignItems={'center'}>
          <HStack as={'nav'} spacing={4} display={{ base: 'none', md: 'flex' }}>
              <Button onClick={navigateHome}>Home</Button>
          </HStack>
        </HStack>
        <Flex alignItems={'center'}>
          <Button
            variant={'solid'}
            colorScheme={'teal'}
            size={'sm'}
            mr={4}
            onClick={createNewPatient}
            leftIcon={<AddIcon />}>
            New Patient
          </Button>
          <Button
            size={'sm'}
            mr={4}
            onClick={handleLogout}>
            Sign Out
          </Button>
        </Flex>
      </Flex>
    </Box>
  )
}