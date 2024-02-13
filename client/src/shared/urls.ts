const basePrefix = 'http://localhost:8080/patient-dashboard';

export const Urls = {
    // Action Urls for AJAX requests
    CREATE_PATIENT_DATA_ACTION_URL: basePrefix + '/create-patient-data', 
    GET_PATIENT_DATA_ACTION_URL: basePrefix + '/get-patient-data', 
    GET_PATIENT_RANGE_DATA_ACTION_URL: basePrefix + '/get-patient-in-range-data', 
    UPDATE_PATIENT_DATA_ACTION_URL: basePrefix + '/update-patient-data', 
    DELETE_PATIENT_DATA_ACTION_URL: basePrefix + '/delete-patient-data', 
}