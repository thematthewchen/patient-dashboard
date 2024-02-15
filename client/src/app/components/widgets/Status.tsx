import React from 'react';
import {
  Text
} from '@chakra-ui/react'

export interface StatusProps {
    status: string,
}

const statusColor = {
    INQUIRY: 'blue.100',
    ONBOARDING: 'yellow.100',
    ACTIVE: 'green.100',
    CHURNED: 'gray.100'
}

/**
 * This component renders a status widget in a search result
 *
 * @param {StatusProps} props contains status about patient
 * @returns {ReactNode} A React element that renders the status widget
 */
export default function Status(props: StatusProps) {
    const { status } = props;
    return (
        <Text 
            bg={statusColor[status]} 
            borderRadius='5' 
            padding='1'
            justifyContent="flex-end"
            fontSize='md'
        >
            {status}
        </Text>
    )
}