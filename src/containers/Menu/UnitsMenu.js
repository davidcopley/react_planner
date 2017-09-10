import React from "react"
import {connect} from "react-redux"
import UnitsMenuUnit from "../Unit/UnitsMenuUnit"
class UnitsMenu extends React.Component {
    render() {
        const {units} = this.props
        return (
            <span>
                <div style={{width: 200}}/>
            <div style={{
                background: "rgb(0, 108, 171)",
                width: 200,
                minHeight: "100vh",
                maxHeight: "100vh",
                position: "fixed",
                overflowY: "scroll",
                right: 0,
                boxShadow: "rgba(0, 0, 0, 0.12) 0px 1px 6px, rgba(0, 0, 0, 0.12) 0px 1px 4px"
            }}>
                <h2 style={{color: "#ffffff"}}>Units</h2>
                <input placeholder="search text" type="text"></input>
                <button>Search</button>
                {Object.keys(units).map((unitCode, i) => {
                    return <UnitsMenuUnit key={`Menu${unitCode}${i}`} unitCode={unitCode}/>
                })}
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