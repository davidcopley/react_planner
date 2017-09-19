import store from "../store"
import {getTeachingPeriods} from "../selectors/planTeachingPeriodSelectors"
import {validateDuplicateUnits,validateInvalidTimeslotUnits} from "../actionCreators/unitValidationActions"
import {calculateTeachingPeriodCredits,sortTeachingPeriodOrder} from "../actionCreators/planTeachingPeriodActions"
class PlanTeachingPeriodSubscriber{
    constructor(){
        this.currentPlanTeachingPeriod = null
        //call actions on initialization, otherwise need to wait for teaching periods to update
        store.dispatch(validateDuplicateUnits())
        store.dispatch(calculateTeachingPeriodCredits())
        store.dispatch(sortTeachingPeriodOrder())
        store.dispatch(validateInvalidTimeslotUnits())
    }
    handlePlanTeachingPeriodChange = () => {
        const previousPlanTeachingPeriod = this.currentPlanTeachingPeriod
        this.currentPlanTeachingPeriod = getTeachingPeriods(store.getState())
        //MAKE SURE ALL ACTIONS IN THE FOLLOWING IF BLOCK DOES NOT CHANGE planTeachingPeriodReducer.teachingPeriods
        if(this.currentPlanTeachingPeriod !== previousPlanTeachingPeriod){
            store.dispatch(validateDuplicateUnits())
            store.dispatch(validateInvalidTimeslotUnits())
            store.dispatch(calculateTeachingPeriodCredits())
            store.dispatch(sortTeachingPeriodOrder())
        }
    }
}

export default store.subscribe(new PlanTeachingPeriodSubscriber().handlePlanTeachingPeriodChange)

