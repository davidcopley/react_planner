import React from "react"
import {connect} from "react-redux"
import {loadSnapshotByIndex} from "../../actionCreators/snapshotsActions"
import {resetPlanCourse} from "../../actionCreators/planActions"
const Menu = props => {
    const {snapshots,loadSnapshotByIndex,resetPlanCourse} = props
    const snapshotNames = snapshots.map(snapshot=> snapshot.snapshotName)
    return(
        <span>
            <div style={{width:200}}></div>
            <div style={{width: 200, height: "100%", minHeight:"100vh", border: "1px solid black",position:"fixed"}}>
                Menu<br/>
                <button onClick={()=>resetPlanCourse()}>New Course Plan</button>
                {snapshotNames.map((snapshotName,snapshotIndex)=><div><button onClick={()=>loadSnapshotByIndex(snapshotIndex)}>{snapshotName}</button></div>)}
            </div>
        </span>
    )
}
const mapStateToProps =state => {
    return {
        snapshots: state.snapshotsDatabaseReducer.snapshots
    }
}
export default connect(mapStateToProps,{loadSnapshotByIndex,resetPlanCourse})(Menu)