philosophy:

    Redux
    1. all reducers should have rudimentary operations: SET,APPEND,INSERT,ADD,REMOVE
    2. all each rudimentary reducer operation should have an equivalent action
    3. all actions should a sequence of rudimentary operations
    React
    1. all props must not be react components
    2. all props must not be functions, if a prop is a function, it should be an action
    3. all components should be able to exist independently

reducer naming conventions:
 
    SET : overwrites entire element, list and object
    APPEND: appends to end of list, list only
    INSERT: insert to list by index, list only
    ADD: add key to object, object only
    REMOVE: remove from list and object
     
action naming conventions:
    
     set : overwrites entire, list and object
     append: appends to end of list, list only
     insert: insert to list by index, list only
     add: add key to object, object only
     remove: remove from list and object
     
snapshot naming:
    
    loadBy[param name] :loading snapshots with given param
    saveBy[param name] : saving snapshots with given param