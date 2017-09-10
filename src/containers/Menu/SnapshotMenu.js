import React from "react"
import {connect} from "react-redux"
import {loadSnapshotByIndex} from "../../actionCreators/snapshotsActions"
import {resetPlanCourse} from "../../actionCreators/planActions"
const Menu = props => {
    const {snapshots, loadSnapshotByIndex, resetPlanCourse} = props
    const snapshotNames = snapshots.map(snapshot => snapshot.snapshotName)
    return (
        <span>
            <div style={{width: 200, minWidth: 200}}/>
            <div style={{
                overflowY: "scroll",
                background: "rgb(0, 108, 171)",
                width: 200,
                height: "100%",
                minHeight: "100vh",
                boxShadow: "rgba(0, 0, 0, 0.12) 0px 1px 6px, rgba(0, 0, 0, 0.12) 0px 1px 4px",
                position: "fixed"
            }}>
                <h2 style={{color: "white"}}>Snapshots</h2><br/>
                <button onClick={() => resetPlanCourse()} style={{width: "100%", height: 20}}>New Course Plan</button>
                {snapshotNames.map((snapshotName, snapshotIndex) => <div>
                    <button style={{width: "100%", height: 20}}
                            onClick={() => loadSnapshotByIndex(snapshotIndex)}>{snapshotName}</button>
                </div>)}
            </div>
        </span>
    )
}
const mapStateToProps = state => {
    return {
        snapshots: state.snapshotsDatabaseReducer.snapshots
    }
}
export default connect(mapStateToProps, {loadSnapshotByIndex, resetPlanCourse})(Menu)