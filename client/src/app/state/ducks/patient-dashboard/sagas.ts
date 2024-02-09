import axios, { AxiosResponse } from 'axios';
import { all, fork, put, takeEvery } from 'redux-saga/effects';
import { CREATE_PATIENT, 
    CREATE_PATIENT_ERROR, 
    CREATE_PATIENT_SUCCESS, 
    CreatePatientAction, 
    DELETE_PATIENT, 
    DELETE_PATIENT_ERROR, 
    DELETE_PATIENT_SUCCESS, 
    DeletePatientAction, 
    GET_PATIENT, 
    GET_PATIENT_ERROR, 
    GET_PATIENT_SUCCESS, 
    GetPatientAction, 
    UPDATE_PATIENT,
    UPDATE_PATIENT_ERROR, 
    UPDATE_PATIENT_SUCCESS, 
    UpdatePatientAction } from './types';
import { Urls } from '../../../../shared/urls';

function* createPatient({payload}: CreatePatientAction): Generator {
    try {
        const response: AxiosResponse = (yield axios.post(Urls.CREATE_PATIENT_DATA_ACTION_URL, payload)) as AxiosResponse;
        const data = response.data;
        if (data.error === undefined) {
            yield put({
                type: CREATE_PATIENT_SUCCESS, 
                payload: data
            })
        } else {
            yield put({
                type: CREATE_PATIENT_ERROR, 
                payload: [data.error]
            })
        }
    } catch (e) {
        console.log(e);
        yield put({
            type: CREATE_PATIENT_ERROR,
            payload: [{ code: 'UNEXPECTED_ERROR', message: 'There was an unexpected error creating a patient'}]
        })
    }
}

function* getPatient({payload}: GetPatientAction): Generator {
    try {
        const response: AxiosResponse = (yield axios.get(Urls.GET_PATIENT_DATA_ACTION_URL, {
            params: {
                payload
            }
        })) as AxiosResponse;
        const data = response.data;
        if (data.error === undefined) {
            yield put({
                type: GET_PATIENT_SUCCESS, 
                payload: data
            })
        } else {
            yield put({
                type: GET_PATIENT_ERROR, 
                payload: [data.error]
            })
        }
    } catch (e) {
        console.log(e);
        yield put({
            type: GET_PATIENT_ERROR,
            payload: [{ code: 'UNEXPECTED_ERROR', message: 'There was an unexpected error getting a patient'}]
        })
    }
}

function* updatePatient({payload}: UpdatePatientAction): Generator {
    try {
        const response: AxiosResponse = (yield axios.post(Urls.UPDATE_PATIENT_DATA_ACTION_URL, payload)) as AxiosResponse;
        const data = response.data;
        if (data.error === undefined) {
            yield put({
                type: UPDATE_PATIENT_SUCCESS, 
                payload: data
            })
        } else {
            yield put({
                type: UPDATE_PATIENT_ERROR, 
                payload: [data.error]
            })
        }
    } catch (e) {
        console.log(e);
        yield put({
            type: UPDATE_PATIENT_ERROR,
            payload: [{ code: 'UNEXPECTED_ERROR', message: 'There was an unexpected error updating a patient'}]
        })
    }
}

function* deletePatient({payload}: DeletePatientAction): Generator {
    try {
        const response: AxiosResponse = (yield axios.post(Urls.DELETE_PATIENT_DATA_ACTION_URL, payload)) as AxiosResponse;
        const data = response.data;
        if (data.error === undefined) {
            yield put({
                type: DELETE_PATIENT_SUCCESS, 
                payload: data
            })
        } else {
            yield put({
                type: DELETE_PATIENT_ERROR, 
                payload: [data.error]
            })
        }
    } catch (e) {
        console.log(e);
        yield put({
            type: DELETE_PATIENT_ERROR,
            payload: [{ code: 'UNEXPECTED_ERROR', message: 'There was an unexpected error deleting a patient'}]
        })
    }
}

function* watchCreatePatient() {
    yield takeEvery(CREATE_PATIENT, createPatient);
}

function* watchGetPatient() {
    yield takeEvery(GET_PATIENT, getPatient);
}

function* watchUpdatePatient() {
    yield takeEvery(UPDATE_PATIENT, updatePatient);
}

function* watchDeletePatient() {
    yield takeEvery(DELETE_PATIENT, deletePatient);
}

export default function* rootSaga(): Generator {
    yield all([fork(watchCreatePatient), 
        fork(watchGetPatient),
        fork(watchUpdatePatient),
        fork(watchDeletePatient)]);
}