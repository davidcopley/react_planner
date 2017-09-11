import { combineReducers,createStore,applyMiddleware } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';

import thunk from "redux-thunk"

import coursesDatabaseReducer from "./reducers/coursesDatabaseReducer"
import planCourseReducer from "./reducers/planCourseReducer"
import snapshotsDatabaseReducer from "./reducers/snapshotsDatabaseReducer"
import planTeachingPeriodReducer from "./reducers/planTeachingPeriodReducer"
import unitDatabaseReducer from "./reducers/unitDatabaseReducer"
import dragAndDropReducer from "./reducers/dragAndDropReducer"
import menuReducer from "./reducers/menuReducer"
import unitValidationReducer from "./reducers/unitValidationReducer"
import loadCourseModalReducer from "./reducers/loadCourseModalReducer"

const appReducer = combineReducers({
    planCourseReducer,
    planTeachingPeriodReducer,
    unitDatabaseReducer,

    coursesDatabaseReducer,
    snapshotsDatabaseReducer,
    dragAndDropReducer,
    menuReducer,
    unitValidationReducer,
    loadCourseModalReducer
});

export default createStore(appReducer,composeWithDevTools(applyMiddleware(thunk)));
