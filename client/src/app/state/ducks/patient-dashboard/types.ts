export type ApiResponse = Record<string, unknown>;

export interface ApiResponseError {
    readonly code?: string;
    readonly message?: string;
}

export enum Status {
    UNSELECTED = '',
    INQUIRY = 'INQUIRY',
    ONBOARDING = 'ONBOARDING',
    ACTIVE = 'ACTIVE',
    CHURNED = 'CHURNED'
}

export interface Field {
    key: string,
    value: string
}

export interface Patient {
    id?: string,
    firstName: string,
    middleName: string,
    lastName: string,
    dateOfBirth: string,
    age: number,
    status: Status,
    streetAddress: string[],
    city: string[]
    zipCode: string[]
    fieldKeys: string[],
    fieldValues: string[],
}

export interface PatientLookup {
    key: string,
    value: string
}

export interface PatientRangeLookup {
    key: string,
    gte: number,
    lte: number
}

export interface PatientResponse extends ApiResponse {
    content: Patient[],
    numberOfElements: number
}

// Action Types
export const CREATE_PATIENT = 'CREATE_PATIENT';
export interface CreatePatientAction {
    type: typeof CREATE_PATIENT;
    payload: Patient;
}

export const CREATE_PATIENT_SUCCESS = 'CREATE_PATIENT_SUCCESS';
export interface CreatePatientSuccessAction {
    type: typeof CREATE_PATIENT_SUCCESS;
    payload?: Patient;
}

export const CREATE_PATIENT_ERROR = 'CREATE_PATIENT_ERROR';
export interface CreatePatientErrorAction {
    type: typeof CREATE_PATIENT_ERROR;
    payload?: Patient;
}

export const GET_PATIENT = 'GET_PATIENT';
export interface GetPatientAction {
    type: typeof GET_PATIENT;
    payload: PatientLookup;
}

export const GET_PATIENT_SUCCESS = 'GET_PATIENT_SUCCESS';
export interface GetPatientSuccessAction {
    type: typeof GET_PATIENT_SUCCESS;
    payload: PatientResponse;
}

export const GET_PATIENT_ERROR = 'GET_PATIENT_ERROR';
export interface GetPatientErrorAction {
    type: typeof GET_PATIENT_ERROR;
    payload: PatientResponse;
}

export const GET_PATIENT_RANGE = 'GET_PATIENT_RANGE';
export interface GetPatientRangeAction {
    type: typeof GET_PATIENT_RANGE;
    payload: PatientRangeLookup;
}

export const GET_PATIENT_RANGE_SUCCESS = 'GET_PATIENT_RANGE_SUCCESS';
export interface GetPatientRangeSuccessAction {
    type: typeof GET_PATIENT_RANGE_SUCCESS;
    payload: PatientResponse;
}

export const GET_PATIENT_RANGE_ERROR = 'GET_PATIENT_RANGE_ERROR';
export interface GetPatientRangeErrorAction {
    type: typeof GET_PATIENT_RANGE_ERROR;
    payload: PatientResponse;
}

export const UPDATE_PATIENT = 'UPDATE_PATIENT';
export interface UpdatePatientAction {
    type: typeof UPDATE_PATIENT;
    payload: Patient;
}

export const UPDATE_PATIENT_SUCCESS = 'UPDATE_PATIENT_SUCCESS';
export interface UpdatePatientSuccessAction {
    type: typeof UPDATE_PATIENT_SUCCESS;
    payload?: Patient;
}

export const UPDATE_PATIENT_ERROR = 'UPDATE_PATIENT_ERROR';
export interface UpdatePatientErrorAction {
    type: typeof UPDATE_PATIENT_ERROR;
    payload?: Patient;
}

export const DELETE_PATIENT = 'DELETE_PATIENT';
export interface DeletePatientAction {
    type: typeof DELETE_PATIENT;
    payload: string | undefined;
}

export const DELETE_PATIENT_SUCCESS = 'DELETE_PATIENT_SUCCESS';
export interface DeletePatientSuccessAction {
    type: typeof DELETE_PATIENT_SUCCESS;
}

export const DELETE_PATIENT_ERROR = 'DELETE_PATIENT_ERROR';
export interface DeletePatientErrorAction {
    type: typeof DELETE_PATIENT_ERROR;
}

export const SELECT_PATIENT = 'SELECT_PATIENT';
export interface SelectPatientAction {
    type: typeof SELECT_PATIENT;
    payload: Patient;
}

export const CLEAR_RESULTS = 'CLEAR_RESULTS';
export interface ClearResultsAction {
    type: typeof CLEAR_RESULTS;
}

export type DashboardActionTypes = 
    | CreatePatientAction
    | CreatePatientSuccessAction
    | CreatePatientErrorAction
    | GetPatientAction
    | GetPatientSuccessAction
    | GetPatientErrorAction
    | GetPatientRangeAction
    | GetPatientRangeSuccessAction
    | GetPatientRangeErrorAction
    | UpdatePatientAction
    | UpdatePatientSuccessAction
    | UpdatePatientErrorAction
    | DeletePatientAction
    | DeletePatientErrorAction
    | DeletePatientSuccessAction
    | SelectPatientAction
    | ClearResultsAction;