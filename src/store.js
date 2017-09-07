import { combineReducers,createStore } from "redux";

import coursesDatabaseReducer from "./reducers/coursesDatabaseReducer"
import planCourseReducer from "./reducers/planCourseReducer"
import snapshotsDatabaseReducer from "./reducers/snapshotsDatabaseReducer"
import planTeachingPeriodReducer from "./reducers/planTeachingPeriodReducer"
import unitDatabaseReducer from "./reducers/unitDatabaseReducer"
import dragAndDropReducer from "./reducers/dragAndDropReducer"

const appReducer = combineReducers({
    planCourseReducer,
    planTeachingPeriodReducer,
    unitDatabaseReducer,

    coursesDatabaseReducer,
    snapshotsDatabaseReducer,
    dragAndDropReducer
});

export default createStore(appReducer);
