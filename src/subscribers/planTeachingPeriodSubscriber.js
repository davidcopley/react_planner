import store from "../store"
import {validateDuplicateUnits} from "../actionCreators/unitValidationActions"

class PlanTeachingPeriodSubscriber{
    constructor(){
        this.currentPlanTeachingPeriod = null
    }
    handlePlanTeachingPeriodChange = () => {
        const previousPlanTeachingPeriod = this.currentPlanTeachingPeriod
        const {planTeachingPeriodReducer} = store.getState()
        const {teachingPeriods} = planTeachingPeriodReducer
        this.currentPlanTeachingPeriod = teachingPeriods
        if(this.currentPlanTeachingPeriod !== previousPlanTeachingPeriod){
            store.dispatch(validateDuplicateUnits())
        }
    }
}

export default store.subscribe(new PlanTeachingPeriodSubscriber().handlePlanTeachingPeriodChange)

