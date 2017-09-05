import React from "react"
import {} from "prop-types/prop-types"

class TeachingPeriodHeader extends React.Component{
    render(){
        const {teachingPeriodCode} = this.props
        return(
            <div style={{minWidth:150,minHeight:100,border:"1px solid red",flexGrow:0}}>
                {teachingPeriodCode}
            </div>
        )
    }
}

export default TeachingPeriodHeader