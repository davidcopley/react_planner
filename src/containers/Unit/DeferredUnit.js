import React from "react"
class DeferredUnit extends React.Component {
    render() {
        const {unitWidth, isHovering, canDrop} = this.props
        return (
            <div style={{
                minHeight: 120,
                maxHeight: 120,
                maxWidth: unitWidth,
                minWidth: unitWidth,
                border: isHovering ? "2px solid red" : "1px solid #ffffff",
                flexGrow: 1,
                userSelect: "none",
                background: canDrop ? "#adff6d" : "#f3f3f3",
            }}>
                <div style={{padding: 16, userSelect: "none", overflow: "hidden", fontSize: 13, height: "100%"}}>
                    Deferred
                </div>
            </div>
        )
    }
}


export default DeferredUnit