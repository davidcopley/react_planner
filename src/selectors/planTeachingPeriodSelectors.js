import {createSelector} from "reselect"
export const getPlanTeachingPeriodReducer = state => state.planTeachingPeriodReducer
export const getTeachingPeriods = state => getPlanTeachingPeriodReducer(state).teachingPeriods
export const getTeachingPeriodsCredits = state => getPlanTeachingPeriodReducer(state).teachingPeriodsCredits
export const getTeachingPeriodsOrder = state => getPlanTeachingPeriodReducer(state).teachingPeriodsOrder
export const getTeachingPeriodByTeachingPeriodCode = (state,props)=> getTeachingPeriods(state)[props.teachingPeriodCode]
export const getTeachingPeriodCreditsByTeachingPeriodCode = (state,props)=> getTeachingPeriodsCredits(state)[props.teachingPeriodCode]
