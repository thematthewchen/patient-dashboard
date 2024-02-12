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
    const status = props.status === undefined ? 'UNDEFINED' : props.status;
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
                <Text fontSize='xl'>{props.firstName}</Text>
                <Text paddingLeft='1' fontSize='xl'>{props.middleName}</Text>
                <Text paddingLeft='1' fontSize='xl'>{props.lastName}</Text>
                <Spacer/>  
                <Status status={'INQUIRY'}></Status>  
            </Flex>
            <Text fontSize='md'>{props.dateOfBirth}</Text>
            <Text fontSize='md'>{props.addresses}</Text>
        </Box>
    )
}