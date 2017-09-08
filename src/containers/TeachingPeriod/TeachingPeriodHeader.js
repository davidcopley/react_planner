import React from "react"
import {connect} from "react-redux"
import {removeTeachingPeriodByTeachingPeriodCode,setIsDeferTeachingPeriodByTeachingPeriodCode} from "../../actionCreators/planActions"

class TeachingPeriodHeader extends React.Component{
    render(){
        const {teachingPeriodCode, totalCredits,removeTeachingPeriodByTeachingPeriodCode,isDeferred,setIsDeferTeachingPeriodByTeachingPeriodCode,isFirst,isLast} = this.props
        console.log(isDeferred)
        return(
            <div style={{minWidth:150,minHeight:100,border:"1px solid red",flexGrow:0,marginTop:10,marginBottom:10}}>
                {teachingPeriodCode}<br/>
                Total Credits: {totalCredits}<br/>
                {console.log(isFirst,isLast)}
                {(isFirst||isLast)&&<button onClick={()=>removeTeachingPeriodByTeachingPeriodCode(teachingPeriodCode)}>Remove</button>}<br/>
                {!isFirst&&!isLast&&<button onClick={()=>setIsDeferTeachingPeriodByTeachingPeriodCode(teachingPeriodCode,!isDeferred)}>Defer</button>}
            </div>
        )
    }
}

export default connect(null,{removeTeachingPeriodByTeachingPeriodCode,setIsDeferTeachingPeriodByTeachingPeriodCode})(TeachingPeriodHeader)