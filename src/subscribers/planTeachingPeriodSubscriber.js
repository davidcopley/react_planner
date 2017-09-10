import store from "../store"
import {validateDuplicateUnits} from "../actionCreators/unitValidationActions"
import {calculateTeachingPeriodCredits} from "../actionCreators/planTeachingPeriodActions"

class PlanTeachingPeriodSubscriber{
    constructor(){
        this.currentPlanTeachingPeriod = null
        store.dispatch(validateDuplicateUnits())
        store.dispatch(calculateTeachingPeriodCredits())
    }
    handlePlanTeachingPeriodChange = () => {
        const previousPlanTeachingPeriod = this.currentPlanTeachingPeriod
        const {planTeachingPeriodReducer} = store.getState()
        const {teachingPeriods} = planTeachingPeriodReducer
        this.currentPlanTeachingPeriod = teachingPeriods
        if(this.currentPlanTeachingPeriod !== previousPlanTeachingPeriod){
            store.dispatch(validateDuplicateUnits())
            store.dispatch(calculateTeachingPeriodCredits())
        }
    }
}

export default store.subscribe(new PlanTeachingPeriodSubscriber().handlePlanTeachingPeriodChange)

