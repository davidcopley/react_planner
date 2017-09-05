import React from "react"

class EmptyUnit extends React.Component{
    render(){
        const {unitWidth} = this.props
        console.log(unitWidth)
        return(
            <div className="empty-unit" style={{minHeight:100,minWidth:unitWidth,border:"1px solid black",flexGrow:1,userSelect:"none"}}>
                EMPTY UNIT
            </div>
        )
    }
}

export default EmptyUnit