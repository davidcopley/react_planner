import React from "react"
import {connect} from "react-redux"
import UnitsMenuUnit from "../Unit/UnitsMenuUnit"
import {Drawer} from "material-ui"
class UnitsMenu extends React.Component {
    render() {
        const {units,isUnitsMenuOpen} = this.props
        return (
            <Drawer open={isUnitsMenuOpen} openSecondary>
                <div style={{
                    height: 80,
                    width: "100%",
                    boxShadow: "rgba(0, 0, 0, 0.12) 0px 1px 6px, rgba(0, 0, 0, 0.12) 0px 1px 4px",
                    backgroundColor:"rgb(0, 108, 171)"
                }}>
                    <span style={{height:"100%",color: "#ffffff",verticalAlign:"middle"}}>Units</span>
                </div>
                <input placeholder="search text" type="text"/>
                <button>Search</button>
                {Object.keys(units).map((unitCode, i) => {
                    return <UnitsMenuUnit key={`Menu${unitCode}${i}`} unitCode={unitCode}/>
                })}
            </Drawer>
        )
    }
}

const mapStateToProps = state => {
    return {
        units: state.unitDatabaseReducer.units,
        isUnitsMenuOpen: state.menuReducer.isUnitsMenuOpen,
    }
}

export default connect(mapStateToProps)(UnitsMenu)