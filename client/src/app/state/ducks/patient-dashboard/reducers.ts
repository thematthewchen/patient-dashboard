import { ApiResponseError, DashboardActionTypes } from "./types";

export interface DashboardState {
    loading: boolean;
    errors: ApiResponseError[];
}

export const initialState: DashboardState = {
    loading: false,
    errors: [],
}

const dashboardReducer = (state: DashboardState = initialState, action: DashboardActionTypes): DashboardState => {
    switch(action.type){
        // TODO
        default:
            return state;
    }
}

export default dashboardReducer;