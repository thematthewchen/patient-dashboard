const basePrefix = 'http://localhost:8080/patient-dashboard';

export const Urls = {
    // Action Urls for Axios requests
    CREATE_PATIENT_DATA_ACTION_URL: basePrefix + '/create-patient-data', 
    GET_PATIENT_DATA_ACTION_URL: basePrefix + '/get-patient-data', 
    GET_PATIENT_RANGE_DATA_ACTION_URL: basePrefix + '/get-patient-in-range-data', 
    GET_ALL_PATIENT_DATA_ACTION_URL: basePrefix + '/get-all-patient-data', 
    UPDATE_PATIENT_DATA_ACTION_URL: basePrefix + '/update-patient-data', 
    DELETE_PATIENT_DATA_ACTION_URL: basePrefix + '/delete-patient-data', 

    // Routes for different pages
    DASHBOARD_ROUTE_URL: '/dashboard',
    NEW_PATIENT_PROFILE_ROUTE_URL: '/new-profile',
    PROFILE_ROUTE_URL: '/profile',
    SIGN_IN_ROUTE_URL: '/sign-in',
    CREATE_ACCOUNT_ROUTE_URL: '/create-account'
}