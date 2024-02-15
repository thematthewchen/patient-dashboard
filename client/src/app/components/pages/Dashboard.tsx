import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../state/store';
import Search from '../widgets/Search';
import SearchResult from '../widgets/SearchResult';
import NavBar from '../widgets/NavBar';
import Summary from '../widgets/Summary';
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
    const dashboardState = useSelector((state: RootState) => state.dashboardState);
    const searchResultContent = dashboardState.patientSearchResponse.content.map((patient) => {
        return (
            <SearchResult 
                {...patient}
                key={patient.id}
            />
        )
    }); 

    useEffect(() => {
        dispatch(dashboardActions.clearSearchResultsAction());
        dispatch(dashboardActions.getAllPatients());
    }, []);

    return (
        <>
            <NavBar/>
            <Container maxW='container.sm'>
                <Center padding='7'>
                    <Heading>
                        Patient Management Dashboard
                    </Heading>
                </Center>
                <Summary/>
                <Search />
                {dashboardState.patientSearchResponse.numberOfElements === 1 ? (
                    <Center padding='2'>{dashboardState.patientSearchResponse.numberOfElements} Result</Center>) : (
                    <Center padding='2'>{dashboardState.patientSearchResponse.numberOfElements} Results</Center>
                )}
                {searchResultContent}
            </Container>
        </>
    );
}