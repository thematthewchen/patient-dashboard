import React, { useState } from 'react';
import {
    Container,
    Text,
    Input,
    Button
} from '@chakra-ui/react'
import {  createUserWithEmailAndPassword  } from 'firebase/auth';
import { auth } from '../../../firebase';

export default function CreateAccount() {
 
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');
 
    const onSubmit = async (e) => {
        e.preventDefault()
       
        await createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
              // Signed in
              const user = userCredential.user;
              console.log(user);
              window.location.assign("/dashboard")
          })
          .catch((error) => {
              const errorCode = error.code;
              const errorMessage = error.message;
              console.log(errorCode, errorMessage);
          });
   
     
      }
    return (
        <Container maxW='container.sm'>
            <Text fontSize='2xl' marginTop='10'>Create a new account to access your patient dashboard</Text>
            <Input 
                marginTop='10'
                type='email'
                placeholder='Enter your email'
                value={email}
                required
                onChange={(e) => {
                    
                    setEmail(e.target.value)
                    }} />
            <Input 
                placeholder='Enter your password'
                type='password'
                value={password}
                required
                onChange={(e) => {

                    setPassword(e.target.value)}}  />
            <Button colorScheme='teal' marginTop='10' onClick={onSubmit}>Submit</Button>
        </Container>
    );
}