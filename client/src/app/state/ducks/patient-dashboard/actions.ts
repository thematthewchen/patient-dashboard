import { CREATE_PATIENT, DELETE_PATIENT, DashboardActionTypes, GET_PATIENT, Patient, UPDATE_PATIENT } from "./types";

const createPatient = (patient: Patient): DashboardActionTypes => ({
    type: CREATE_PATIENT,
    payload: patient,
});

const getPatient = (patient: Patient): DashboardActionTypes => ({
    type: GET_PATIENT,
    payload: patient,
});

const updatePatient = (patient: Patient): DashboardActionTypes => ({
    type: UPDATE_PATIENT,
    payload: patient,
});

const deletePatient = (patient: Patient): DashboardActionTypes => ({
    type: DELETE_PATIENT,
    payload: patient,
});

export default {
    createPatient,
    getPatient,
    updatePatient,
    deletePatient
}