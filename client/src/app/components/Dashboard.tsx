import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../state/store';
import Search from './widgets/Search';
import SearchResult from './widgets/SearchResult';
import {
    Container,
    Heading,
    Center
} from '@chakra-ui/react'

export default function Dashboard() {
    const dashboardState = useSelector((state: RootState) => state.dashboardState);
    const searchResultContent = dashboardState.patientResponse.content.map((patient) => {
        return (
            <SearchResult 
                {...patient}
                key={patient.id}
            />
        )
    }); 
    return (
        <Container maxW='container.sm'>
            <Center padding='7'>
                <Heading>
                    Patient Management Dashboard
                </Heading>
            </Center>
            <Search />
            {dashboardState.patientResponse.numberOfElements === 1 ? (
                <Center padding='2'>{dashboardState.patientResponse.numberOfElements} Result</Center>) : (
                <Center padding='2'>{dashboardState.patientResponse.numberOfElements} Results</Center>
            )}
            {searchResultContent}
        </Container>
    );
}