import React from "react"
import {} from "prop-types/prop-types"

class TeachingPeriodHeader extends React.Component{
    render(){
        const {teachingPeriodCode, totalCredits} = this.props
        return(
            <div style={{minWidth:150,minHeight:100,border:"1px solid red",flexGrow:0,marginTop:10,marginBottom:10}}>
                {teachingPeriodCode}<br/>
                Total Credits: {totalCredits}
            </div>
        )
    }
}

export default TeachingPeriodHeader