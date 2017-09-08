import React from "react"
import {connect} from "react-redux"
import {removeTeachingPeriodByTeachingPeriodCode,setIsDeferTeachingPeriodByTeachingPeriodCode} from "../../actionCreators/planActions"

class TeachingPeriodHeader extends React.Component{
    render(){
        const {teachingPeriodCode, totalCredits,removeTeachingPeriodByTeachingPeriodCode,isDeferred,setIsDeferTeachingPeriodByTeachingPeriodCode} = this.props
        console.log(isDeferred)
        return(
            <div style={{minWidth:150,minHeight:100,border:"1px solid red",flexGrow:0,marginTop:10,marginBottom:10}}>
                {teachingPeriodCode}<br/>
                Total Credits: {totalCredits}<br/>
                <button onClick={()=>removeTeachingPeriodByTeachingPeriodCode(teachingPeriodCode)}>Remove</button><br/>
                Is Deferred: {isDeferred?"True":"False"}<br/>
                <button onClick={()=>setIsDeferTeachingPeriodByTeachingPeriodCode(teachingPeriodCode,!isDeferred)}>Defer</button><br/>
            </div>
        )
    }
}

export default connect(null,{removeTeachingPeriodByTeachingPeriodCode,setIsDeferTeachingPeriodByTeachingPeriodCode})(TeachingPeriodHeader)