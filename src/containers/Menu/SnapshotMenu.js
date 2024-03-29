import React from "react"
import {connect} from "react-redux"
import {loadSnapshotByIndex} from "../../actionCreators/snapshotsActions"
import {resetPlanCourse} from "../../actionCreators/planActions"
import {setIsSnapshotsMenuOpen} from "../../actionCreators/menuActions"
import {Drawer, ListItem, List} from "material-ui"
const Menu = props => {
    const {snapshots, loadSnapshotByIndex, resetPlanCourse, isSnapshotMenuOpen, setIsSnapshotsMenuOpen} = props
    const snapshotNames = snapshots.map(snapshot => snapshot.snapshotName)
    return (
        <Drawer open={isSnapshotMenuOpen} docked={false} onRequestChange={(open) => setIsSnapshotsMenuOpen(open)}>
            <div style={{
                height: 80,
                width: "100%",
                boxShadow: "rgba(0, 0, 0, 0.12) 0px 1px 6px, rgba(0, 0, 0, 0.12) 0px 1px 4px",
                backgroundColor:"rgb(0, 108, 171)",
                display:"flex",
                alignItems:"center"
            }}>
                <span style={{fontWeight:500,marginLeft:24,color: "#ffffff",verticalAlign:"middle",fontSize:20}}>Snapshots</span>
            </div>
            <List>
                {snapshotNames.map((snapshotName, snapshotIndex) =>
                    <ListItem
                        key={`snapshotMenu${snapshotName}${snapshotIndex}`}
                        style={{width: "100%"}}
                        onClick={() => loadSnapshotByIndex(snapshotIndex)}
                    >
                        {snapshotName}
                    </ListItem>
                )}
            </List>
        </Drawer>
    )
}
const mapStateToProps = state => {
    return {
        snapshots: state.snapshotsDatabaseReducer.snapshots,
        isSnapshotMenuOpen: state.menuReducer.isSnapshotMenuOpen,
    }
}
export default connect(mapStateToProps, {loadSnapshotByIndex, resetPlanCourse, setIsSnapshotsMenuOpen})(Menu)