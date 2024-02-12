import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../state/store';
import PatientForm from './widgets/PatientForm';
import {
    Container,
    Text,
    Center
} from '@chakra-ui/react'

export default function Profile() {
    const dashboardState = useSelector((state: RootState) => state.dashboardState);

    return (
        <Container maxW='container.sm' paddingTop='10'>
            <Center>
                <Text fontSize='4xl'>{dashboardState.selectedProfile.firstName}'s Profile</Text>
            </Center>
            <PatientForm newPatient={false}/>
        </Container>
    );
}