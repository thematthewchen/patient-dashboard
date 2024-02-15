import React from 'react';
import { useDispatch } from 'react-redux';
import {
  Flex,
  Text,
  Spacer,
  Box
} from '@chakra-ui/react';
import Status from './Status';
import { dashboardActions } from '../../state/ducks/patient-dashboard';
import { Patient } from '../../state/ducks/patient-dashboard/types';
import { useHistory } from "react-router-dom";
import { Urls } from '../../../shared/urls';

export interface SearchResultProps extends Patient {}

/**
 * This component renders a search result for a given profile
 *
 * @param {SearchResultProps} props A patient to display in the search result
 * @returns {ReactNode} A React element that renders the search bar
 */
export default function SearchResult(props: SearchResultProps) {
    const { firstName, middleName, lastName, status, age, city } = props;
    const history = useHistory();
    const dispatch = useDispatch();

    /**
     * setSelectedProfile dispatches a selectPatientAction action to store the selected profile and
     * redirects the user to the profile page
     */
    const setSelectedProfile = () => {
        dispatch(dashboardActions.selectPatientAction({...props}));
        history.push(Urls.PROFILE_ROUTE_URL)
    };

    const citiesContent = city != undefined && city.map((cityElement, index) => {
        return (
            (index == city.length - 1) ? 
            <Text key={index} paddingLeft='1' fontSize='md'> {cityElement} </Text> : 
            <Text key={index} paddingLeft='1' fontSize='md'> {cityElement}, </Text>
        )
    }); 

    return (
        <Box
            width='100%'
            padding='5'
            whiteSpace='initial'
            border='1px' 
            borderColor='gray.200'
            borderRadius='10'
            _hover={{
                background: "white",
                color: "teal.500",
                cursor: 'pointer'
            }}
            bg='white'
            onClick={setSelectedProfile}
        >
            <Flex justifyContent="flex-end">
                <Text fontSize='xl'>{firstName}</Text>
                <Text paddingLeft='1' fontSize='xl'>{middleName}</Text>
                <Text paddingLeft='1' fontSize='xl'>{lastName}</Text>
                <Spacer/>
                <Status status={status}></Status>  
            </Flex>
            <Text fontSize='md'>Age: {age}</Text>
            {city != undefined && city.length > 0 && 
                <Flex>
                    <Text fontSize='md'>Addresses:</Text>
                    {citiesContent}
                </Flex>}
        </Box>
    )
}