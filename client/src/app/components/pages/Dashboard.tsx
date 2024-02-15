import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../state/store';
import Search from '../widgets/Search';
import SearchResult from '../widgets/SearchResult';
import NavBar from '../widgets/NavBar';
import { dashboardActions } from '../../state/ducks/patient-dashboard';
import {
    Container,
    Heading,
    Center
} from '@chakra-ui/react'

/**
 * The Dashboard component renders the patient management dashboard where prescribers can search
 * for patients and update their info.
 *
 * @returns {ReactNode} A React element that renders the dashboard.
 */
export default function Dashboard() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(dashboardActions.clearSearchResultsAction());
    }, []);

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
        <>
            <NavBar/>
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
        </>
    );
}