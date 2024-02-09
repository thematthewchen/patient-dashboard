import { AxiosReponse } from 'axios';

export type ApiResponse = Record<string, unknown>;

export interface ApiResponseError {
    readonly code?: string;
    readonly message?: string;
}

export interface Field {
    key: string,
    values: string
}

export interface Patient extends ApiResponse {
    fields: Field[];
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
    payload: Patient;
}

export const GET_PATIENT_SUCCESS = 'GET_PATIENT_SUCCESS';
export interface GetPatientSuccessAction {
    type: typeof GET_PATIENT_SUCCESS;
    payload?: Patient;
}

export const GET_PATIENT_ERROR = 'GET_PATIENT_ERROR';
export interface GetPatientErrorAction {
    type: typeof CREATE_PATIENT_ERROR;
    payload?: Patient;
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
    payload: Patient;
}

export const DELETE_PATIENT_SUCCESS = 'DELETE_PATIENT_SUCCESS';
export interface DeletePatientSuccessAction {
    type: typeof DELETE_PATIENT_SUCCESS;
    payload?: Patient;
}

export const DELETE_PATIENT_ERROR = 'DELETE_PATIENT_ERROR';
export interface DeletePatientErrorAction {
    type: typeof DELETE_PATIENT_ERROR;
    payload?: Patient;
}

export type DashboardActionTypes = 
    | CreatePatientAction
    | CreatePatientSuccessAction
    | CreatePatientErrorAction
    | GetPatientAction
    | GetPatientSuccessAction
    | GetPatientErrorAction
    | UpdatePatientAction
    | UpdatePatientSuccessAction
    | UpdatePatientErrorAction
    | DeletePatientAction
    | DeletePatientErrorAction
    | DeletePatientSuccessAction;