import React from "react"
import {compose} from "redux"
import {connect} from "react-redux"
import {DropTarget} from "react-dnd"
import {moveUnit, insertUnit} from "../../actionCreators/planActions"
import {setIsUnitsMenuOpen} from "../../actionCreators/menuActions"
import "./EmptyUnit.css"
const EmptyUnitTargetDrop = {
    drop(props, monitor, component){
        const {teachingPeriodCode, index, dragSource, moveUnit, insertUnit} = props
        if (dragSource.isUnitsMenuUnit) {
            insertUnit(dragSource.unitCode, index, teachingPeriodCode)
        } else {
            //on drop, move unit from index of teaching period to index of other teaching period
            moveUnit(dragSource.index, dragSource.teachingPeriodCode, index, teachingPeriodCode)
        }
    },
    hover(props, monitor, component){

    },
    canDrop(props, monitor){
        const {isDeferred} = props
        return !isDeferred
    }
}

const collectDrop = (connect, monitor) => {
    return {
        connectDropTarget: connect.dropTarget(),
        isHovering: monitor.isOver(),
        canDrop: monitor.canDrop()
    }
}

class EmptyUnit extends React.Component {
    render() {
        const {connectDropTarget, isHovering, canDrop, setIsUnitsMenuOpen} = this.props
        return (compose(connectDropTarget)(
            <div onClick={() => setIsUnitsMenuOpen(true)} className={"empty-unit"} style={{
                minHeight: 120,
                maxHeight: 120,
                border: isHovering ? "2px solid red" : "1px solid #ffffff",
                flexGrow: 1,
                flex:6,
                userSelect: "none",
                background: "#f3f3f3",
            }}>
                <div style={{padding: 16, userSelect: "none", overflow: "hidden", fontSize: 13, height: "100%"}}>
                    Empty
                </div>
            </div>
        ))
    }
}

const mapStateToProps = state => {
    return {dragSource: state.dragAndDropReducer.dragSource}
}

export default compose(connect(mapStateToProps, {
    moveUnit,
    insertUnit,
    setIsUnitsMenuOpen
}), DropTarget("Unit", EmptyUnitTargetDrop, collectDrop))(EmptyUnit)