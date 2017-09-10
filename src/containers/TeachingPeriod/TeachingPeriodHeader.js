import React from "react"
import {connect} from "react-redux"
import {removeTeachingPeriodByTeachingPeriodCode,setIsDeferTeachingPeriodByTeachingPeriodCode} from "../../actionCreators/planActions"

class TeachingPeriodHeader extends React.Component{
    render(){
        const {teachingPeriodCode, totalCredits,removeTeachingPeriodByTeachingPeriodCode,isDeferred,setIsDeferTeachingPeriodByTeachingPeriodCode,isFirst,isLast} = this.props
        const isWinter = teachingPeriodCode.match(/WINTER/)
        const isSummer = teachingPeriodCode.match(/SUMMER/)
        const isSpecialTeachingPeriod = isSummer || isWinter
        return(
            <div style={{minWidth:200,minHeight:100,border:"1px solid red",flexGrow:0,marginTop:10,marginBottom:10,background:isSummer?"#ff9a53":isWinter?"#c2ecff":"#ffffff"}}>
                {teachingPeriodCode}<br/>
                Total Credits: {totalCredits}<br/>
                {(isFirst||isLast||isSpecialTeachingPeriod)&&<button onClick={()=>removeTeachingPeriodByTeachingPeriodCode(teachingPeriodCode)}>Remove</button>}<br/>
                {!isFirst&&!isLast&&<button onClick={()=>setIsDeferTeachingPeriodByTeachingPeriodCode(teachingPeriodCode,!isDeferred)}>Defer</button>}
                Deferred:{isDeferred?"TRUE":"FALSE"}
            </div>
        )
    }
}

export default connect(null,{removeTeachingPeriodByTeachingPeriodCode,setIsDeferTeachingPeriodByTeachingPeriodCode})(TeachingPeriodHeader)