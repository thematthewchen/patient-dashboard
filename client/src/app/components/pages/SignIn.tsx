import React, { useState } from 'react';
import {
    Container,
    Heading,
    Text,
    Input,
    Button,
    Flex,
    Spacer,
    useToast,
} from '@chakra-ui/react'
import {  signInWithEmailAndPassword   } from 'firebase/auth';
import { auth } from '../../../firebase';
import { useHistory } from "react-router-dom";

export default function SignIn() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');
    const history = useHistory();
    const toast = useToast();
 
    const onLogin = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            history.push("/dashboard");
            console.log(user);
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
            toast({
                title: 'Login Failed',
                description: "The email and password provided is not associated to an account",
                status: 'error',
                duration: 5000,
                isClosable: true,
              })
        });
       
    }
    return (
        <Container maxW='container.sm'>
            <Heading marginTop='10'>Welcome!</Heading>
            <Text fontSize='2xl' marginTop='10'>Please sign in to access your patient dashboard</Text>
            <Input 
                marginTop='10'
                type='email'
                placeholder='Enter your email'
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)} />
            <Input 
                placeholder='Enter your password'
                type='password'
                value={password}
                required
                onChange={(e) => setPassword(e.target.value)}  />
            <Flex>
                <Button colorScheme='teal' marginTop='10' onClick={onLogin}>Submit</Button>
                <Spacer/>
                <Button marginTop='10' onClick={() => {history.push("/create-account")}}>Create an account</Button>
            </Flex>
            
        </Container>
    );
}