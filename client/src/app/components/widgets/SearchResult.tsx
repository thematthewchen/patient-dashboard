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

export interface SearchResultProps extends Patient {}

export default function SearchResult(props: SearchResultProps) {
    const { firstName, middleName, lastName, status, age, city } = props;
    const history = useHistory();
    const dispatch = useDispatch();
    const setSelectedProfile = () => {
        dispatch(
            dashboardActions.selectPatientAction({
                ...props
            })
          );
        history.push('/profile')
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
            }}
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
            <Flex>
                {city != undefined && city.length > 0 ? 
                <>
                    <Text fontSize='md'>Addresses:</Text>
                    {citiesContent}
                </> : <></>}
            </Flex>
        </Box>
    )
}