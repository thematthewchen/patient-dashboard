import { CREATE_PATIENT, 
    DELETE_PATIENT, 
    DashboardActionTypes, 
    PatientLookup, 
    PatientRangeLookup,
    GET_PATIENT, 
    Patient, 
    SELECT_PATIENT,
    CLEAR_RESULTS, 
    GET_PATIENT_RANGE,
    ADD_ADDRESS,
    REMOVE_ADDRESS,
    ADD_FIELD,
    REMOVE_FIELD,
    Field} from "./types";

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

const addAddressAction = (address: string): DashboardActionTypes => ({
    type: ADD_ADDRESS,
    payload: address
});

const removeAddressAction = (index: number): DashboardActionTypes => ({
    type: REMOVE_ADDRESS,
    payload: index
});

const addFieldAction = (field: Field): DashboardActionTypes => ({
    type: ADD_FIELD,
    payload: field
});

const removeFieldAction = (index: number): DashboardActionTypes => ({
    type: REMOVE_FIELD,
    payload: index
});

export default {
    createOrUpdatePatient,
    getPatient,
    getPatientRange,
    deletePatient,
    selectPatientAction,
    clearSearchResultsAction,
    addAddressAction,
    removeAddressAction,
    addFieldAction,
    removeFieldAction
}