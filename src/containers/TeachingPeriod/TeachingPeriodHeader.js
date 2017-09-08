import React from "react"
import {connect} from "react-redux"
import {removeTeachingPeriodByTeachingPeriodCode} from "../../actionCreators/planActions"

class TeachingPeriodHeader extends React.Component{
    render(){
        const {teachingPeriodCode, totalCredits,removeTeachingPeriodByTeachingPeriodCode} = this.props
        return(
            <div style={{minWidth:150,minHeight:100,border:"1px solid red",flexGrow:0,marginTop:10,marginBottom:10}}>
                {teachingPeriodCode}<br/>
                Total Credits: {totalCredits}<br/>
                <button onClick={()=>removeTeachingPeriodByTeachingPeriodCode(teachingPeriodCode)}>Remove</button>
            </div>
        )
    }
}

export default connect(null,{removeTeachingPeriodByTeachingPeriodCode})(TeachingPeriodHeader)