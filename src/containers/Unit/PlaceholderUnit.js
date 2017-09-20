import React from "react"
import {connect} from "react-redux"
import {compose} from "redux"
import {DragSource} from "react-dnd"
import {setDragSource} from "../../actionCreators/dragAndDropActions"
import {moveUnit, removeUnit, removeUnitFromPlaceholder} from "../../actionCreators/planActions"
import "./UnitsMenuUnit.css"
import {getUnitByUnitCode} from "../../selectors/unitsDatabaseSelectors"
import {IconButton} from "material-ui"
import {facultyFontColorMap,facultyColors} from "../../constants/colors"
import Close from "material-ui/svg-icons/navigation/close"
import Info from "material-ui/svg-icons/action/info-outline"

const UnitSourceDrag = {
    beginDrag(props, monitor, component){
        const {setDragSource, unit, unitCode,} = props
        const {credit} = unit
        setDragSource({isPlaceholderUnit: true, unitCode})
        return {
            isPlaceholderUnit: true,
            unitCode,
            credit
        }
    },
    endDrag(props,monitor,component){
        if(!monitor.didDrop()){
            console.log("did not drop")
            return
        }
        const {index,teachingPeriodCode,removeUnitFromPlaceholder} = props
        removeUnitFromPlaceholder(index,teachingPeriodCode)
    }
}

const collectDrag = (connect, monitor) => {
    return {
        connectDragSource: connect.dragSource(),
    };
}

class PlaceholderUnit extends React.Component {
    render() {
        const {unit, unitCode, index, teachingPeriodCode,removeUnitFromPlaceholder,placeholderText} = this.props
        const {credit,name,faculty} = unit
        const {connectDragSource} = this.props;
        return connectDragSource(
            <div
                className="units-menu-unit"
                style={{
                    minHeight: 110,
                    maxHeight:110,
                    boxShadow: "rgba(0, 0, 0, 0.12) 0px 1px 6px, rgba(0, 0, 0, 0.12) 0px 1px 4px",
                    background: facultyColors[faculty],
                    flexGrow: 1,
                    alignItems: "center",
                    color:facultyFontColorMap[faculty]
                }}>
                <div style={{padding: 16, userSelect: "none", overflow: "hidden", fontSize: 13,height:88,position:"relative"}}>
                    {unitCode}<br/>
                    {name}<br/>
                    Credits: {credit}<br/>
                    <span style={{fontSize:8}}>
                    ({placeholderText})
                    </span>
                    <IconButton
                        style={{position:"absolute",top:-8,right:-8,zIndex:0}}
                        iconStyle={{height:15,width:15,fill:facultyFontColorMap[faculty]}}
                        onClick={() => removeUnitFromPlaceholder(index,teachingPeriodCode)}
                    >
                        <Close/>
                    </IconButton>
                </div>

            </div>
        )
    }
}

const mapStateToProps = (state,props) => {
    return {
        unit: getUnitByUnitCode(state,props),
        duplicateUnits: state.unitValidationReducer.duplicateUnits}
}

export default compose(connect(mapStateToProps, {
    setDragSource,
    moveUnit,
    removeUnit,
    removeUnitFromPlaceholder
}), DragSource("Unit", UnitSourceDrag, collectDrag))(PlaceholderUnit)