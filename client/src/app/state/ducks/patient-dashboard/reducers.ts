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
    CLEAR_RESULTS} from "./types";

export interface DashboardState {
    patientResponse: PatientResponse;
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
    patientResponse: {
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
                patientResponse: action.payload,
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
                patientResponse: action.payload,
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
                patientResponse: {
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