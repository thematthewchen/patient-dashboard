import React from 'react';
import {
  Text
} from '@chakra-ui/react'

export interface SearchResultProps {
    status: string,
}

const statusColor = {
    INQUIRY: 'blue.100',
    ONBOARDING: 'yellow.100',
    ACTIVE: 'green.100',
    CHURNED: 'gray.100'
}

export default function SearchResult(props: SearchResultProps) {
    return (
        <Text 
            bg={statusColor[props.status]} 
            borderRadius='5' 
            padding='1'
            justifyContent="flex-end"
            fontSize='md'
        >
            {props.status}
        </Text>
    )
}