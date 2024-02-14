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
  
  export default function NavBar() {
    const dispatch = useDispatch();
    const createNewPatient = () => {
        dispatch(dashboardActions.clearSearchResultsAction());
        history.push('/new-profile');
    }

    const navigateHome = () => {
        history.push('/dashboard');
    }

    const handleLogout = () => {               
        signOut(auth).then(() => {
        // Sign-out successful.
            history.push('/sign-in');
            console.log("Signed out successfully")
        }).catch((error) => {
        // An error happened.
        });
    }

    useEffect(()=>{
        onAuthStateChanged(auth, (user) => {
            if (user) {
              // User is signed in, see docs for a list of available properties
              // https://firebase.google.com/docs/reference/js/firebase.User
              const uid = user.uid;
              // ...
              console.log("uid", uid);
            } else {
              // User is signed out
              // ...
              console.log("user is logged out")
              history.push('/sign-in');
            }
          });
         
    }, [])

    const history = useHistory();
    return (
      <>
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
      </>
    )
  }