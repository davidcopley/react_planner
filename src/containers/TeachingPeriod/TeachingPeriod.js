import React from "react"
import {connect} from "react-redux"
import TeachingPeriodHeader from "./TeachingPeriodHeader"
import Unit from "../Unit/Unit"
import EmptyUnit from "../Unit/EmptyUnit"
import Sortable from "sortablejs"
import {moveUnit} from "../../actionCreators/planActions"

class TeachingPeriod extends React.Component{

    sortableGroupDecorator = componentBackingInstance => {
        const {moveUnit} = this.props
        if(componentBackingInstance){
            let options = {
                draggable: "div", // Specifies which items inside the element should be sortable
                group: "shared",
                animation: 200,
                filter:".empty-unit",
                onStart:e=>console.log(e,e.oldIndex),
                onAdd:e=>{e.from.append(e.item);moveUnit(e.oldIndex,e.from.parentNode.id,e.newIndex,e.to.parentNode.id);},
                onUpdate: e=>{e.from.append(e.item);moveUnit(e.oldIndex,e.from.parentNode.id,e.newIndex,e.to.parentNode.id);}
            };
            Sortable.create(componentBackingInstance, options);
        }
    }

    renderUnits = () => {

        const calculateTeachingPeriodUnitWidth = (unitsCodes,units) => {
            let unitWidth = 0
            const totalCredits = unitsCodes.reduce((totalCredits,unitCode)=>units[unitCode]["credit"]+totalCredits,0)
            if(totalCredits<24){
                unitWidth = 850/(24/6)
            }else{
                unitWidth = 850/(totalCredits/6)
            }
            return unitWidth
        }

        const {teachingPeriods,teachingPeriodCode,units} = this.props
        const myTeachingPeriod = teachingPeriods[teachingPeriodCode]
        let unitsCodes = myTeachingPeriod["units"]
        let unitWidth = calculateTeachingPeriodUnitWidth(unitsCodes,units)
        let unitsArray = unitsCodes.map(unitCode=><Unit className="unit" key={`unit${unitCode}`} unitCode={unitCode} unitWidth={unitWidth}/>)
        const emptyUnits = 4-unitsArray.length;
        if(emptyUnits){
            for(let i = 0; i < emptyUnits; i++){
                unitsArray.push(<EmptyUnit key={`emptyUnit${i}`} unitWidth={unitWidth}/>)
            }
        }
        return (
            <div ref={this.sortableGroupDecorator} style={{display:"flex",minWidth:850,maxWidth:850,padding:10}}>
                {unitsArray}
            </div>
        )
    }

    render(){
        console.log("TEACHING PERIOD RENDER")
        //extract my teaching period from redux by teaching period code
        const {teachingPeriodCode} = this.props
        return(
            <div id={teachingPeriodCode} style={{display:"flex"}}>
                <TeachingPeriodHeader teachingPeriodCode={teachingPeriodCode}/>
                    {this.renderUnits()}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    teachingPeriods:state.planTeachingPeriodReducer.teachingPeriods,
    units:state.planUnitsReducer.units
})

export default connect(mapStateToProps,{moveUnit})(TeachingPeriod)