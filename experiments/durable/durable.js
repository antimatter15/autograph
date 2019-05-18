import React from 'react'


let durableStates = [];

function matchDurableKey(a, b){
    return a.length === b.length && a.every((k, i) => 
        k.every((x, j) => x === b[i][j]))
}

function getDurableState(key){
    let index = durableStates.findIndex(([k, v]) => matchDurableKey(key, k));
    if(index < 0){
        return null;
    }else{
        return durableStates[index][1];    
    }
}

function setDurableState(key, value){
    let index = durableStates.findIndex(([k, v]) => matchDurableKey(key, k));
    if(value !== null){
        if(index != -1){
            durableStates[index][1] = value;
        }else{
            durableStates.push([ key, value ])
        }
    }else{
        if(index != -1){
            durableStates.splice(index, 1);
        }else{
            // if we're removing something that doesn't exist, don't do anything
        }
    }
}


function getFiberPath(fiber){
    let path = [];
    while(fiber.return){
        path.unshift([fiber.type, fiber.key || fiber.index])
        fiber = fiber.return;
    }
    return path;
}


export default function useStateDurable(stateCreator){
    let rootFiber = React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner.current;
    let cacheMiss;
    let [ state, setState ] = React.useState(() => {
        cacheMiss = true;
        let path = getFiberPath(rootFiber),
            state = getDurableState(path)
        if(state){
            // console.log('restoring state', state)
            return state;
        }else{
            let newState = stateCreator() 
            // console.log('creating state', newState)
            setDurableState(path, newState)
            return newState
        }
    })
    React.useEffect(() => {
        if(cacheMiss){
            let path = getFiberPath(rootFiber);
            setDurableState(path, null)    
        }
        // console.log('removed state at path', cacheMiss, durableStates)
    })
    return state;
}
