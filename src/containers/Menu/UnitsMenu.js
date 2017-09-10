import React from "react"
import {connect} from "react-redux"
import UnitsMenuUnit from "../Unit/UnitsMenuUnit"
class UnitsMenu extends React.Component {
    render() {
        const {units} = this.props
        return (
            <span>
                <div style={{width:200}}/>
            <div style={{width:200,minHeight:"100vh",maxHeight:"100vh",position:"fixed",overflowY:"scroll",right:0}}>
                <h2>Units</h2>
                {Object.keys(units).map((unitCode,i)=>{return <UnitsMenuUnit key={`Menu${unitCode}${i}`} unitCode={unitCode}/>})}
            </div>
            </span>
        )
    }
}

const mapStateToProps = state => {
    return {
        units: state.unitDatabaseReducer.units
    }
}

export default connect(mapStateToProps)(UnitsMenu)