import { combineReducers,createStore,applyMiddleware } from "redux";
import thunk from "redux-thunk"

import coursesDatabaseReducer from "./reducers/coursesDatabaseReducer"
import planCourseReducer from "./reducers/planCourseReducer"
import snapshotsDatabaseReducer from "./reducers/snapshotsDatabaseReducer"
import planTeachingPeriodReducer from "./reducers/planTeachingPeriodReducer"
import unitDatabaseReducer from "./reducers/unitDatabaseReducer"
import dragAndDropReducer from "./reducers/dragAndDropReducer"
import menuReducer from "./reducers/menuReducer"

const appReducer = combineReducers({
    planCourseReducer,
    planTeachingPeriodReducer,
    unitDatabaseReducer,

    coursesDatabaseReducer,
    snapshotsDatabaseReducer,
    dragAndDropReducer,
    menuReducer
});

export default createStore(appReducer,applyMiddleware(thunk));
