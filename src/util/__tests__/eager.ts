import { eager, explore } from "../eager";

test('no branch', () => {
    let execs = 0;
    explore(() => {
        execs++;
    })
    expect(execs).toBe(1)
})

test('basic test', () => {
    let yes_count = 0,
        no_count = 0;
    explore(() => {
        if(eager(true)){
            yes_count++
        }else{
            no_count++
        }
    })
    expect(yes_count).toBe(1)
    expect(no_count).toBe(1)
})


test('nested explore', () => {
    let yes_count = 0,
        no_count = 0;
    explore(() => {
        if(eager(false)){
            explore(() => {
                if(eager(true)){
                    yes_count++
                }else{
                    no_count++
                }
            })
        }
    })
    expect(yes_count).toBe(1)
    expect(no_count).toBe(1)
})


test('no explore', () => {
    expect(eager(true)).toBe(true)
    expect(eager(false)).toBe(false)
})

test('errors do not affect stack', () => {
    try {
            explore(() => {
            if(eager(false)){
                throw new Error('blah')
            }
        })
    }catch(e){

    }

    let yes_count = 0,
        no_count = 0;
    explore(() => {
        if(eager(true)){
            yes_count++
        }else{
            no_count++
        }
    })
    expect(yes_count).toBe(1)
    expect(no_count).toBe(1)
})

test('else chains', () => {

    let results: Array<string> = []
    explore(() => {
        let conds = ''
        if(eager(true)){
            conds += 'A'
        }else if(eager(false)){
            conds += 'B'
        }else if(eager(true)){
            conds += 'C'
        }else if(eager(true)){
            conds += 'D'
        }else{
            conds += 'E'
        }
        results.push(conds)
    })
    expect(results).toEqual([ 'A', 'C', 'B', 'D', 'E' ])
})


test('independent branches 3', () => {
    let results: Array<string> = []
    explore(() => {
        let conds = ''
        if(eager(true)){
            conds += 'A'
        }else{
            conds += 'B'
        }
        if(eager(false)){
            conds += 'C'
        }else{
            conds += 'D'
        }
        if(eager(true)){
            conds += 'E'
        }else{
            conds += 'F'
        }
        results.push(conds)
    })
    expect(results).toEqual([ 'ADE', 'BDE', 'ACE', 'ADF', 'BCE', 'BDF', 'ACF', 'BCF' ])
})


test('independent branches 2', () => {
    let results: Array<string> = []
    explore(() => {
        let conds = ''
        if(eager(true)){
            conds += 'A'
        }else{
            conds += 'B'
        }
        if(eager(false)){
            conds += 'C'
        }else{
            conds += 'D'
        }
        results.push(conds)
    })
    expect(results).toEqual([ 'AD', 'BD', 'AC', 'BC' ])
})



test('nested branches 2', () => {
    let results: Array<string> = []
    explore(() => {
        let conds = ''
        if(eager(true)){
            if(eager(false)){
                conds += 'A'
            }else{
                conds += 'B'
            }
        }else{
            if(eager(false)){
                conds += 'C'
            }else{
                conds += 'D'
            }
        }
        results.push(conds)
    })
    expect(results).toEqual([ 'B', 'D', 'A', 'C' ])
})



test('nested branches 1', () => {
    let results: Array<string> = []
    explore(() => {
        let conds = ''
        if(eager(true)){
            if(eager(false)){
                conds += 'A'
            }else{
                conds += 'B'
            }
        }else{
            conds += 'C'
        }
        results.push(conds)
    })
    expect(results).toEqual( [ 'B', 'C', 'A' ])
})


