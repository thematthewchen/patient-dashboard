import React, { useState } from 'react';
import {
    Container,
    Text,
    Input,
    Button,
    Heading,
    Card,
    CardBody,
    FormLabel,
    useToast
} from '@chakra-ui/react'
import {  createUserWithEmailAndPassword  } from 'firebase/auth';
import { auth } from '../../../../firebase';
import { Urls } from '../../../../shared/urls';
import { useHistory } from "react-router-dom";

/**
 * This component renders the page to let prescribers create accounts
 *
 * @returns {ReactNode} A React element that renders Create Account page.
 */
export default function CreateAccount() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('');
  const toast = useToast();
  const history = useHistory();

  /**
   * onSubmit attempts to create a user with their given email and password using Firebase Authentication.
   * If the log in is successful, the customer will be redirected to the dashboard page.
   * If unsuccessful an error message will appear.
   * 
   * Refer to https://firebase.google.com/docs/reference/js/v8/firebase.auth.Auth#createuserwithemailandpassword
   *
   * @param {ChangeEvent} e change event.
   * @returns void
   */
  const onSubmit = async (e) => {
    e.preventDefault()
  
    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        history.push(Urls.DASHBOARD_ROUTE_URL);
      })
      .catch((error) => {
        const errorCode = error.code;
        let errorPrompt = "Failed to create account. Please try again.";
        if (errorCode == 'auth/email-already-in-use') {
          errorPrompt = "Email already in use. Please use a different email."
        } else if (errorCode == 'auth/invalid-email') {
          errorPrompt = "Invalid email. Please use a different email."
        } else if (errorCode == 'auth/operation-not-allowed') {
          errorPrompt = "Operation not allowed. Please reach out to an admin."
        } else if (errorCode == 'auth/weak-password') {
          errorPrompt = "Password is too weak. Please use a stronger password."
        }
        toast({
          title: 'Create Account Failed',
          description: errorPrompt,
          status: 'error',
          duration: 5000,
          isClosable: true,
        })
      });
  }
  return (
    <Container maxW='container.sm' padding='10'>
        <Card>
            <CardBody padding='10'>
                <Heading>Create account</Heading>
                <Text fontSize='2xl' marginTop='10'>Create a new account to access your patient dashboard</Text>
                <FormLabel marginTop='10'>New Email</FormLabel>
                <Input 
                    type='email'
                    placeholder='Enter your email'
                    value={email}
                    required
                    onChange={(e) => {setEmail(e.target.value)}} />
                <FormLabel marginTop='10'>New Password</FormLabel>
                <Input 
                    placeholder='Enter your password'
                    type='password'
                    value={password}
                    required
                    onChange={(e) => {setPassword(e.target.value)}}  />
                <Button colorScheme='teal' marginTop='10' onClick={onSubmit}>Submit</Button>
            </CardBody>
        </Card>
      </Container>
  );
}