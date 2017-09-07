import { combineReducers,createStore } from "redux";

import coursesDatabaseReducer from "./reducers/coursesDatabaseReducer"
import planCourseReducer from "./reducers/planCourseReducer"
import snapshotsReducer from "./reducers/snapshotsReducer"
import planTeachingPeriodReducer from "./reducers/planTeachingPeriodReducer"
import unitDatabaseReducer from "./reducers/unitDatabaseReducer"
import dragAndDropReducer from "./reducers/dragAndDropReducer"

const appReducer = combineReducers({
    planCourseReducer,
    planTeachingPeriodReducer,
    unitDatabaseReducer,

    coursesDatabaseReducer,
    snapshotsReducer,
    dragAndDropReducer
});

export default createStore(appReducer);
