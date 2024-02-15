import React from 'react';
import PatientForm from '../widgets/PatientForm';
import NavBar from '../widgets/NavBar';
import {
    Container,
    Text
} from '@chakra-ui/react'

/**
 * This component renders the New Profile page where prescribers can create profiles for new patients.
 *
 * @returns {ReactNode} A React element that renders the New Profile page.
 */
export default function NewProfile() {
    return (
        <>
            <NavBar/>
            <Container maxW='container.sm' padding='10'>
                <Text fontSize='4xl'>Create a New Patient Profile</Text>
                <PatientForm newPatient={true} />
            </Container>
        </>
    );
}