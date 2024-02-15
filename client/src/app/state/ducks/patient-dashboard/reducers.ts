import { ApiResponseError, 
    DashboardActionTypes, 
    Patient, 
    Status, 
    GET_PATIENT, 
    GET_PATIENT_SUCCESS, 
    GET_PATIENT_RANGE,
    GET_PATIENT_RANGE_SUCCESS,
    PatientResponse, 
    SELECT_PATIENT, 
    CLEAR_RESULTS,
    GET_ALL_PATIENTS,
    GET_ALL_PATIENTS_SUCCESS} from "./types";

export interface DashboardState {
    patientSearchResponse: PatientResponse;
    totalPatientResponse: PatientResponse;
    selectedProfile: Patient;
    loading: boolean;
    errors: ApiResponseError[];
}

const noSelectedProfile = {
    firstName: '',
    middleName: '',
    lastName: '',
    dateOfBirth: '',
    age: 0,
    status: Status.UNSELECTED,
    streetAddress: [],
    city: [],
    zipCode: [],
    fieldKeys: [],
    fieldValues: []
}

export const initialState: DashboardState = {
    patientSearchResponse: {
        content: [],
        numberOfElements: 0
    },
    totalPatientResponse: {
        content: [],
        numberOfElements: 0
    },
    selectedProfile: noSelectedProfile,
    loading: false,
    errors: [],
}

const dashboardReducer = (state: DashboardState = initialState, action: DashboardActionTypes): DashboardState => {
    switch(action.type){
        case GET_PATIENT: {
            return {
                ...state,
                loading: true
            }
        };
        case GET_PATIENT_SUCCESS: {
            return {
                ...state,
                patientSearchResponse: action.payload,
                loading: false
            }
        };
        case GET_PATIENT_RANGE: {
            return {
                ...state,
                loading: true
            }
        };
        case GET_PATIENT_RANGE_SUCCESS: {
            return {
                ...state,
                patientSearchResponse: action.payload,
                loading: false
            }
        };
        case GET_ALL_PATIENTS: {
            return {
                ...state,
                loading: true
            }
        };
        case GET_ALL_PATIENTS_SUCCESS: {
            return {
                ...state,
                totalPatientResponse: action.payload,
                loading: false
            }
        };
        case SELECT_PATIENT: {
            return {
                ...state,
                selectedProfile: action.payload,
            }
        };
        case CLEAR_RESULTS: {
            return {
                ...state,
                patientSearchResponse: {
                    content: [],
                    numberOfElements: 0
                },
                selectedProfile: noSelectedProfile
            }
        };
        default:
            return state;
    }
}

export default dashboardReducer;