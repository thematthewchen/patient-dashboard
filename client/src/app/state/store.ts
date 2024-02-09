import createSagaMiddleware from 'redux-saga';
import { all, fork } from 'redux-saga/effects';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import dashboardReducer, { dashboardSagas } from './ducks/patient-dashboard';

const rootReducer = {
    dashboardState: dashboardReducer,
};

function* rootSaga(): Generator {
    yield all([
        fork(dashboardSagas)
    ]);
}

export function initStore(preloadedState?) {
    const sagaMiddleware = createSagaMiddleware();
    const store = configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) => {
            return getDefaultMiddleware().concat(sagaMiddleware);
        },
        preloadedState,
    });
    sagaMiddleware.run(rootSaga);
    return store;
}

export const store = initStore();
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;