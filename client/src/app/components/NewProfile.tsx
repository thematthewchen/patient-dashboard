import React from 'react';
import PatientForm from './widgets/PatientForm';
import {
    Container,
    Text
} from '@chakra-ui/react'

export default function NewProfile() {
    return (
        <Container maxW='container.sm' paddingTop='10'>
            <Text fontSize='4xl'>Create a New Patient Profile</Text>
            <PatientForm newPatient={true} />
        </Container>
    );
}