import { ApiResponseError, 
    DashboardActionTypes, 
    Patient, 
    Status, 
    GET_PATIENT, 
    GET_PATIENT_SUCCESS, 
    PatientResponse, 
    SELECT_PATIENT, 
    CLEAR_RESULTS} from "./types";

export interface DashboardState {
    patientResponse: PatientResponse;
    selectedProfile: Patient;
    loading: boolean;
    errors: ApiResponseError[];
}

export const initialState: DashboardState = {
    patientResponse: {
        content: [],
        numberOfElements: 0
    },
    selectedProfile: {
        firstName: '',
        middleName: '',
        lastName: '',
        dateOfBirth: '',
        status: Status.ACTIVE,
        addresses: []
    },
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
        case SELECT_PATIENT: {
            return {
                ...state,
                selectedProfile: action.payload,
            }
        }
        case CLEAR_RESULTS: {
            return {
                ...state,
                patientResponse: {
                    content: [],
                    numberOfElements: 0
                }
            }
        }
        default:
            return state;
    }
}

export default dashboardReducer;