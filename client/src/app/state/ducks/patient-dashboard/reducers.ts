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
    ADD_ADDRESS,
    ADD_FIELD} from "./types";

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
        addresses: [],
        city: [],
        fieldKeys: [],
        fieldValues: []
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
                }
            }
        };
        case ADD_ADDRESS: {
            return {
                ...state,
                selectedProfile: {
                    ...state.selectedProfile,
                    city: [...state.selectedProfile.city, action.payload]
                }
            }
        };
        case ADD_FIELD: {
            return {
                ...state,
                selectedProfile: {
                    ...state.selectedProfile,
                    fieldKeys: state.selectedProfile.fieldKeys == undefined ? [action.payload.key] : [...state.selectedProfile.fieldKeys, action.payload.key],
                    fieldValues: state.selectedProfile.fieldValues == undefined ? [action.payload.key] : [...state.selectedProfile.fieldValues, action.payload.value],
                }
            }
        };
        default:
            return state;
    }
}

export default dashboardReducer;