import React from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import { dashboardActions } from '../../state/ducks/patient-dashboard';
import { RootState } from '../../state/store';
import { Urls } from '../../../shared/urls';
import {
    Button,
    Popover,
    PopoverTrigger,
    Portal,
    PopoverContent,
    PopoverArrow,
    PopoverCloseButton,
    PopoverBody,
    Center,
    Alert,
    AlertIcon,
    useToast,
} from '@chakra-ui/react';

/**
 * This component consists of the delete button and handles the deletion of profiles
 *
 * @returns {ReactNode} A React node for the delete button
 */
export default function DeleteProfile() {
    const dispatch = useDispatch();
    const history = useHistory();
    const toast = useToast();
    const dashboardState = useSelector((state: RootState) => state.dashboardState);

    /**
     * deleteProfile handles the deletion of profiles by dispatching deletePatient actions.
     * Additionally this displays a message to the customer and redirects them to the dashboard.
     */
    const deleteProfile = () => {
        dispatch(dashboardActions.deletePatient(dashboardState.selectedProfile.id));
        toast({
            title: 'Profile Deleted',
            description: "We've deleted this profile for you.",
            status: 'success',
            duration: 3000,
            isClosable: true,
        });
        history.push(Urls.DASHBOARD_ROUTE_URL);
    }

    return (
        <>
            <Popover>
            <PopoverTrigger>
                <Button marginTop='5'>Delete Profile</Button>
            </PopoverTrigger>
            <Portal>
                <PopoverContent>
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverBody>
                    <Alert status='warning' marginTop='5'>
                        <AlertIcon />
                        Are you sure you want to delete this profile? This action cannot be undone.
                    </Alert>
                    <Center>
                        <Button margin='5' onClick={deleteProfile} variant='outline'>Continue</Button>
                    </Center>
                </PopoverBody>
                </PopoverContent>
            </Portal>
            </Popover>
        </>
    )
}