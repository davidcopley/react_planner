import store from "../store"
import {validateDuplicateUnits} from "../actionCreators/unitValidationActions"
import {calculateTeachingPeriodCredits} from "../actionCreators/planTeachingPeriodActions"
class PlanTeachingPeriodSubscriber{
    constructor(){
        this.currentPlanTeachingPeriod = null
        //call actions on initialization, otherwise need to wait for teaching periods to update
        store.dispatch(validateDuplicateUnits())
        store.dispatch(calculateTeachingPeriodCredits())
    }
    handlePlanTeachingPeriodChange = () => {
        const previousPlanTeachingPeriod = this.currentPlanTeachingPeriod
        const {planTeachingPeriodReducer} = store.getState()
        const {teachingPeriods} = planTeachingPeriodReducer
        this.currentPlanTeachingPeriod = teachingPeriods
        //MAKE SURE ALL ACTIONS IN THE FOLLOWING IF BLOCK DOES NOT CHANGE planTeachingPeriodReducer.teachingPeriods
        if(this.currentPlanTeachingPeriod !== previousPlanTeachingPeriod){
            store.dispatch(validateDuplicateUnits())
            store.dispatch(calculateTeachingPeriodCredits())
        }
    }
}

export default store.subscribe(new PlanTeachingPeriodSubscriber().handlePlanTeachingPeriodChange)

