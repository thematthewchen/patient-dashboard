import { CREATE_PATIENT, 
    DELETE_PATIENT, 
    DashboardActionTypes, 
    PatientLookup, 
    PatientRangeLookup,
    GET_PATIENT, 
    Patient, 
    SELECT_PATIENT,
    CLEAR_RESULTS, 
    GET_PATIENT_RANGE} from "./types";

const createOrUpdatePatient = (patient: Patient): DashboardActionTypes => ({
    type: CREATE_PATIENT,
    payload: patient,
});

const getPatient = (patientLookup: PatientLookup): DashboardActionTypes => ({
    type: GET_PATIENT,
    payload: patientLookup,
});

const getPatientRange = (patientRangeLookup: PatientRangeLookup): DashboardActionTypes => ({
    type: GET_PATIENT_RANGE,
    payload: patientRangeLookup,
});

const deletePatient = (id: string | undefined): DashboardActionTypes => ({
    type: DELETE_PATIENT,
    payload: id,
});

const selectPatientAction = (patient: Patient): DashboardActionTypes => ({
    type: SELECT_PATIENT,
    payload: patient,
});

const clearSearchResultsAction = (): DashboardActionTypes => ({
    type: CLEAR_RESULTS
});

export default {
    createOrUpdatePatient,
    getPatient,
    getPatientRange,
    deletePatient,
    selectPatientAction,
    clearSearchResultsAction
}