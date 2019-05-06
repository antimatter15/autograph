var index = null,
    queue = null,
    stack = null;


function amb(x){
    // when amb is executed outside of a funky context
    // it is identical to the identity function
    if(index === null || queue === null || stack === null){
        return x;
    }
    // increment the index pointer
    index++
    // check if there is a known override that we should be using
    if(stack[index] !== undefined){
        return stack[index]
    }else{
        // set current index to current value
        stack[index] = !!x;
        // create a dual for the current stack where the value is different
        // and append it to the exploration queue
        var dual = stack.slice(0)
        dual[index] = !x;
        queue.push(dual)
        return x;
    }
}


function explore(fn){
    queue = [[]]
    var results = []
    while(stack = queue.shift()){
        index = -1
        results.push(fn())
    }
    queue = null
    index = null
    stack = null
    return results
}


function check(fn, reference){
    let results = explore(fn);
    if(JSON.stringify(results) != JSON.stringify(reference)){
        console.log('> Failed', fn.name, results, 'Expected: ', reference)
    }else{
        console.log('Passed', fn.name, results)
    }
}



function noBranch(){
    return 'X'
}


function oneBranch(){
    let conds = ''
    if(amb(true)){
        conds += 'A'
    }else{
        conds += 'B'
    }
    return conds
}


function elseChain(){
    let conds = ''
    if(amb(true)){
        conds += 'A'
    }else if(amb(false)){
        conds += 'B'
    }else if(amb(true)){
        conds += 'C'
    }else if(amb(true)){
        conds += 'D'
    }else{
        conds += 'E'
    }
    return conds
}



function nestedBranches(){
    let conds = ''
    if(amb(true)){
        if(amb(false)){
            conds += 'A'
        }else{
            conds += 'B'
        }
    }else{
        conds += 'C'
    }
    return conds
}


function nestedBranches2(){
    let conds = ''
    if(amb(true)){
        if(amb(false)){
            conds += 'A'
        }else{
            conds += 'B'
        }
    }else{
        if(amb(false)){
            conds += 'C'
        }else{
            conds += 'D'
        }
    }
    return conds
}


function independentBranches2(){
    let conds = ''
    if(amb(true)){
        conds += 'A'
    }else{
        conds += 'B'
    }
    if(amb(false)){
        conds += 'C'
    }else{
        conds += 'D'
    }
    return conds
}

function independentBranches3(){
    let conds = ''
    if(amb(true)){
        conds += 'A'
    }else{
        conds += 'B'
    }
    if(amb(false)){
        conds += 'C'
    }else{
        conds += 'D'
    }
    if(amb(true)){
        conds += 'E'
    }else{
        conds += 'F'
    }
    return conds
}


check(noBranch, ['X'])
check(oneBranch, ['A', 'B'])
check(independentBranches2, [ 'AD', 'BD', 'AC', 'BC' ])
check(independentBranches3, [ 'ADE', 'BDE', 'ACE', 'ADF', 'BCE', 'BDF', 'ACF', 'BCF' ])
check(nestedBranches, [ 'B', 'C', 'A' ])
check(nestedBranches2, [ 'B', 'D', 'A', 'C' ])
check(elseChain, [ 'A', 'C', 'B', 'D', 'E' ])