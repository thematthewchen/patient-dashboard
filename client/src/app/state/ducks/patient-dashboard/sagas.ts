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
    GET_PATIENT_RANGE, 
    GET_PATIENT_RANGE_ERROR, 
    GET_PATIENT_RANGE_SUCCESS, 
    GetPatientRangeAction,
    GET_ALL_PATIENTS,
    GET_ALL_PATIENTS_SUCCESS,
    GET_ALL_PATIENTS_ERROR,
} from './types';
import { Urls } from '../../../../shared/urls';

function* createOrUpdatePatient({payload}: CreatePatientAction): Generator {
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
                key: payload.key,
                value: payload.value
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

function* getPatientRange({payload}: GetPatientRangeAction): Generator {
    try {
        const response: AxiosResponse = (yield axios.get(Urls.GET_PATIENT_RANGE_DATA_ACTION_URL, {
            params: {
                key: payload.key,
                gte: payload.gte,
                lte: payload.lte
            }
        })) as AxiosResponse;
        const data = response.data;
        if (data.error === undefined) {
            yield put({
                type: GET_PATIENT_RANGE_SUCCESS, 
                payload: data
            })
        } else {
            yield put({
                type: GET_PATIENT_RANGE_ERROR, 
                payload: [data.error]
            })
        }
    } catch (e) {
        console.log(e);
        yield put({
            type: GET_PATIENT_RANGE_ERROR,
            payload: [{ code: 'UNEXPECTED_ERROR', message: 'There was an unexpected error getting a patient within range'}]
        })
    }
}

function* getAllPatients(): Generator {
    try {
        const response: AxiosResponse = (yield axios.get(Urls.GET_ALL_PATIENT_DATA_ACTION_URL)) as AxiosResponse;
        const data = response.data;
        if (data.error === undefined) {
            yield put({
                type: GET_ALL_PATIENTS_SUCCESS, 
                payload: data
            })
        } else {
            yield put({
                type: GET_ALL_PATIENTS_ERROR, 
                payload: [data.error]
            })
        }
    } catch (e) {
        console.log(e);
        yield put({
            type: GET_ALL_PATIENTS_ERROR,
            payload: [{ code: 'UNEXPECTED_ERROR', message: 'There was an unexpected error getting all patient data'}]
        })
    }
}

function* deletePatient({payload}: DeletePatientAction): Generator {
    try {
        const response: AxiosResponse = (yield axios.delete(Urls.DELETE_PATIENT_DATA_ACTION_URL, {
            params: {
                id: payload
            }
        })) as AxiosResponse;
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
    yield takeEvery(CREATE_PATIENT, createOrUpdatePatient);
}

function* watchGetPatient() {
    yield takeEvery(GET_PATIENT, getPatient);
}

function* watchGetAllPatient() {
    yield takeEvery(GET_ALL_PATIENTS, getAllPatients);
}

function* watchGetPatientRange() {
    yield takeEvery(GET_PATIENT_RANGE, getPatientRange);
}

function* watchDeletePatient() {
    yield takeEvery(DELETE_PATIENT, deletePatient);
}

export default function* rootSaga(): Generator {
    yield all([fork(watchCreatePatient), 
        fork(watchGetPatient),
        fork(watchGetPatientRange),
        fork(watchGetAllPatient),
        fork(watchDeletePatient)]);
}