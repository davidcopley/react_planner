import React from "react"
import {connect} from "react-redux"
import UnitsMenuUnit from "../Unit/UnitsMenuUnit"
class UnitsMenu extends React.Component {
    render() {
        const {units} = this.props
        return (
            <div style={{maxHeight:"100vh",overflowY:"scroll"}}>
                {Object.keys(units).map((unitCode,i)=>{return <UnitsMenuUnit key={`Menu${unitCode}${i}`} unitCode={unitCode}/>})}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        units: state.unitDatabaseReducer.units
    }
}

export default connect(mapStateToProps)(UnitsMenu)