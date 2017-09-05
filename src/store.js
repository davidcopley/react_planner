import { combineReducers,createStore } from "redux";

import coursesReducer from "./reducers/coursesReducer"
import planCourseReducer from "./reducers/planCourseReducer"
import snapshotsReducer from "./reducers/snapshotsReducer"
import planTeachingPeriodReducer from "./reducers/planTeachingPeriodReducer"
import planUnitsReducer from "./reducers/planUnitsReducer"

const appReducer = combineReducers({
    planCourseReducer,
    planTeachingPeriodReducer,
    planUnitsReducer,

    coursesReducer,
    snapshotsReducer,
});

export default createStore(appReducer);
