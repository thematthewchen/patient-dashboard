import React, { useState } from 'react';
import {
    Container,
    Heading,
    Text,
    Input,
    Button,
    Flex,
    Spacer,
    Card,
    CardBody,
    FormLabel,
    useToast,
} from '@chakra-ui/react'
import {  signInWithEmailAndPassword   } from 'firebase/auth';
import { auth } from '../../../../firebase';
import { useHistory } from "react-router-dom";
import { Urls } from '../../../../shared/urls';

/**
 * This component renders the page that lets prescribers log into their patient dashboard.
 *
 * @returns {ReactNode} A React element that renders the Sign In page.
 */
export default function SignIn() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');
    const history = useHistory();
    const toast = useToast();
    
    /**
     * onLogin attempts to log in the user via Firebase Authentication.
     * If successful the user will be redirected to the patient dashboard page.
     * If unsuccessful an error message will appear.
     * 
     * Refer to https://firebase.google.com/docs/reference/js/v8/firebase.auth.Auth#signinwithemailandpassword
     *
     * @param {ChangeEvent} e change event.
     * @returns void
     */
    const onLogin = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            history.push(Urls.DASHBOARD_ROUTE_URL);
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
            toast({
                title: 'Login Failed',
                description: "The email and password provided is not associated with an account",
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
                    <Heading>Welcome!</Heading>
                    <Text fontSize='2xl' marginTop='10'>Please sign in to access your patient dashboard</Text>
                    <FormLabel marginTop='10'>Email</FormLabel>
                    <Input 
                        type='email'
                        placeholder='Enter your email'
                        value={email}
                        required
                        onChange={(e) => setEmail(e.target.value)} />
                    <FormLabel marginTop='10'>Password</FormLabel>
                    <Input 
                        placeholder='Enter your password'
                        type='password'
                        value={password}
                        required
                        onChange={(e) => setPassword(e.target.value)}  />
                    <Flex>
                        <Button colorScheme='teal' marginTop='10' onClick={onLogin}>Sign In</Button>
                        <Spacer/>
                        <Button marginTop='10' onClick={() => {history.push(Urls.CREATE_ACCOUNT_ROUTE_URL)}}>Create an account</Button>
                    </Flex>
                </CardBody>
            </Card>
        </Container>
    );
}