import React from "react"
import {connect} from "react-redux"
import {loadSnapshot} from "../../actionCreators/snapshotsActions"
const Menu = props => {
    const {snapshots,loadSnapshot} = props
    const snapshotNames = snapshots.map(snapshot=> snapshot.snapshotName)
    return(
        <div style={{width: 400, height: "100%", minHeight:"100vh", border: "1px solid black"}}>
            Menu
            {snapshotNames.map((snapshotName,snapshotIndex)=><div><button onClick={()=>loadSnapshot(snapshots[snapshotIndex],snapshotIndex)}>{snapshotName}</button></div>)}
        </div>
    )
}
const mapStateToProps =state => {
    return {
        snapshots: state.snapshotsDatabaseReducer.snapshots
    }
}
export default connect(mapStateToProps,{loadSnapshot})(Menu)