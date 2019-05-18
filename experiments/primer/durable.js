import React from 'react'

let durableStates = [];

export default function useStateDurable(stateCreator){
    let rootFiber = React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner.current;
    let cacheMiss;
    let [ state, setState ] = React.useState(() => {
        cacheMiss = true;
        let path = getFiberPath(rootFiber),
            state = getKV(durableStates, path)
        // console.log(path)
        if(state !== undefined){
            // console.log('restoring state', state)
            return state;
        }else{
            let newState = stateCreator() 
            // console.log('creating state', newState)
            setKV(durableStates, path, newState)
            return newState
        }
    })
    React.useEffect(() => {
        if(cacheMiss){
            let path = getFiberPath(rootFiber);
            delKV(durableStates, path)    
        }
        // console.log('removed state at path', cacheMiss, durableStates)
    })
    return state;
}


function getFiberPath(fiber){
    let path = [];
    while(fiber.return){
        path.unshift(fiber.type, fiber.key || fiber.index)
        fiber = fiber.return;
    }
    path.unshift(fiber.stateNode)
    return path;
}


// this is basically an implementation of association lists
// with arbitrary custom predicates. this is because javascript
// maps don't support tuple keys. 

function tupleEqual(a, b){
    return a.length === b.length && a.every((k, i) => k === b[i])
}

function getKV(store, key, cmp = tupleEqual){
    let index = store.findIndex(([k, v]) => cmp(key, k));
    return index < 0 ? undefined : store[index][1]
}

function setKV(store, key, value, cmp = tupleEqual){
    let index = store.findIndex(([k, v]) => cmp(key, k));
    if(index != -1) store[index][1] = value;
    else store.push([ key, value ]);
}

function delKV(store, key, cmp = tupleEqual){
    let index = store.findIndex(([k, v]) => cmp(key, k));
    if(index != -1) store.splice(index, 1);
}

