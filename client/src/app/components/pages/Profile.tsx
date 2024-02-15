import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../state/store';
import PatientForm from '../widgets/PatientForm';
import NavBar from '../widgets/NavBar';
import {
    Container,
    Text,
    Center,
    Card,
    CardBody
} from '@chakra-ui/react'

/**
 * This component renders the Profile page where prescribers can update profiles for existing patients.
 *
 * @returns {ReactNode} A React element that renders the Profile page.
 */
export default function Profile() {
    const dashboardState = useSelector((state: RootState) => state.dashboardState);

    return (
        <>
            <NavBar/>
            <Container maxW='container.sm' padding='10'>
                <Card>
                    <CardBody padding='10'>
                        <Center>
                            <Text fontSize='4xl'>{dashboardState.selectedProfile.firstName}'s Profile</Text>
                        </Center>
                        <PatientForm newPatient={false}/>
                    </CardBody>
                </Card>
            </Container>
        </>
        
    );
}