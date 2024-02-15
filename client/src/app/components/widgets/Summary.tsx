import React, { useEffect } from 'react';
import {
  Text,
  Stat,
  StatLabel,
  StatNumber,
  StatGroup,
  StatHelpText,
  Card,
  CardHeader,
  Heading,
  CardBody,
  Stack,
  StackDivider,
  Box
} from '@chakra-ui/react'
import { dashboardActions } from '../../state/ducks/patient-dashboard';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../state/store';
import { Status } from '../../state/ducks/patient-dashboard/types';

/**
 * This component renders a summary of the patient data for the dashboard
 * 
 * @returns {ReactNode} A React element that renders the summary
 */
export default function Summary() {
    const dispatch = useDispatch();
    const dashboardState = useSelector((state: RootState) => state.dashboardState);

    /**
     * getStatusCount returns the number of patients with a given status
     *
     * @param {string} status the status to filter patients by
     * @returns {number} the total number of patients with a given status
     */
    const getStatusCount = (status: string) => {
        return dashboardState.totalPatientResponse.content.filter((patient) => patient.status === status).length;
    }

    useEffect(() => {
        dispatch(dashboardActions.getAllPatients());
    }, [dashboardState.totalPatientResponse]);

    return (
        <Card>
            <CardBody>
                <Stack divider={<StackDivider />} spacing='4'>
                <Box>
                <Text size='md' marginBottom='5'>Total Patients</Text>
                    <Stat>
                        <StatNumber>{dashboardState.totalPatientResponse.numberOfElements}</StatNumber>
                    </Stat>
                </Box>
                <Box>
                <Text size='md' marginBottom='5'>Patient Status</Text>
                <StatGroup>
                    <Stat>
                        <StatLabel># Inquiry</StatLabel>
                        <StatNumber>{getStatusCount(Status.INQUIRY)}</StatNumber>
                    </Stat>

                    <Stat>
                        <StatLabel># Onboarding</StatLabel>
                        <StatNumber>{getStatusCount(Status.ONBOARDING)}</StatNumber>
                    </Stat>
                    <Stat>
                        <StatLabel># Active</StatLabel>
                        <StatNumber>{getStatusCount(Status.ACTIVE)}</StatNumber>
                    </Stat>
                    <Stat>
                        <StatLabel># Churned</StatLabel>
                        <StatNumber>{getStatusCount(Status.CHURNED)}</StatNumber>
                    </Stat>
                </StatGroup>
                </Box>
                </Stack>
            </CardBody>
        </Card>
    )
}