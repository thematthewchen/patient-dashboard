import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../state/store';
import { dashboardActions } from '../state/ducks/patient-dashboard';

const testPatient = {
        "fields": [
            {
                "key": "testKey",
                "values": "testVals"
            }
        ]
    };

export default function Dashboard() {
    const dispatch = useDispatch();
    const dashboardState = useSelector((state: RootState) => state.dashboardState);
    return (
        <div>
            <button onClick={() => {
                dispatch(
                    dashboardActions.createPatient(testPatient)
                )
            }}>Create Patient</button>
            <button onClick={() => {
                dispatch(
                    dashboardActions.getPatient(testPatient) // TODO: fix parameters
                )
            }}>Get Patient</button>
            <button onClick={() => {
                dispatch(
                    dashboardActions.updatePatient(testPatient)
                )
            }}>Update Patient</button>
            <button onClick={() => {
                dispatch(
                    dashboardActions.deletePatient(testPatient)
                )
            }}>Delete Patient</button>
        </div>
    );
}