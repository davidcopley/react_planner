import React from "react"
import {connect} from "react-redux"

class NewUnit extends React.Component {
    render() {
        const {units, unitCode, unitWidth} = this.props
        const myUnit = units[unitCode]
        const myUnitCredit = myUnit["credit"]
        const myUnitWidth = unitWidth * (myUnitCredit / 6)
        return (
            <div style={{minHeight: 100, minWidth: myUnitWidth, border: "1px solid black", flexGrow: 1,alignItems:"center"}}>
                <div style={{padding:10,userSelect:"none"}}>
                    {unitCode}<br/>
                    {myUnit.name}
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {units: state.planUnitsReducer.units}
}

export default connect(mapStateToProps)(NewUnit)